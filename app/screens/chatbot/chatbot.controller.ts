import {
    startListeningToBot,
    stopListeningToBot,
} from '@/services/api/chat.listen'
import { RootState } from '@/store'
import {
    listMessagesRequest,
    sendUserMessageRequest,
} from '@/store/slices/chat.slice'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Linking, Platform, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useChatbotController = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const { conversationId } = useSelector((state: RootState) => state.chat)
    const { loading, messages, loadingMessages } = useSelector(
        (state: RootState) => state.chat
    )
    const scrollViewRef = useRef<ScrollView>(null)
    const [today, setToday] = useState<string>('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (conversationId && user?.id) {
            startListeningToBot(
                conversationId,
                user.id.toString(),
                user.chatbot_user_id?.toString() || ''
            )
        }

        return () => {
            stopListeningToBot()
        }
    }, [conversationId, user?.id])

    useEffect(() => {
        const shortToday = new Date().toLocaleString('pt', {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
        })

        setToday(shortToday.charAt(0).toUpperCase() + shortToday.slice(1))
    }, [])

    const onSendMessage = useCallback(() => {
        if (message.trim()) {
            dispatch(sendUserMessageRequest({ text: message }))
            setMessage('')
        }
    }, [setMessage, dispatch, sendUserMessageRequest, message])

    const handleSelectOption = useCallback(
        (option: string) => {
            if (option.trim()) {
                dispatch(sendUserMessageRequest({ text: option }))
                setMessage('')
            }
        },
        [setMessage]
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
        userId: user?.id,
        loadingMessages,
    }
}

export default useChatbotController
