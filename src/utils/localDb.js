import * as SQLite from 'expo-sqlite';

export const storeUserDataAsync = async (user) => {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('userDb');
        db.transaction( tx => {
            tx.executeSql(
                "create table if not exists userDb (userJson text);",
                []
            );
    
            tx.executeSql(
                "insert into userDb (userJson) values (?)",
                [ JSON.stringify(user) ],
                () => resolve(),
                () => reject("Can't store locally")
            );
          })
    })
  }

export const getUserDataAsync = async () => {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('userDb');
        db.transaction( tx => {
            tx.executeSql(
                "select * from userDb",
                [],
                (_, { rows: { _array } }) => {
                    if (_array[0]) {
                        resolve(JSON.parse(_array[0].userJson));
                    }
                },
                () => reject(false)
              );
          });
  })
}

export const delUserDataAsync = async (user) => {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('userDb');
        db.transaction( tx => {
            tx.executeSql(
                "DELETE FROM userDb WHERE userJson = ?",
                [JSON.stringify(user)],
                () => resolve(),
                (err) => console.log(err)
              );
          });
  })
}
