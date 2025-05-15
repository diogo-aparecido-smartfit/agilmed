import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessagePayload {
    type: string
    text?: string
    options?: Array<{ label: string; value: string }>
}

export interface Message {
    id: string
    createdAt: string
    conversationId: string
    userId: string
    payload: MessagePayload
}

export interface ChatState {
    loading: boolean
    loadingMessages: boolean
    error: string | null
    conversationId: string | null
    messages: Message[]
}

const initialState: ChatState = {
    loading: false,
    loadingMessages: false,
    error: null,
    conversationId: null,
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createConversationRequest(state) {
            state.loading = true
            state.error = null
        },
        createConversationSuccess(
            state,
            action: PayloadAction<{ conversationId: string }>
        ) {
            state.loading = false
            state.conversationId = action.payload.conversationId
        },
        createConversationFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        sendUserMessageRequest: (
            state,
            action: PayloadAction<{ text: string }>
        ) => {
            state.loading = true
        },
        sendUserMessageSuccess: (state, action: PayloadAction<Message>) => {
            const exists = state.messages.find(
                (msg) => msg.id === action.payload.id
            )

            if (!exists) {
                state.messages.push(action.payload)
            }

            state.loading = false
            state.loadingMessages = true
        },
        receiveBotMessageRequest: (state) => {
            state.loadingMessages = true
        },
        receiveBotMessageSuccess: (state, action: PayloadAction<Message>) => {
            const exists = state.messages.find(
                (msg) => msg.id === action.payload.id
            )

            if (!exists) {
                state.messages.push(action.payload)
            }

            state.loadingMessages = false
        },
        createMessageFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        listMessagesRequest: (state) => {
            state.loadingMessages = true
        },
        listMessagesSuccess: (state, action: PayloadAction<Message[]>) => {
            state.loadingMessages = false
            state.messages = action.payload
        },
        listMessagesFailure: (state, action: PayloadAction<string>) => {
            state.loadingMessages = false
            state.error = action.payload
        },
    },
})

export const {
    createConversationRequest,
    createConversationSuccess,
    createConversationFailure,
    createMessageFailure,
    listMessagesRequest,
    listMessagesSuccess,
    listMessagesFailure,
    receiveBotMessageRequest,
    receiveBotMessageSuccess,
    sendUserMessageRequest,
    sendUserMessageSuccess,
} = chatSlice.actions

export default chatSlice.reducer
