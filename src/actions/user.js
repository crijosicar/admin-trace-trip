import API from "../api/api";
import * as types from "../reducers/types";

export const isGettingUserInProgress = (isUserInProgress) => ({
  type: types.IS_GETTING_USER_IN_PROGRESS,
  isUserInProgress,
});

export const isUserError = (isUserError) => ({
  type: types.IS_USER_ERROR,
  isUserError,
});

export const setUser = (user) => ({
  type: types.SET_USER,
  user,
});

export const clearUser = () => ({
  type: types.CLEAR_USER,
});

export const isUpdatingUserInProgress = (isUserUpdateInProgress) => ({
  type: types.IS_UPDATING_USER_IN_PROGRESS,
  isUserUpdateInProgress,
});

export const isUpdateUserError = (isUpdateUserError) => ({
  type: types.IS_UPDATE_USER_ERROR,
  isUpdateUserError,
});

export const isUpdateUserPasswordError = (isUpdateUserPasswordError) => ({
  type: types.IS_USER_PASSWORD_ERROR,
  isUpdateUserPasswordError,
});

export const isUpdateUserAvatarError = (isUpdateUserAvatarError) => ({
  type: types.IS_USER_AVATAR_ERROR,
  isUpdateUserAvatarError,
});

export const isUpdatingUserAvatarInProgress = (
  isUpdatingUserAvatarInProgress
) => ({
  type: types.IS_UPDATING_USER_AVATAR_IN_PROGRESS,
  isUpdatingUserAvatarInProgress,
});

export const isUpdatingUserPasswordInProgress = (
  isUpdatingUserPasswordInProgress
) => ({
  type: types.IS_UPDATING_USER_PASSWORD_IN_PROGRESS,
  isUpdatingUserPasswordInProgress,
});

export const getUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    dispatch(isUserError(false));
    dispatch(isGettingUserInProgress(true));

    try {
      const { data } = await API.get("/auth/me");

      if (data) {
        const { _id: userId } = data;

        const { data: userData } = await API.get(`/users/${userId}`);

        if (userData) {
          dispatch(isGettingUserInProgress(false));
          return dispatch(setUser(userData));
        }
      }
    } catch (error) {
      dispatch(isGettingUserInProgress(false));
      return dispatch(isUserError(true));
    }
  };
};

export const updateUser = (userId, updatedUser = {}) => {
  return async (dispatch) => {
    dispatch(isUpdateUserError(false));
    dispatch(isUpdatingUserInProgress(true));

    try {
      const { data: userData } = await API.put(`/users/${userId}`, updatedUser);

      if (userData) {
        dispatch(isUpdatingUserInProgress(false));
        return dispatch(setUser(userData));
      }
    } catch (error) {
      dispatch(isUpdatingUserInProgress(false));
      return dispatch(isUpdateUserError(error.message));
    }
  };
};

export const updateUserPassword = (userId, updatedUser = {}) => {
  return async (dispatch) => {
    dispatch(isUpdateUserPasswordError(false));
    dispatch(isUpdatingUserPasswordInProgress(true));

    try {
      const { data: userData } = await API.put(
        `/users/${userId}/password`,
        updatedUser
      );

      if (userData) {
        dispatch(isUpdatingUserPasswordInProgress(false));
        return dispatch(setUser(userData));
      }
    } catch (error) {
      return dispatch(isUpdateUserPasswordError(true));
    }
  };
};

export const updateUserAvatar = (userId, updatedUser = {}) => {
  return async (dispatch) => {
    dispatch(isUpdateUserAvatarError(false));
    dispatch(isUpdatingUserAvatarInProgress(true));

    try {
      const { data: userData } = await API.put(
        `/users/${userId}/avatar`,
        updatedUser
      );

      if (userData) {
        dispatch(isUpdatingUserAvatarInProgress(false));
        return dispatch(setUser(userData));
      }
    } catch (error) {
      return dispatch(isUpdateUserAvatarError(true));
    }
  };
};
