import layoutsStore from "../store/layouts";
import * as types from "../reducers/types";

export const initialState = layoutsStore;

const layoutsReducer = (state = initialState, action) => {
  let trigger = [];
  let open = [];

  switch (action.type) {
    case types.COLLAPSE_MENU:
      return {
        ...state,
        collapseMenu: !state.collapseMenu,
      };
    case types.COLLAPSE_TOGGLE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }

        if (triggerIndex === -1) {
          open = [...open, action.menu.id];
          trigger = [...trigger, action.menu.id];
        }
      } else {
        open = state.isOpen;
        const triggerIndex = state.isTrigger.indexOf(action.menu.id);
        trigger = triggerIndex === -1 ? [action.menu.id] : [];
        open = triggerIndex === -1 ? [action.menu.id] : [];
      }

      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case types.NAV_CONTENT_LEAVE:
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case types.NAV_COLLAPSE_LEAVE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      }
      return { ...state };
    case types.FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };
    case types.FULL_SCREEN_EXIT:
      return {
        ...state,
        isFullScreen: false,
      };
    case types.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layout,
      };
    default:
      return state;
  }
};

export default layoutsReducer;
