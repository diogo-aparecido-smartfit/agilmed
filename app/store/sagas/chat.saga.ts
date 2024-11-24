import {
  call,
  delay,
  Effect,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createConversationRequest,
  createConversationSuccess,
  createConversationFailure,
  createMessageSuccess,
  listMessagesRequest,
  createMessageFailure,
  listMessagesSuccess,
  listMessagesFailure,
  createMessageRequest,
  Message,
} from "../slices/chat.slice";
import { Post } from "@/services/api/chat.methods";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { RootState } from "..";
import { createMessage, listMessages } from "@/services/chat/chat.services";

interface CreateConversationResponse {
  conversation: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

const selectConversationId = (state: RootState) => state.chat.conversationId;
const selectMessages = (state: RootState) => state.chat.messages;
const selectChatbotUserId = (state: RootState) =>
  state.auth.user?.chatbot_user_id;

function* handleCreateConversation(): Generator<Effect> {
  try {
    const getConversationId = yield select(selectConversationId);
    const conversationId = <string>getConversationId;

    const getChatbotUserId = yield select(selectChatbotUserId);
    const chatbotUserId = <string>getChatbotUserId;

    if (conversationId) {
      router.push("/(home)/(chat)/chat");
      return;
    }

    const data = yield call(
      Post,
      "/conversations",
      {},
      {
        "x-user-key": chatbotUserId,
      }
    );

    const response = <CreateConversationResponse>data;

    console.log(response);

    yield put(
      createConversationSuccess({ conversationId: response.conversation.id })
    );
    showMessage({
      message: "Nova conversa iniciada com sucesso.",
      type: "success",
    });
    router.push("/(home)/(chat)/chat");
  } catch (error: any) {
    showMessage({
      message: "Erro ao iniciar nova conversa.",
      type: "default",
    });
    yield put(
      createConversationFailure(
        error.message || "Failed to create conversation"
      )
    );
  }
}

function* handleCreateMessage(
  action: PayloadAction<{ text: string }>
): Generator<Effect> {
  try {
    const getConversationId = yield select(selectConversationId);
    const conversationId = <string>getConversationId;
    const { text } = action.payload;

    const getChatbotUserId = yield select(selectChatbotUserId);
    const chatbotUserId = <string>getChatbotUserId;

    const data = yield call(createMessage, conversationId, text, chatbotUserId);
    const response = <{ message: Message }>data;

    yield put(createMessageSuccess(response.message));

    yield put(listMessagesRequest());
  } catch (error) {
    console.error(error);
    yield put(createMessageFailure("Failed to create message"));
    showMessage({
      message:
        "Não foi possível enviar a mensagem, por favor, tente novamente mais tarde.",
      type: "danger",
    });
  }
}

function* handleListMessages(): Generator<Effect> {
  try {
    const getConversationId = yield select(selectConversationId);
    const conversationId = <string>getConversationId;

    const getMessages = yield select(selectMessages);
    const messages = <string>getMessages;

    const getChatbotUserId = yield select(selectChatbotUserId);
    const chatbotUserId = <string>getChatbotUserId;

    yield delay(3000);

    const data = yield call(listMessages, conversationId, chatbotUserId);

    const response = <{ messages: Message[] }>data;

    if (response.messages.length === messages.length) {
      yield delay(500);
      yield put(listMessagesRequest());
      return;
    }

    yield put(listMessagesSuccess(response.messages.reverse()));
  } catch (error) {
    console.error(error);
    yield put(listMessagesFailure("Failed to list messages"));
    showMessage({
      message:
        "Não foi possível carregar o histórico de mensagens, por favor, tente novamente mais tarde.",
      type: "danger",
    });
  }
}

export default function* chatSaga() {
  yield takeLatest(createConversationRequest.type, handleCreateConversation);
  yield takeLatest(createMessageRequest.type, handleCreateMessage);
  yield takeLatest(listMessagesRequest.type, handleListMessages);
}
