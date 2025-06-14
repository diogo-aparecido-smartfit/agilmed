import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import store from '@/store'
import { logoffRequest } from '@/store/slices/auth.slice'
import { router } from 'expo-router'
import { replace } from 'expo-router/build/global-state/routing'

const httpClient = axios.create({
    // baseURL: 'https://agilmed-api.azurewebsites.net/api',
    baseURL: 'http://192.168.0.15:3000/api',
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
        if (error.response?.status === 401) {
            store.dispatch(logoffRequest())
            router.replace('/(auth)/login')
        }
        console.log(
            'error.response?.data: ',
            JSON.stringify(error.response?.data)
        )
        console.log('error.message: ', JSON.stringify(error.message))
        console.error(
            '[HttpClient] Erro na requisição:',
            error.response?.data || error.message
        )
        return Promise.reject(error.response?.data || error)
    }
)

export default httpClient
