import * as firebase from 'firebase';

export const addUserToDB = (user) => {
    return new Promise((resolve, reject) => {
        const userDB = firebase.database().ref('users/'+user.uid)
        userDB.set(user)
            .then((resp) => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export const getUserObject = (uid) => {
    return new Promise((resolve, reject) => {
        const userDB = firebase.database().ref('users/'+uid)
        userDB.once("value")
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            })
    })
}
