import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import shorthash from 'shorthash';
import {ToastAndroid} from 'react-native';

export const updateDisplayName = (username) => {
  return new Promise((resolve, reject) => {
    var user = auth().currentUser;
    user
      .updateProfile({displayName: username})
      .then(() => {
        return firestore()
          .collection('Users')
          .doc(user.uid)
          .update({name: username});
      })
      .then(() => resolve())
      .catch((err) => {
        reject(err);
      });
  });
};

export const setUpNewUser = (uid) => {
  const {displayName, photoURL, email} = auth().currentUser;
  firestore().collection('Users').doc(uid).set({
    uid,
    name: displayName,
    photoURL: photoURL,
    enrolledBoxes: [],
    email: email,
  });
};

export const getUserDetails = (uid) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then((snap) => {
        const user = snap.data();
        if (user === undefined) {
          setUpNewUser(uid);
        }

        resolve(user);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const setUserDetails = (uid, user) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .update(user)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const updatePosts = (uploadedImage, postCaption, box) => {
  return new Promise(async (resolve, reject) => {
    console.log(box);
    database()
      .ref(box)
      .child(`${uploadedImage.name.split('.')[0]}`)
      .set({
        postURL: uploadedImage.url,
        name: uploadedImage.name,
        postCaption,
        uid: auth().currentUser.uid,
        createdBy: auth().currentUser.displayName,
        createdByPhoto: auth().currentUser.photoURL,
      })
      .then(() => resolve())
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};

export const uploadImage = (file, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {uid} = auth().currentUser;
      const path = `posts/${uid}-${shorthash.unique(
        image.uri,
      )}.${image.uri.split('.').pop()}`;
      const storageImage = storage().ref(path);
      await storageImage.put(file);
      const url = await storageImage.getDownloadURL();
      resolve({url, name: storageImage.name});
    } catch (err) {
      reject(err);
    }
  });
};

export const getPost = (box, name) => {
  return new Promise((resolve, reject) => {
    database()
      .ref(box)
      .child(name)
      .once('value')
      .then((snap) => snap.val())
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
};

export const setPost = (box, name, post) => {
  return new Promise((resolve, reject) => {
    database()
      .ref(box)
      .child(name)
      .set(post)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const reactToPost = (box, postName, reactiontype) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isReactionValid = ['love', 'meh', 'sad'].find(
        (reaction) => reaction === reactiontype,
      );
      if (!isReactionValid) {
        throw new Error('Invalid Reaction Type');
      }
      const uid = auth().currentUser.uid;
      const name = postName.split('.')[0];
      const post = await getPost(box, name);
      if (Object.keys(post).includes(reactiontype)) {
        const alreadyReacted = post[reactiontype].find((u) => u === uid);
        if (alreadyReacted) {
          post[reactiontype] = post[reactiontype].filter((u) => u !== uid);
          await setPost(box, name, post);
          return resolve();
        } else {
          post[reactiontype] = [...post[reactiontype], uid];
          await setPost(box, name, post);
          return resolve();
        }
      } else {
        post[reactiontype] = [uid];
        await setPost(box, name, post);
        return resolve();
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      reject(err);
    }
  });
};

export const deletePosts = (box, postName) => {
  return new Promise((resolve, reject) => {
    const name = postName.split('.')[0];
    database()
      .ref(box)
      .child(name)
      .set({})
      .then(() => {
        console.log('Removing image: ', postName);
        storage().ref('posts').child(postName).delete();
        resolve();
      })
      .catch(() => reject());
  });
};

export const createBox = (boxName) => {
  return new Promise(async (resolve, reject) => {
    const {displayName, uid} = auth().currentUser;
    const [box, user] = await Promise.all([
      getBox(boxName),
      getUserDetails(uid),
    ]);
    if (box !== undefined || user === undefined) {
      return reject(new Error('Box with that name already exists'));
    }
    user.enrolledBoxes = [...user.enrolledBoxes, boxName];
    firestore()
      .collection('Boxes')
      .doc(boxName)
      .set({
        author_name: displayName,
        author_uid: uid,
        enrolledBy: [{name: displayName, uid}],
      })
      .then(() => setUserDetails(uid, user))
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getBox = (boxName) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Boxes')
      .doc(boxName)
      .get()
      .then((snap) => snap.data())
      .then((box) => resolve(box))
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const addToBox = (username, uid, boxName) => {
  return new Promise(async (resolve, reject) => {
    const box = await getBox(boxName);
    box.enrolledBy = [...box.enrolledBy, {name: username, uid}];
    firestore()
      .collection('Boxes')
      .doc(boxName)
      .set(box)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const removeFromBox = (uid, boxName) => {
  return new Promise(async (resolve, reject) => {
    const box = await getBox(boxName);
    box.enrolledBy = box.enrolledBy.filter((u) => u.uid !== uid);
    firestore()
      .collection('Boxes')
      .doc(boxName)
      .set(box)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const addUserToBox = (email, boxName) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .limit(1)
      .get()
      .then((querySnap) => {
        let u;
        querySnap.forEach((user, index) => {
          if (index === 0) {
            u = user.data();
          }
        });
        if (u === undefined) {
          throw new Error('No User with that email found 😕');
        }
        if (u.enrolledBoxes.includes(boxName)) {
          throw new Error('User already enrolled! 😜');
        }
        return u;
      })
      .then((u) => {
        u.enrolledBoxes = [...u.enrolledBoxes, boxName];
        return Promise.all([
          setUserDetails(u.uid, u),
          addToBox(u.name, u.uid, boxName),
        ]);
      })
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const removeUserFromBox = (uid, boxName) => {
  return new Promise((resolve, reject) => {
    getUserDetails(uid)
      .then((u) => {
        u.enrolledBoxes = u.enrolledBoxes.filter((bn) => bn !== boxName);
        return Promise.all([
          setUserDetails(u.uid, u),
          removeFromBox(u.uid, boxName),
        ]);
      })
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const commentOnPost = (boxName, postName, comment) => {
  return new Promise(async (resolve, reject) => {
    const user = auth().currentUser;
    const name = postName.split('.')[0];
    getPost(boxName, name)
      .then((post) => {
        if (post.comment === undefined) {
          post.comment = [{name: user.displayName, uid: user.uid, comment}];
        } else {
          post.comment = [
            ...post.comment,
            {name: user.displayName, uid: user.uid, comment},
          ];
        }
        return setPost(boxName, name, post);
      })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const deleteComment = (boxName, postName, commentIndex) => {
  return new Promise((resolve, reject) => {
    const name = postName.split('.')[0];
    getPost(boxName, name)
      .then((post) => {
        if (post.comment === undefined) {
          post.comment = [];
        } else {
          post.comment = post.comment.filter(
            (_, index) => index !== commentIndex,
          );
        }
        return setPost(boxName, name, post);
      })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
