import { View } from 'react-native'
import { InfoCircle } from 'iconsax-react-native'
import * as S from './VerificationAlert.style'

interface VerificationAlertProps {
    onVerify: () => void
}

export default function VerificationAlert({
    onVerify,
}: VerificationAlertProps) {
    return (
        <S.VerifyEmailBanner>
            <InfoCircle color="#3178C6" size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
                <S.AlertTitle>
                    Seu e-mail ainda não foi confirmado.
                </S.AlertTitle>
                <S.AlertTextButton onPress={onVerify}>
                    <S.AlertText>Verificar agora</S.AlertText>
                </S.AlertTextButton>
            </View>
        </S.VerifyEmailBanner>
    )
}
