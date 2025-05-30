import { View } from 'react-native'
import { useCallback } from 'react'
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

    return (
        <S.Header>
            {showVerificationAlert && (
                <VerificationAlert onVerify={onOpenVerifyCode} />
            )}

            <S.HeaderContent>
                <S.WelcomeWrapper>
                    <S.Title>Olá</S.Title>
                    <S.Username>
                        {getFirstAndLastName(user?.full_name ?? '')}
                    </S.Username>
                </S.WelcomeWrapper>
                <Avatar
                    uri={user?.profile_picture_url ?? undefined}
                    onPress={handleNavigateToProfile}
                />
            </S.HeaderContent>
        </S.Header>
    )
}
