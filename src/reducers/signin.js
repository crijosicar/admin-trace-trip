import signinStore from "../store/signin";
import * as types from "../reducers/types";

export const initialState = signinStore;

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_AUTHENTICATION_IN_PROGRESS: {
      return {
        ...state,
        isAuthInProgress: action.isAuthInProgress,
      };
    }
    case types.IS_AUTHENTICATION_ERROR: {
      return {
        ...state,
        isAuthError: action.isAuthError,
      };
    }
    case types.SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case types.CLEAR_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: null,
      };
    }
    default:
      return state;
  }
};

export default signinReducer;
