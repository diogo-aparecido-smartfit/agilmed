import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
    sendUserMessageSuccess,
    sendUserMessageFailure,
    receiveBotMessageSuccess,
    Message,
    sendUserMessageRequest,
} from '../slices/chat.slice'
import uuid from 'react-native-uuid'
import { showMessage } from 'react-native-flash-message'
import { Post } from '@/services/api/api.methods'

interface OpenRouterResponse {
    choices: { message: { role: 'assistant'; content: string } }[]
}

function* handleSendMessage(action: PayloadAction<{ text: string }>) {
    try {
        console.log('[Saga] handleSendMessage - action:', action)

        const userMessage: Message = {
            id: String(uuid.v4()),
            role: 'user',
            content: action.payload.text,
            createdAt: new Date().toISOString(),
        }
        console.log('[Saga] User message to dispatch:', userMessage)

        const body = {
            userMessage: action.payload.text,
        }
        console.log('[Saga] Request body for OpenRouter:', body)

        yield put(sendUserMessageSuccess(userMessage))
        console.log('[Saga] Dispatched sendUserMessageSuccess')

        const response: OpenRouterResponse = yield call(
            Post,
            '/bot/message',
            body
        )
        console.log('[Saga] OpenRouter response:', response)

        const assistantRaw = response.choices[0].message
        console.log('[Saga] Assistant raw message:', assistantRaw)

        const assistantMessage: Message = {
            id: String(uuid.v4()),
            role: assistantRaw.role,
            content: assistantRaw.content,
            createdAt: new Date().toISOString(),
        }
        console.log('[Saga] Assistant message to dispatch:', assistantMessage)

        yield put(receiveBotMessageSuccess(assistantMessage))
        console.log('[Saga] Dispatched receiveBotMessageSuccess')
    } catch (error: any) {
        console.log('[Saga] Error in handleSendMessage:', error)
        showMessage({
            message: 'Não foi possível enviar a mensagem',
            type: 'danger',
        })
        yield put(
            sendUserMessageFailure(error.message || 'Failed to send message')
        )
    }
}

export default function* chatSaga() {
    yield takeLatest(sendUserMessageRequest.type, handleSendMessage)
}
