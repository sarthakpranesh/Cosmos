import axios from 'axios';
import {SERVER_API} from 'react-native-dotenv';
import * as firebase from 'firebase';

export default axios.create({
  baseURL: SERVER_API,
  headers: {
    Authorization: 'Bearer ' + firebase.auth().currentUser.uid,
  },
});
