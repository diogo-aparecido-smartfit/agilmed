/**
 * Representa os dados retornados da API.
 */
export interface IUserData {
  id?: number;
  full_name: string;
  birthdate?: string;
  cpf: string;
  address?: string;
  city?: string;
  state?: string;
  phone: string;
  email?: string;
  gender?: string;
  blood_type?: string;
  allergies?: string;
  medical_history?: string;
  verificationCode?: string | null;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Representa os dados a serem enviados no body da requisição.
 */
export interface IRegisterUserData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  birthdate: string;
  address: string;
  city: string;
  state: string;
  gender: string;
  blood_type: string;
  allergies: string;
  medical_history: string;
}

/**
 * Representa os dados a serem enviados no body da requisição.
 */
export interface ILoginData {
  identifier: string;
  password: string;
}

export interface IResetPasswordData {
  document: string;
  typed_password: string;
  password_confirm: string;
}

export interface IVerifyCodePayload {
  document: string;
  code: string;
  typed_password?: string;
  password_confirm?: string;
}
