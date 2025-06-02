import * as ImagePicker from 'expo-image-picker'
import { RootState } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IUpdateUserData } from '@/types/types'
import { useEffect } from 'react'
import {
    updateUserRequest,
    uploadProfilePictureRequest,
} from '@/store/slices/user.slice'
import * as yup from 'yup'

const schema = yup.object().shape({
    full_name: yup.string().notRequired(),
    email: yup.string().email('Email inválido').notRequired(),
    phone: yup.string().notRequired(),
    address: yup.string().notRequired(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
    gender: yup.string().notRequired(),
    allergies: yup.string().notRequired(),
    medical_history: yup.string().notRequired(),
    password: yup.string().notRequired(),
})

export const useEditProfileController = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const { loading, imageUploadLoading } = useSelector(
        (state: RootState) => state.user
    )

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            full_name: user?.full_name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.patient?.address || '',
            city: user?.patient?.city || '',
            state: user?.patient?.state || '',
            gender: user?.patient?.gender || '',
            allergies: user?.patient?.allergies || '',
            medical_history: user?.patient?.medical_history || '',
            password: '',
        },
    })

    // Initialize form with user data when it becomes available
    useEffect(() => {
        if (user) {
            reset({
                full_name: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.patient?.address || '',
                city: user.patient?.city || '',
                state: user.patient?.state || '',
                gender: user.patient?.gender || '',
                allergies: user.patient?.allergies || '',
                medical_history: user.patient?.medical_history || '',
                password: '',
            })
        }
    }, [user, reset])

    const formValues = watch()

    const onSubmit = (data: IUpdateUserData) => {
        const payload: IUpdateUserData = { id: user?.id }

        if (data.full_name !== user?.full_name)
            payload.full_name = data.full_name
        if (data.email !== user?.email) payload.email = data.email
        if (data.phone !== user?.phone) payload.phone = data.phone
        if (data.address !== user?.patient?.address)
            payload.address = data.address
        if (data.city !== user?.patient?.city) payload.city = data.city
        if (data.state !== user?.patient?.state) payload.state = data.state
        if (data.gender !== user?.patient?.gender) payload.gender = data.gender
        if (data.allergies !== user?.patient?.allergies)
            payload.allergies = data.allergies
        if (data.medical_history !== user?.patient?.medical_history)
            payload.medical_history = data.medical_history
        if (data.password) payload.password = data.password

        if (Object.keys(payload).length > 1) {
            dispatch(updateUserRequest(payload))
        }
    }

    const handleImageChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            selectionLimit: 1,
            base64: false,
        })

        if (!result.canceled) {
            const { uri } = result.assets[0]
            dispatch(uploadProfilePictureRequest({ uri, userId: user?.id }))
        }
    }

    return {
        control,
        formValues,
        handleSubmit,
        onSubmit,
        loading,
        imageUploadLoading,
        handleImageChange,
        errors,
    }
}
