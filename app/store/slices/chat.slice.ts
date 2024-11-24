import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessagePayload {
  type: string;
  text?: string;
  options?: Array<{ label: string; value: string }>;
}

export interface Message {
  id: string;
  createdAt: string;
  conversationId: string;
  userId: string;
  payload: MessagePayload;
}

export interface ChatState {
  loading: boolean;
  loadingMessages: boolean;
  error: string | null;
  conversationId: string | null;
  messages: Message[];
}

const initialState: ChatState = {
  loading: false,
  loadingMessages: false,
  error: null,
  conversationId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createConversationRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createConversationSuccess(
      state,
      action: PayloadAction<{ conversationId: string }>
    ) {
      state.loading = false;
      state.conversationId = action.payload.conversationId;
    },
    createConversationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createMessageRequest: (state, action: PayloadAction<{ text: string }>) => {
      state.loading = true;
    },
    createMessageSuccess: (state, action: PayloadAction<Message>) => {
      state.loading = false;
      state.messages.push(action.payload);
    },
    createMessageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    listMessagesRequest: (state) => {
      state.loadingMessages = true;
    },
    listMessagesSuccess: (state, action: PayloadAction<Message[]>) => {
      state.loadingMessages = false;
      state.messages = action.payload;
    },
    listMessagesFailure: (state, action: PayloadAction<string>) => {
      state.loadingMessages = false;
      state.error = action.payload;
    },
  },
});

export const {
  createConversationRequest,
  createConversationSuccess,
  createConversationFailure,
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  listMessagesRequest,
  listMessagesSuccess,
  listMessagesFailure,
} = chatSlice.actions;

export default chatSlice.reducer;
