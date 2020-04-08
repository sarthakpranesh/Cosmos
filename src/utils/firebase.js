import * as firebase from 'firebase';

export const isUserLoggedIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const updateDisplayName = (username) => {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
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

export const addUserToDB = (user) => {
  return new Promise((resolve, reject) => {
    const userDB = firebase.database().ref('users/').child(user.uid);
    userDB
      .set(user)
      .then((_resp) => {
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
      .then((_resp) => {
        resolve();
      })
      .catch((_err) => {
        reject();
      });
  });
};
