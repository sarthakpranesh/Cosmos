import shorthash from 'shorthash';
import mainServerApi from '../api/mainServerApi';
// import * as firebase from 'firebase';

export const uploadDownloadUrlDB = (uploadedImage, caption) => {
  return new Promise(async (resolve, reject) => {
    try {
      await mainServerApi.post(
        '/addNewPost',
        {
          caption,
          downloadURL: uploadedImage.url,
          postName: uploadedImage.name,
          pid: shorthash.unique(uploadedImage.url),
        },
        {
          headers: {
            // Authorization: firebase.auth().currentUser.uid,
          },
        },
      );
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getActivePosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await mainServerApi.get('/activePost', {
        headers: {
          // Authorization: firebase.auth().currentUser.uid,
        },
      });
      resolve(resp.data.payload.posts);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};

export const likePost = (pid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await mainServerApi.get('/likePost', {
        params: {
          pid: pid,
        },
        headers: {
          // Authorization: firebase.auth().currentUser.uid,
        },
      });
      if (resp.data.isLiked && resp.data.status === 1) {
        resolve();
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const nopePost = (pid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await mainServerApi.get('/nopePost', {
        params: {
          pid: pid,
        },
        headers: {
          // Authorization: firebase.auth().currentUser.uid,
        },
      });
      if (resp.data.isLiked && resp.data.status === 1) {
        resolve();
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const deletePosts = (pid, postName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await mainServerApi.delete('/deletePosts', {
        params: {
          pid: pid,
          postName: postName,
        },
        headers: {
          // Authorization: firebase.auth().currentUser.uid,
        },
      });
      if (resp.data.isPostDeleted && resp.data.status === 1) {
        resolve();
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
