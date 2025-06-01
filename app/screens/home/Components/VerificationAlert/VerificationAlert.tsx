import { View } from 'react-native'
import { InfoCircle } from 'iconsax-react-native'
import * as S from './VerificationAlert.style'
import Text from '@/components/Text/Text'
import { Theme } from '@/config/theme'

interface VerificationAlertProps {
    onVerify: () => void
}

export default function VerificationAlert({
    onVerify,
}: VerificationAlertProps) {
    return (
        <S.VerifyEmailBanner>
            <InfoCircle color={Theme.colors.blue} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
                <Text fontSize="sm">Seu e-mail ainda não foi confirmado.</Text>
                <S.AlertTextButton onPress={onVerify}>
                    <Text fontSize="sm" color="blue">
                        Verificar agora
                    </Text>
                </S.AlertTextButton>
            </View>
        </S.VerifyEmailBanner>
    )
}
