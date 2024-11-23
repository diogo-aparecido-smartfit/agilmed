import {
  ILoginData,
  IRegisterUserData,
  IResetPasswordData,
  IVerifyCodePayload,
} from "@/types/types";

export interface VerifyCodeAction {
  type: string;
  payload: IVerifyCodePayload;
}

export interface LoginAction {
  type: string;
  payload: ILoginData;
}

export interface RegisterAction {
  type: string;
  payload: IRegisterUserData;
}

export interface ResetPasswordAction {
  type: string;
  payload: IResetPasswordData;
}
