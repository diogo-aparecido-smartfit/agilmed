import Button from '@/components/Button/Button'
import * as S from './style'
import { useCallback } from 'react'
import { showMessage } from 'react-native-flash-message'

interface HeaderProps {
    statusFilter: string | null
    setStatusFilter: (status: string | null) => void
}

const statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Confirmados', value: 'confirmed' },
    { label: 'Cancelados', value: 'cancelled' },
]

const Header = ({ statusFilter, setStatusFilter }: HeaderProps) => {
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
                flex: 1,
                gap: 12,
                paddingHorizontal: 24,
            }}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
        >
            {statusOptions.map((option) => (
                <Button
                    key={option.label}
                    onPress={() => setStatusFilter(option.value)}
                    width="auto"
                    isSecondary={statusFilter !== option.value}
                    text={option.label}
                />
            ))}
        </S.Container>
    )
}

export default Header
