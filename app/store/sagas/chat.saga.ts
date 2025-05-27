import { call, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
    sendUserMessageSuccess,
    sendUserMessageFailure,
    receiveBotMessageSuccess,
    Message,
    sendUserMessageRequest,
} from '../slices/chat.slice'
import { RootState } from '..'
import uuid from 'react-native-uuid'
import { showMessage } from 'react-native-flash-message'
import { Post } from '@/services/api/api.methods'

interface OpenRouterResponse {
    choices: { message: { role: 'assistant'; content: string } }[]
}

const selectMessages = (state: RootState) => state.chat.messages

function* handleSendMessage(action: PayloadAction<{ text: string }>) {
    try {
        console.log('[Saga] handleSendMessage - action:', action)
        const messages: Message[] = yield select(selectMessages)
        console.log('[Saga] Current messages:', messages)

        // Prepare history with only role and content
        const history = messages.map(({ role, content }) => ({ role, content }))
        console.log('[Saga] History for OpenRouter:', history)

        // New user message with id and timestamp
        const userMessage: Message = {
            id: String(uuid.v4()),
            role: 'user',
            content: action.payload.text,
            createdAt: new Date().toISOString(),
        }
        console.log('[Saga] User message to dispatch:', userMessage)

        const body = {
            history,
            userMessage: action.payload.text,
        }
        console.log('[Saga] Request body for OpenRouter:', body)

        yield put(sendUserMessageSuccess(userMessage))
        console.log('[Saga] Dispatched sendUserMessageSuccess')

        const response: OpenRouterResponse = yield call(
            Post,
            '/chat/completions',
            body
        )
        console.log('[Saga] OpenRouter response:', response)

        const assistantRaw = response.choices[0].message
        console.log('[Saga] Assistant raw message:', assistantRaw)

        // Create assistant message with id and timestamp
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
