import * as ImagePicker from 'expo-image-picker'
import { RootState } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { schema } from './settings.schema'
import {
    updateUserRequest,
    uploadProfilePictureRequest,
} from '@/store/slices/user.slice'
import { IUpdateUserData } from '@/types/types'
import { logoffRequest } from '@/store/slices/auth.slice'
import { resetOnboarding } from '@/store/slices/onboarding.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { Alert } from 'react-native'
import { resetAppData } from '@/utils/utils'
import { setDarkMode } from '@/store/slices/settings.slice'
import { useCallback, useState } from 'react'

export const useSettingsController = () => {
    const dispatch = useDispatch()
    const [showTermsModal, setShowTermsModal] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth)
    const { darkMode } = useSelector((state: RootState) => state.settings)
    const { loading, error, imageUploadError, imageUploadLoading } =
        useSelector((state: RootState) => state.user)

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: async (data, context, options) => {
            return yupResolver(schema)(data, context, options)
        },
    })

    const onSubmit = async ({ ...formData }: IUpdateUserData) => {
        dispatch(updateUserRequest({ ...formData, id: user?.id }))
    }

    const formValues = watch()

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
            const { uri, mimeType, fileName, fileSize } = result.assets[0]

            dispatch(uploadProfilePictureRequest({ uri, userId: user?.id }))
        }
    }

    const handleClearAllData = () => {
        Alert.alert(
            'Limpar dados do app',
            'Isso irá apagar todos os dados salvos do aplicativo, incluindo login e onboarding. O app será reiniciado. Tem certeza?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Limpar tudo',
                    style: 'destructive',
                    onPress: async () => resetAppData(),
                },
            ]
        )
    }

    const handleToggleDarkMode = (value: boolean) => {
        dispatch(setDarkMode(value))
    }

    const handleToggleTermsModal = useCallback(() => {
        setShowTermsModal((prev) => !prev)
    }, [])

    const handleTogglePrivacyModal = useCallback(() => {
        setShowTermsModal((prev) => !prev)
    }, [])

    return {
        loading,
        error,
        handleSubmit,
        onSubmit,
        control,
        formValues,
        imageUploadLoading,
        imageUploadError,
        handleImageChange,
        handleClearAllData,
        handleToggleDarkMode,
        darkMode,
        showTermsModal,
        showPrivacyModal,
        handleTogglePrivacyModal,
        handleToggleTermsModal,
        setShowPrivacyModal,
        setShowTermsModal,
    }
}
