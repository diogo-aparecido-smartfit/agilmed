import { View } from 'react-native'
import { useCallback, useMemo } from 'react'
import { router } from 'expo-router'
import Avatar from '@/components/Avatar/Avatar'
import Text from '@/components/Text/Text'
import { getFirstAndLastName } from '@/utils/utils'
import VerificationAlert from '../VerificationAlert/VerificationAlert'
import * as S from './Header.style'

interface HeaderProps {
    user: any
    showVerificationAlert: boolean
    onOpenVerifyCode: () => void
}

export default function Header({
    user,
    showVerificationAlert,
    onOpenVerifyCode,
}: HeaderProps) {
    const handleNavigateToProfile = useCallback(() => {
        router.navigate('/(home)/(settings)/settings')
    }, [])

    const greeting = useMemo(() => {
        const currentHour = new Date().getHours()

        if (currentHour >= 5 && currentHour < 12) {
            return 'Olá, Bom dia'
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Olá, Boa tarde'
        } else {
            return 'Olá, Boa noite'
        }
    }, [])

    return (
        <S.Header>
            {showVerificationAlert && (
                <VerificationAlert onVerify={onOpenVerifyCode} />
            )}

            <S.HeaderContent>
                <S.WelcomeWrapper>
                    <Text>{greeting}</Text>
                    <Text fontSize="xl" fontWeight="700">
                        {getFirstAndLastName(user?.full_name ?? '')} 🔥
                    </Text>
                </S.WelcomeWrapper>
                <Avatar
                    uri={user?.profile_picture_url ?? undefined}
                    onPress={handleNavigateToProfile}
                />
            </S.HeaderContent>
        </S.Header>
    )
}
