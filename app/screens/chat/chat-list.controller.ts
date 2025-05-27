import { router } from 'expo-router'

export const useChatlistController = () => {
    const handleStartConversation = () => {
        router.push('/(home)/(chat)/chat')
    }

    return {
        handleStartConversation,
    }
}
