import axios from 'axios';
import {SERVER_API} from 'react-native-dotenv';

export default axios.create({
  baseURL: SERVER_API,
});
