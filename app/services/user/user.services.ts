import {
  IUserData,
  IRegisterUserData,
  ILoginData,
  IResetPasswordData,
} from "@/types/types";
import { normalizeHeaders } from "@/utils/utils";
import { Get, Post, Patch, Delete } from "../api/api.methods";

export const getUsers = async (
  page: number,
  quantity: number
): Promise<IUserData[]> => {
  return await Get(`users/${page}/${quantity}`);
};

export const getUser = async (id: number): Promise<IUserData> => {
  return await Get(`users/${id}`);
};

export const createUser = async (
  user: IRegisterUserData,
  headers?: HeadersInit
): Promise<{ token: string }> => {
  return await Post(`auth/register`, user, normalizeHeaders(headers));
};

export const updateUser = async (
  user: Partial<IUserData>,
  headers?: HeadersInit
): Promise<Partial<IUserData>> => {
  return await Patch(`users/`, user, normalizeHeaders(headers));
};

export const deleteUser = async (
  id: number,
  headers?: HeadersInit
): Promise<void> => {
  await Delete(`users/${id}`, normalizeHeaders(headers));
};

export const userLogin = async (
  loginData: ILoginData,
  headers?: HeadersInit
): Promise<{ token: string; user: IUserData }> => {
  return await Post(`auth/login`, loginData, normalizeHeaders(headers));
};

export const resetPassword = async (
  resetPasswordData: IResetPasswordData
): Promise<{ message: string; email: string }> => {
  return await Post("auth/reset-password", resetPasswordData);
};

export const verifyCode = async (
  document: string,
  code: string,
  typed_password?: string,
  password_confirm?: string
): Promise<{ token: string; user: IUserData }> => {
  const payload = { email: document, code, typed_password, password_confirm };
  console.log(payload);

  return await Post("auth/verify", payload);
};
