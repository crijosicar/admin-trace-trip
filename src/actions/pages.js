import API, { getAccessToken } from "../api/api";
import * as types from "../reducers/types";

export const isGetPageInProgress = (isGetPageInProgress) => ({
  type: types.IS_GET_PAGE_IN_PROGRESS,
  isGetPageInProgress,
});

export const isGetPageError = (isGetPageError) => ({
  type: types.IS_GET_PAGE_ERROR,
  isGetPageError,
});

export const setPage = (pages) => ({
  type: types.SET_PAGE,
  pages,
});

export const getPage = (name) => {
  return async (dispatch) => {
    await dispatch(isGetPageError(false));
    await dispatch(isGetPageInProgress(true));
    const headers = { authorization: `Bearer ${await getAccessToken()}` };

    try {
      const { data } = await API.get(`/pages/name/${name}`,{ headers });

      if (data) {
        await dispatch(isGetPageInProgress(false));
        return dispatch(setPage(data));
      }
    } catch (error) {
      await dispatch(isGetPageInProgress(false));
      return dispatch(isGetPageError(error.message));
    }
  };
};

export const isUpdatePageInProgress = (isUpdatePageInProgress) => ({
  type: types.IS_UPDATE_PAGE_IN_PROGRESS,
  isUpdatePageInProgress,
});

export const isUpdatePageError = (isUpdatePageError) => ({
  type: types.IS_UPDATE_PAGE_ERROR,
  isUpdatePageError,
});


export const updatePage = (name, updatedData) => {
  return async (dispatch) => {
    await dispatch(isUpdatePageError(false));
    await dispatch(isUpdatePageInProgress(true));
    const headers = { authorization: `Bearer ${await getAccessToken()}` };

    try {
      const { data } = await API.put(`/pages/name/${name}`, updatedData, { headers });

      await dispatch(isUpdatePageInProgress(false));
      return dispatch(setPage(data));
    } catch (error) {
      await dispatch(isUpdatePageInProgress(false));
      return dispatch(isUpdatePageError(error.message));
    }
  };
};