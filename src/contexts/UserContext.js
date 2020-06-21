import createDataContext from './createDataContext';
import {storeData} from '../utils/asyncStorageHelper';

const UserContext = (UserSet, action) => {
  switch (action.type) {
    case 'currentBox':
      storeData('BOX', action.payload.box);
      return {
        box: action.payload.box,
      };
    default:
      return {
        box: UserSet.box,
      };
  }
};

const currentBox = (dispatch) => {
  return (box) => {
    dispatch({type: 'currentBox', payload: {box}});
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
