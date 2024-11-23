import { all } from "redux-saga/effects";
import { authSaga } from "./sagas/auth.saga";
import usersSaga from "./sagas/user.saga";

export default function* rootSaga() {
  yield all([authSaga(), usersSaga()]);
}
