import { RootState } from "@/store";
import {
  createMessageRequest,
  listMessagesRequest,
} from "@/store/slices/chat.slice";
import { useState, useEffect, useCallback, useRef } from "react";
import { Linking, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const useChatbotController = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, messages, loadingMessages } = useSelector(
    (state: RootState) => state.chat
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const [today, setToday] = useState<string>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shortToday = new Date().toLocaleString("pt", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });

    setToday(shortToday.charAt(0).toUpperCase() + shortToday.slice(1));
  }, []);

  const onSendMessage = useCallback(() => {
    if (message.trim()) {
      dispatch(createMessageRequest({ text: message }));
      setMessage("");
    }
  }, [setMessage, dispatch, createMessageRequest, message]);

  const handleSelectOption = useCallback(
    (option: string) => {
      if (option.trim()) {
        dispatch(createMessageRequest({ text: option }));
        setMessage("");
      }
    },
    [setMessage]
  );

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
  };
};

export default useChatbotController;
