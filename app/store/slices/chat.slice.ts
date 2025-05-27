import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt: string
}

export interface ChatState {
    loading: boolean
    error: string | null
    messages: Message[]
    waitingResponse: boolean
}

const initialState: ChatState = {
    loading: false,
    error: null,
    messages: [],
    waitingResponse: false,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendUserMessageRequest: (
            state,
            action: PayloadAction<{ text: string }>
        ) => {
            state.loading = true
            state.error = null
        },
        sendUserMessageSuccess: (state, action: PayloadAction<Message>) => {
            if (!state.messages.find((m) => m.id === action.payload.id)) {
                state.messages.push(action.payload)
            }
            state.loading = false
            state.waitingResponse = true
        },
        sendUserMessageFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.waitingResponse = false
            state.error = action.payload
        },
        receiveBotMessageSuccess: (state, action: PayloadAction<Message>) => {
            if (!state.messages.find((m) => m.id === action.payload.id)) {
                state.messages.push(action.payload)
            }
            state.waitingResponse = false
        },
    },
})

export const {
    sendUserMessageRequest,
    sendUserMessageSuccess,
    sendUserMessageFailure,
    receiveBotMessageSuccess,
} = chatSlice.actions

export default chatSlice.reducer
