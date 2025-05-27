import { RootState } from '@/store'
import { Message, sendUserMessageRequest } from '@/store/slices/chat.slice'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useChatbotController = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const { messages, loading, waitingResponse } = useSelector(
        (state: RootState) => state.chat
    )
    const scrollViewRef = useRef<FlatList<Message> | null>(null)
    const [today, setToday] = useState<string>('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const shortToday = new Date().toLocaleString('pt', {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
        })
        setToday(shortToday.charAt(0).toUpperCase() + shortToday.slice(1))
    }, [])

    const onSendMessage = useCallback(() => {
        console.log('caiu qui')
        if (message.trim()) {
            dispatch(sendUserMessageRequest({ text: message }))
            setMessage('')
        }
    }, [dispatch, message])

    const handleSelectOption = useCallback(
        (option: string) => {
            if (option.trim()) {
                dispatch(sendUserMessageRequest({ text: option }))
                setMessage('')
            }
        },
        [dispatch]
    )

    return {
        today,
        onSendMessage,
        handleSelectOption,
        message,
        setMessage,
        scrollViewRef,
        messages,
        loading,
        waitingResponse,
        userId: user?.id,
    }
}

export default useChatbotController
