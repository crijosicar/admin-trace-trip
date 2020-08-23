import userStore from "../store/user";
import * as types from "../reducers/types";

export const initialState = userStore;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case types.CLEAR_USER: {
      return {
        ...state,
        user: {},
      };
    }
    case types.IS_GETTING_USER_IN_PROGRESS: {
      return {
        ...state,
        isUserInProgress: action.isUserInProgress,
      };
    }
    case types.IS_USER_ERROR: {
      return {
        ...state,
        isUserError: action.isUserError,
      };
    }
    case types.IS_UPDATING_USER_IN_PROGRESS: {
      return {
        ...state,
        isUserUpdateInProgress: action.isUserUpdateInProgress,
      };
    }
    case types.IS_UPDATE_USER_ERROR: {
      return {
        ...state,
        isUpdateUserError: action.isUpdateUserError,
      };
    }
    case types.IS_USER_PASSWORD_ERROR: {
      return {
        ...state,
        isUpdateUserPasswordError: action.isUpdateUserPasswordError,
      };
    }
    case types.IS_USER_AVATAR_ERROR: {
      return {
        ...state,
        isUpdateUserAvatarError: action.isUpdateUserAvatarError,
      };
    }
    case types.IS_UPDATING_USER_AVATAR_IN_PROGRESS: {
      return {
        ...state,
        isUpdatingUserAvatarInProgress: action.isUpdatingUserAvatarInProgress,
      };
    }
    case types.IS_UPDATING_USER_PASSWORD_IN_PROGRESS: {
      return {
        ...state,
        isUpdatingUserPasswordInProgress:
          action.isUpdatingUserPasswordInProgress,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
