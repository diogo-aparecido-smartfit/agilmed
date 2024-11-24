import { all } from "redux-saga/effects";
import { authSaga } from "./sagas/auth.saga";
import usersSaga from "./sagas/user.saga";
import chatSaga from "./sagas/chat.saga";

export default function* rootSaga() {
  yield all([authSaga(), usersSaga(), chatSaga()]);
}
