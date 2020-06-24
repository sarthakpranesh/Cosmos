import createDataContext from './createDataContext';
import {storeData} from '../utils/asyncStorageHelper';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'currentBox':
      storeData('BOX', action.payload.box);
      return {
        box: action.payload.box,
        uid: UserSet.uid,
      };
    case 'setUid': {
      storeData('UID', action.payload.uid);
      return {
        box: UserSet.box,
        uid: action.payload.uid,
      };
    }
    default:
      return UserSet;
  }
};

const currentBox = (dispatch) => {
  return (box) => {
    dispatch({type: 'currentBox', payload: {box}});
  };
};

const setUid = (dispatch) => {
  return (uid) => {
    dispatch({type: 'setUid', payload: {uid}});
  };
};

export const {Context, Provider} = createDataContext(
  UserContext,
  {
    currentBox,
    setUid,
  },
  {
    box: '',
    uid: '',
  },
);
