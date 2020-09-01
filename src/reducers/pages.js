import { unionBy } from "lodash";

import pagesStore from "../store/pages";
import * as types from "../reducers/types";

export const initialState = pagesStore;

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_GET_PAGE_IN_PROGRESS: {
      return {
        ...state,
        isGetPageInProgress: action.isGetPageInProgress,
      };
    }
    case types.IS_GET_PAGE_ERROR: {
      return {
        ...state,
        isGetPageError: action.isGetPageError,
      };
    }
    case types.SET_PAGE: {
      return {
        ...state,
        pages: unionBy([action.pages], state.pages, '_id'),
      };
    }
    default:
      return state;
  }
};

export default pagesReducer;