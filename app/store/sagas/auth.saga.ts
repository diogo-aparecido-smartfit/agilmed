import { put, call, takeLatest, Effect } from "redux-saga/effects";
import { router } from "expo-router";
import {
  userLogin,
  createUser,
  resetPassword,
  verifyCode,
} from "@/services/user/user.services";
import {
  ILoginData,
  IRegisterUserData,
  IResetPasswordData,
  IUserData,
} from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoffRequest,
  registerFailure,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
  verifyCodeFailure,
  verifyCodeRequest,
  verifyCodeSuccess,
} from "../slices/auth.slice";
import {
  LoginAction,
  RegisterAction,
  ResetPasswordAction,
  VerifyCodeAction,
} from "../actions/actions";
import { clearStorage } from "@/utils/utils";

function* loginSaga(action: LoginAction): Generator<Effect> {
  try {
    const data = yield call(userLogin, action.payload);
    const response = <{ token: string; user: IUserData }>data;

    yield call([AsyncStorage, AsyncStorage.setItem], "token", response.token);
    yield call(
      [AsyncStorage, AsyncStorage.setItem],
      "user",
      JSON.stringify(response.user)
    );

    yield put(loginSuccess({ token: response.token, user: response.user }));
    router.push("/(home)");
  } catch (error) {
    console.error(error);
    alert("Falha ao fazer login. Verifique as credenciais.");
    yield put(loginFailure("Credenciais inválidas ou erro de rede."));
  }
}

function* registerSaga(action: RegisterAction): Generator<Effect> {
  try {
    const response = yield call(createUser, action.payload);

    alert("Código de confirmação enviado!");

    yield put(registerSuccess());
    router.push({
      pathname: "/(auth)/verifyCode",
      params: { email: action.payload.email },
    });
  } catch (error) {
    console.error(error);
    yield put(registerFailure("Erro ao registrar. Tente novamente."));
    alert("Erro ao registrar. Tente novamente.");
  }
}

function* resetPasswordSaga(action: ResetPasswordAction): Generator<Effect> {
  try {
    const data = yield call(resetPassword, action.payload);
    const response = <{ message: string; email: string }>data;

    router.push({
      pathname: "/(auth)/verifyCode",
      params: {
        resetPassword: "true",
        password: action.payload.typed_password,
        email: response.email,
      },
    });
    yield put(resetPasswordSuccess());
  } catch (error) {
    console.error(error);
    alert("Não foi possível resetar a senha.");
    yield put(resetPasswordFailure("Não foi possível resetar a senha."));
  }
}

function* verifyCodeSaga(action: VerifyCodeAction): Generator<Effect> {
  try {
    const { document, code, typed_password, password_confirm } = action.payload;

    const data = yield call(
      verifyCode,
      document,
      code,
      typed_password,
      password_confirm
    );

    const response = <{ token: string; user: IUserData }>data;

    yield call([AsyncStorage, AsyncStorage.setItem], "token", response.token);
    yield call(
      [AsyncStorage, AsyncStorage.setItem],
      "user",
      JSON.stringify(response.user)
    );

    yield put(
      verifyCodeSuccess({ token: response.token, user: response.user })
    );

    router.replace("/(home)");
  } catch (error) {
    console.error(error);
    yield put(verifyCodeFailure("Erro ao verificar código. Tente novamente."));
  }
}

function* logoffSaga(): Generator<Effect> {
  try {
    yield call(clearStorage);
  } catch (error) {
    console.error("Erro ao fazer logoff", error);
  }
}

export function* authSaga() {
  yield takeLatest("auth/loginRequest", loginSaga);
  yield takeLatest("auth/registerRequest", registerSaga);
  yield takeLatest("auth/resetPasswordRequest", resetPasswordSaga);
  yield takeLatest("auth/verifyCodeRequest", verifyCodeSaga);
  yield takeLatest("auth/logoffRequest", logoffSaga);
}
