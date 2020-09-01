import signin from "./signin";
import layouts from "./layouts";
import user from "./user";
import pages from "./pages";


const rehydrated = (state = false, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  signin,
  layouts,
  user,
  pages,
};
