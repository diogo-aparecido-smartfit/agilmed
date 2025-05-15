import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://agilmed-api.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

httpClient.interceptors.request.use((config) => {
    console.log('[HttpClient] Request:', {
        method: config.method,
        url: config.url,
        headers: config.headers,
        data: config.data,
    })
    const token = ''
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

httpClient.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            status: response.status,
            data: response.data,
        })
        return response
    },
    async (error) => {
        console.error(
            '[HttpClient] Erro na requisição:',
            error.response?.data || error.message
        )
        return Promise.reject(error)
    }
)

export default httpClient
