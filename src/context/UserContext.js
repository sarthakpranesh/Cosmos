import createContext from './createContext';

const userReducer = (userOj, action) => {
    switch (action.type) {
        case 'onUser_sign_in':
            return userOj;
        case 'onUser_sign_out':
            return {};
        default:
            return userOj;
    }
};

const saveUserDetails = (dispatch) => {
    return (title, content) => {
        dispatch({ type: 'onUser_sign_in', payload: { title, content } });
    }
}

const removeUserDetails = (dispatch) => {
    return (title) => {
        dispatch({ type: 'onUser_sign_out', title });
    }
}

export const { Context, Provider } = createContext(
        userReducer,
        { saveUserDetails, removeUserDetails },
        {}
    );
