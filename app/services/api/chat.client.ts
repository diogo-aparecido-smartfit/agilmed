import { OPENROUTER_API_KEY } from '@/utils/constants'
import axios from 'axios'

const chatClient = axios.create({
    baseURL: 'https://openrouter.ai/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
})

chatClient.interceptors.request.use((config) => {
    console.log('Request:', {
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.data,
    })
    return config
})

chatClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(
            '[Chatbot] Erro na requisição:',
            error.response?.data || error.message
        )
        return Promise.reject(error)
    }
)

export default chatClient
