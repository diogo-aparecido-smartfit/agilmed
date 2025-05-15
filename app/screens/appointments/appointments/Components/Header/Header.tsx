import Button from '@/components/Button/Button'
import * as S from './style'
import { useCallback } from 'react'
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
        <S.Container
            contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 24,
            }}
            horizontal={true}
            scrollEnabled={true}
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
        </S.Container>
    )
}

export default Header
