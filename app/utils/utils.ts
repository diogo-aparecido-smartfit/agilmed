import AsyncStorage from '@react-native-async-storage/async-storage'
import { isValid, format, parse } from 'date-fns'

export function convertToISODate(dateString: string) {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date())

    if (isValid(parsedDate)) {
        return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    }

    return ''
}

export function getFirstAndLastName(fullName: string): string {
    if (!fullName || typeof fullName !== 'string') {
        return ''
    }

    const nameParts = fullName.trim().split(' ')

    if (nameParts.length === 1) {
        return nameParts[0]
    }

    return `${nameParts[0]} ${nameParts[1]}`
}

export const normalizeHeaders = (
    headers?: HeadersInit
): Record<string, string> | undefined => {
    if (!headers) return undefined

    if (headers instanceof Headers) {
        const result: Record<string, string> = {}
        headers.forEach((value: string, key: string | number) => {
            result[key] = value
        })
        return result
    }

    if (Array.isArray(headers)) {
        return headers.reduce((acc, [key, value]) => {
            acc[key] = value
            return acc
        }, {} as Record<string, string>)
    }

    return headers as Record<string, string>
}

export const clearStorage = () => {
    return Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('user'),
    ])
}

export function generateRandomCPF() {
    const generateRandomDigits = (length: number) => {
        let result = ''
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString()
        }
        return result
    }

    return generateRandomDigits(11)
}
