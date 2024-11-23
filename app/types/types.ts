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
  profile_picture_url?: string;
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

/**
 * Payload para atualizar um usuário.
 */
export interface IUpdateUserData {
  id?: number;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  gender?: string;
  allergies?: string;
  password?: string;
  medical_history?: string;
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
