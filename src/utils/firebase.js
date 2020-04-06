import * as firebase from 'firebase';

export const addUserToDB = (user) => {
  return new Promise((resolve, reject) => {
    const userDB = firebase.database().ref('users/').child(user.uid);
    userDB
      .set(user)
      .then((resp) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserObject = (uid) => {
  return new Promise((resolve, reject) => {
    const userDB = firebase.database().ref('users/').child(uid);
    userDB
      .once('value')
      .then((user) => {
        resolve(user.val());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUserObject = (uid, updates) => {
  return new Promise((resolve, reject) => {
    const userDB = firebase.database().ref('users/').child(uid);
    userDB
      .update(updates)
      .then((resp) => {
        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
};
