import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './verifyCode.schema'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { verifyCodeRequest } from '@/store/slices/auth.slice'
import { useEffect, useState } from 'react'

export function useVerifyCodeController() {
    const [secondsLeft, setSecondsLeft] = useState<number>(60)
    const dispatch = useDispatch()
    const { isLoading, error } = useSelector((state: RootState) => state.auth)

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            code: '',
        },
        resolver: yupResolver(schema),
    })

    const formValues = watch()

    const onSubmit = async ({
        document,
        code,
        typed_password,
    }: {
        document: string
        code: string
        typed_password?: string
    }) => {
        dispatch(
            verifyCodeRequest({
                code: code,
                document: document,
                typed_password: typed_password,
                password_confirm: typed_password,
            })
        )
    }

    useEffect(() => {
        if (secondsLeft > 0) {
            const timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [secondsLeft])

    return {
        handleSubmit,
        onSubmit,
        isLoading,
        errors,
        control,
        formValues,
        secondsLeft,
    }
}
