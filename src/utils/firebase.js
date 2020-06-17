import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import shorthash from 'shorthash';
import {ToastAndroid} from 'react-native';

export const updateDisplayName = (username) => {
  return new Promise((resolve, reject) => {
    var user = auth().currentUser;
    user
      .updateProfile({displayName: username})
      .then((resp) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setUpNewUser = () => {
  const {uid, displayName, photoURL} = auth().currentUser;
  database().ref('users/').child(uid).set({
    uid,
    name: displayName,
    photoUrl: photoURL,
  });
};

export const getUserDetails = (uid) => {
  return new Promise((resolve, reject) => {
    database()
      .ref('users/')
      .child(uid)
      .once('value')
      .then(async (userobj) => {
        const user = await userobj.val();
        if (user) {
          setUpNewUser();
        }

        resolve(user);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
};

export const setUserDetails = (uid, user) => {
  return new Promise((resolve, reject) => {
    database()
      .ref(`users/`)
      .child(uid)
      .set(user)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const updatePosts = (uid, uploadedImage, postCaption) => {
  return new Promise(async (resolve, reject) => {
    try {
      await database()
        .ref(`posts/${uploadedImage.name.split('.')[0]}`)
        .set({
          postURL: uploadedImage.url,
          name: uploadedImage.name,
          love: [],
          meh: [],
          sad: [],
          comments: [],
          postCaption,
          uid,
          createdBy: auth().currentUser.displayName,
          createdByPhoto: auth().currentUser.photoURL,
        });
      resolve();
    } catch (e) {
      console.log(e.message);
      reject(e);
    }
  });
};

export const uploadImage = (uid, file, image) => {
  return new Promise(async (resolve, reject) => {
    try {
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

export const getPost = (name) => {
  return new Promise((resolve, reject) => {
    database()
      .ref('posts/')
      .child(name)
      .once('value')
      .then((snap) => snap.val())
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
};

export const setPost = (name, post) => {
  return new Promise((resolve, reject) => {
    database()
      .ref('posts/')
      .child(name)
      .set(post)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export const reactToUser = (uid, reactiontype, dif) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getUserDetails(uid);
      if (Object.keys(user).includes(reactiontype)) {
        user[reactiontype] = user[reactiontype] + dif;
      } else {
        user[reactiontype] = 1;
      }
      await setUserDetails(uid, user);
      resolve();
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

export const reactToPost = (postName, reactiontype) => {
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
      const post = await getPost(name);
      if (Object.keys(post).includes(reactiontype)) {
        const alreadyReacted = post[reactiontype].find((u) => u === uid);
        if (alreadyReacted) {
          post[reactiontype] = post[reactiontype].filter((u) => u !== uid);
          await setPost(name, post);
          await reactToUser(post.uid, reactiontype, -1);
          return resolve();
        } else {
          post[reactiontype] = [...post[reactiontype], uid];
          await setPost(name, post);
          await reactToUser(post.uid, reactiontype, 1);
          return resolve();
        }
      } else {
        post[reactiontype] = [uid];
        await setPost(name, post);
        await reactToUser(post.uid, reactiontype, 1);
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

export const deletePosts = (postName) => {
  return new Promise((resolve, reject) => {
    const name = postName.split('.')[0];
    database()
      .ref('posts/')
      .child(name)
      .set({})
      .then(() => resolve())
      .catch(() => reject());
  });
};
