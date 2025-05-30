import { categoryMap } from '@/utils/constants'
import { Icon } from 'iconsax-react-native'

/**
 * Representa os dados retornados da API.
 */
export interface IUserData {
    id?: number
    full_name: string
    birthdate?: string
    cpf: string
    address?: string
    city?: string
    state?: string
    phone: string
    email?: string
    gender?: string
    blood_type?: string
    allergies?: string
    medical_history?: string
    verificationCode?: string | null
    isVerified?: boolean
    createdAt?: string
    updatedAt?: string
    profile_picture_url?: string
    chatbot_user_id?: string
}

/**
 * Representa os dados a serem enviados no body da requisição.
 */
export interface IRegisterUserData {
    full_name: string
    email: string
    phone: string
    password: string
    birthdate: string
    address: string
    city: string
    state: string
    gender: string
    blood_type: string
    allergies: string
    medical_history: string
}

/**
 * Representa os dados a serem enviados no body da requisição.
 */
export interface ILoginData {
    identifier: string
    password: string
}

/**
 * Payload para atualizar um usuário.
 */
export interface IUpdateUserData {
    id?: number
    address?: string
    city?: string
    state?: string
    phone?: string
    email?: string
    gender?: string
    allergies?: string
    password?: string
    medical_history?: string
}

export interface IResetPasswordData {
    document: string
    typed_password: string
    password_confirm: string
}

export interface IVerifyCodePayload {
    document: string
    code: string
    typed_password?: string
    password_confirm?: string
}

export type ICategoryType = keyof typeof categoryMap

export interface IAppointment {
    id: number
    doctor_id: number
    patient_id: number
    appointment_date: string
    doctor_name: string
    patient_name: string
    reason: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    full_name: string
    profile_picture_url?: string
    isVerified: boolean
}

export interface Appointment {
    id: string
    appointment_date: string
    doctor_name: string
    doctor_profile_picture_url?: string
    doctor_specialty?: string
}

export interface MedicalUnit {
    id: string
    name: string
    category?: string
    dist?: number
    phone?: string
    address?: string
    position: {
        lat: number
        lon: number
    }
}

export interface QuickAction {
    id: string
    text: string
    icon: Icon
}
