import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import chatReducer from "./slices/chat.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
