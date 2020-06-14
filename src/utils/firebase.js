import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import shorthash from 'shorthash';

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

export const getUserDetails = (uid) => {
  return new Promise((resolve, reject) => {
    database()
      .ref(`users/${uid}`)
      .once('value')
      .then((userobj) => {
        resolve(userobj.val());
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
};

export const updatePosts = (uid, uploadedImage, postCaption) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log();
      await database()
        .ref(`posts/${uploadedImage.name.split('.')[0]}`)
        .set({
          postURL: uploadedImage.url,
          name: uploadedImage.name,
          likes: 0,
          nopes: 0,
          postCaption,
          uid,
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
