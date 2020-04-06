import * as SQLite from 'expo-sqlite';

export const storeUserDataAsync = async (user) => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('userDb');
    db.transaction((tx) => {
      tx.executeSql('create table if not exists user (userJson text);', []);

      tx.executeSql(
        'insert into user (userJson) values (?)',
        [JSON.stringify(user)],
        () => resolve(),
        () => reject("Can't store locally"),
      );
    });
  });
};

export const getUserDataAsync = async () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('userDb');
    db.transaction((tx) => {
      tx.executeSql(
        'select * from user',
        [],
        (_, {rows: {_array}}) => {
          if (_array[0]) {
            console.log(_array);
            resolve(JSON.parse(_array[0].userJson));
          }
        },
        () => reject(false),
      );
    });
  });
};

export const delUserDataAsync = async (user) => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('userDb');
    db.transaction((tx) => {
      tx.executeSql(
        'delete from user',
        [],
        () => resolve(),
        (err) => resolve(),
      );
    });

    resolve();
  });
};
