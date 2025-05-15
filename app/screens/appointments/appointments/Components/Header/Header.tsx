/** @jsxImportSource @emotion/react */
import Button from '@/components/Button/Button'
import * as S from './style'
import { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

const Header = () => {
    const handleDisplayMessage = useCallback(
        () =>
            showMessage({
                message: 'Desculpe, mas esta ação ainda não foi implementada.',
                type: 'warning',
            }),
        []
    )

    return (
        <ScrollView
            css={S.containerStyle}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
        >
            <Button
                onPress={handleDisplayMessage}
                width="auto"
                isSecondary
                text="Cancelados"
            />
            <Button
                onPress={handleDisplayMessage}
                width="auto"
                text="Próximos agendamentos"
            />
            <Button
                onPress={handleDisplayMessage}
                width="auto"
                isSecondary
                text="Remarcados"
            />
        </ScrollView>
    )
}

export default Header
