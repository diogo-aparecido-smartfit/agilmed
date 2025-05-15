/** @jsxImportSource @emotion/react */
import * as S from '@/screens/schedule/schedule.style'
import { useNavigation } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

export default function SchedulePage() {
    const navigation = useNavigation()
    return (
        <View css={S.containerStyle}>
            <Text css={S.titleStyle}>Tela de agendamentos</Text>
            <TouchableOpacity
                css={S.buttonStyle}
                onPress={() => navigation.goBack()}
            >
                <Text css={S.buttonTextStyle}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}
