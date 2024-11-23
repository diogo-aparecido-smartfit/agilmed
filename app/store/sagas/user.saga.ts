import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "@/types/types";
import {
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  uploadProfilePictureRequest,
  uploadProfilePictureSuccess,
} from "../slices/user.slice";
import {
  updateProfilePicture,
  updateUser,
} from "@/services/user/user.services";
import { updateUser as updateAuthUser } from "@/store/slices/auth.slice";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* handleUpdateUser(
  action: PayloadAction<Partial<IUserData>>
): Generator<Effect> {
  try {
    const data = yield call(updateUser, action.payload);

    const updatedUser = <Partial<IUserData>>data;

    const userString = yield call([AsyncStorage, AsyncStorage.getItem], "user");

    if (userString) {
      const currentUser = JSON.parse(userString as string) as IUserData;
      const newUser = { ...currentUser, ...updatedUser };

      yield call(
        [AsyncStorage, AsyncStorage.setItem],
        "user",
        JSON.stringify(newUser)
      );
    }

    yield all([
      put(updateUserSuccess(updatedUser)),
      put(updateAuthUser(updatedUser)),
    ]);

    showMessage({
      message: "Dados atualizados com sucesso.",
      type: "success",
    });
  } catch (error: any) {
    yield put(updateUserFailure(error.message || "Failed to update user"));
  }
}

function* handleUpdateProfilePicture(
  action: PayloadAction<{ uri: string; userId: number }>
): Generator<Effect> {
  try {
    const { uri, userId } = action.payload;

    const data = yield call(updateProfilePicture, uri, userId);

    const updatedUser = <Partial<IUserData>>data;

    const userString = yield call([AsyncStorage, AsyncStorage.getItem], "user");

    if (userString) {
      const currentUser = JSON.parse(userString as string) as IUserData;
      const newUser = { ...currentUser, ...updatedUser };

      yield call(
        [AsyncStorage, AsyncStorage.setItem],
        "user",
        JSON.stringify(newUser)
      );
    }

    yield all([
      put(updateUserSuccess(updatedUser)),
      put(updateAuthUser(updatedUser)),
    ]);

    showMessage({
      message: "Dados atualizados com sucesso.",
      type: "success",
    });

    yield put(uploadProfilePictureSuccess());
  } catch (error: any) {
    showMessage({
      message: "Erro ao atualizar foto de perfil.",
      type: "danger",
    });
    yield put(updateUserFailure(error.message || "Failed to update user"));
  }
}

export default function* usersSaga() {
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
  yield takeLatest(
    uploadProfilePictureRequest.type,
    handleUpdateProfilePicture
  );
}
