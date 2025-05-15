import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://agilmed-api.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error(
            'Erro na requisição:',
            error.response?.data || error.message
        )
        return Promise.reject(error)
    }
)

httpClient.interceptors.request.use((config) => {
    const token = ''
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default httpClient
