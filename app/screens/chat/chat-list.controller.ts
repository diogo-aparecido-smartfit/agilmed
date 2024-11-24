import { RootState } from "@/store";
import { createConversationRequest } from "@/store/slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";

export const useChatlistController = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, error, conversationId } = useSelector(
    (state: RootState) => state.chat
  );

  const handleCreateConversation = () => {
    if (user?.chatbot_user_id) {
      dispatch(createConversationRequest());
    }
  };

  return {
    loading,
    error,
    conversationId,
    handleCreateConversation,
  };
};
