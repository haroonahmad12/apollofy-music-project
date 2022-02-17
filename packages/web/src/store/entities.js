import { combineReducers } from "redux";
import modalReducer from "./modal";
import authReducer from "./auth";
import tracksReducer from "./tracks";
import ThemeReducer from "./theme";

export default combineReducers({
  auth: authReducer,
  modal: modalReducer,
  tracks: tracksReducer,
  theme: ThemeReducer,
});
