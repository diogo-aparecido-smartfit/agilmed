import EventSource from 'react-native-sse'
import { receiveBotMessageSuccess } from '@/store/slices/chat.slice'
import store from '@/store'

let eventSource: EventSource | null = null

export const startListeningToBot = (
    conversationId: string,
    userId: string,
    userBotId: string
) => {
    const url = `https://chat.botpress.cloud/9a7f2f76-2d7c-4efd-b142-e9036d6e4295/conversations/${conversationId}/listen?userId=${userId}`

    eventSource = new EventSource(url, {
        headers: {
            'x-user-key': userBotId,
        },
        lineEndingCharacter: '\n',
    })

    eventSource.addEventListener('message', (event) => {
        try {
            console.log('[SSE] Evento recebido:', event)

            const data = JSON.parse(event.data || '')
            if (data.type === 'message_created') {
                console.log('[SSE] Mensagem recebida do bot:', data.payload)

                store.dispatch(receiveBotMessageSuccess(data.data))
                return
            }
        } catch (err) {
            console.warn('[SSE] Erro ao processar evento:', err)
        }
    })

    eventSource.addEventListener('error', (e) => {
        console.error('[SSE] Erro na conexão:', e)
    })

    console.log('[SSE] Conectado ao bot')
}

export const stopListeningToBot = () => {
    if (eventSource) {
        eventSource.close()
        eventSource = null
        console.log('[SSE] Conexão encerrada')
    }
}
