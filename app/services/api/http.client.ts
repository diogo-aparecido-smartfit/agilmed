import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpClient = axios.create({
    // baseURL: 'https://agilmed-api.azurewebsites.net/api',
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

httpClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            status: response.status,
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
