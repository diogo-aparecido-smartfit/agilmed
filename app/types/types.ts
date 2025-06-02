import { categoryMap } from '@/utils/constants'
import { Theme } from '@emotion/react'
import { Icon } from 'iconsax-react-native'

/**
 * Tipo de papel do usuário no sistema
 */
export type UserRole = 'patient' | 'doctor' | 'admin'

/**
 * Representa os dados básicos de um usuário
 */
export interface IBaseUser {
    id: number
    full_name: string
    email: string
    phone: string
    cpf: string
    profile_picture_url: string | null
    verificationCode: string | null
    isVerified: boolean
    role: UserRole
    createdAt: string
    updatedAt: string
}

/**
 * Representa os dados de um paciente
 */
export interface IPatient {
    id: number
    user_id: number
    birthdate: string
    address: string
    city: string
    state: string
    gender: string
    blood_type: string
    allergies: string
    medical_history: string
    createdAt: string
    updatedAt: string
    user: IBaseUser
}

/**
 * Representa os dados retornados da API.
 */
export interface IUserData extends IBaseUser {
    patient?: IPatient
}

/**
 * Resposta do endpoint de login
 */
export interface ILoginResponse {
    token: string
    user: IUserData
}

/**
 * Representa os dados a serem enviados no body da requisição de registro.
 */
export interface IRegisterUserData {
    full_name: string
    email: string
    phone: string
    password: string
    cpf: string
    birthdate: string
    address: string
    city: string
    state: string
    gender: string
    blood_type: string
    allergies: string
    medical_history: string
    role: UserRole
}

/**
 * Representa os dados a serem enviados no body da requisição de login.
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
    full_name?: string
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
    reason: string
    status: string
    notes: string | null
    created_at: string
    updated_at: string
    createdAt: string
    updatedAt: string
    doctor: {
        id: number
        user_id: number
        specialty: string
        crm: string
        birthdate: string
        address: string
        city: string
        state: string
        gender: string
        bio: string | null
        available_hours: string | null
        createdAt: string
        updatedAt: string
        user: {
            id: number
            full_name: string
            email: string
            phone: string
            cpf: string
            profile_picture_url: string | null
            verificationCode: string | null
            isVerified: boolean
            role: string
            createdAt: string
            updatedAt: string
        }
    }
    doctor_name: string
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

export interface IDoctor {
    id: number
    user_id: number
    specialty: string
    crm: string
    birthdate: string
    address: string
    city: string
    state: string
    gender: string
    bio: string | null
    available_hours: string | null
    createdAt: string
    updatedAt: string
    user: {
        id: number
        full_name: string
        email: string
        phone: string
        cpf: string
        profile_picture_url: string | null
        verificationCode: string | null
        isVerified: boolean
        role: string
        createdAt: string
        updatedAt: string
    }
    email: string
    full_name: string
    phone: string
    profile_picture_url: string | null
}

export interface ThemeProps {
    theme: Theme
}
