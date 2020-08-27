import API from "../api/api";
import * as types from "../reducers/types";
import { clearUser } from "./user";

export const isAthenticationInProgress = (isAuthInProgress) => ({
  type: types.IS_AUTHENTICATION_IN_PROGRESS,
  isAuthInProgress,
});

export const isAuthenticationError = (isAuthError) => ({
  type: types.IS_AUTHENTICATION_ERROR,
  isAuthError,
});

export const setAccessToken = (accessToken) => ({
  type: types.SET_ACCESS_TOKEN,
  accessToken,
});

export const clearAccessToken = () => ({
  type: types.CLEAR_ACCESS_TOKEN,
});

export const authenticateUser = ({ email, password }) => {
  return async (dispatch) => {
    await dispatch(clearUser());
    await dispatch(clearAccessToken());
    await dispatch(isAuthenticationError(false));
    await dispatch(isAthenticationInProgress(true));

    try {
      const { data } = await API.post("/auth/login", { email, password });

      if (data) {
        await dispatch(isAthenticationInProgress(false));
        return dispatch(setAccessToken(data.access_token));
      }
    } catch (error) {
      await dispatch(isAthenticationInProgress(false));
      return dispatch(isAuthenticationError(true));
    }
  };
};
