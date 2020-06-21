import createDataContext from './createDataContext';
import {storeData} from '../utils/asyncStorageHelper';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'currentBox':
      storeData('BOX', action.payload.box);
      return {
        box: action.payload.token,
      };
    default:
      return {
        box: UserSet.box,
      };
  }
};

const currentBox = (dispatch) => {
  return (token) => {
    dispatch({type: 'currentBox', payload: {token}});
  };
};

export const {Context, Provider} = createDataContext(
  UserContext,
  {
    currentBox,
  },
  {
    box: '',
  },
);
