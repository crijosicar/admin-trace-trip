import * as types from "../reducers/types";

export const onCollapseMenu = () => ({
  type: types.COLLAPSE_MENU,
});

export const onCollapseToggle = () => ({
  type: types.COLLAPSE_TOGGLE,
});

export const onFullScreen = () => ({
  type: types.FULL_SCREEN,
});

export const onFullScreenText = () => ({
  type: types.FULL_SCREEN_EXIT,
});

export const onChangeLayout = () => ({
  type: types.CHANGE_LAYOUT,
});

export const onNavContentLeave = () => ({
  type: types.NAV_CONTENT_LEAVE,
});

export const onNavCollapseLeave = () => ({
  type: types.NAV_COLLAPSE_LEAVE,
});
