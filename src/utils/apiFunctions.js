import shorthash from 'shorthash';
import mainServerApi from '../api/mainServerApi';

export const uploadDownloadUrlDB = (downloadURL, caption) => {
  return new Promise(async (resolve, reject) => {
    try {
      await mainServerApi.post('/addNewPost', {
        caption,
        downloadURL,
        pid: shorthash.unique(downloadURL),
      });
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
