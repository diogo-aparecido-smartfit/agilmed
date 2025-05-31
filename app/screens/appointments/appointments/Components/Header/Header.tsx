import Button from '@/components/Button/Button'
import * as S from './style'
import { useCallback } from 'react'
import { showMessage } from 'react-native-flash-message'
import { Theme } from '@/config/theme'

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
        <S.HeaderContainer>
            <S.ButtonsScroll
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    gap: 8,
                    paddingVertical: 8,
                }}
            >
                {statusOptions.map((option) => (
                    <S.FilterButton
                        key={option.label}
                        active={statusFilter === option.value}
                        onPress={() => setStatusFilter(option.value)}
                    >
                        <S.FilterButtonText
                            active={statusFilter === option.value}
                        >
                            {option.label}
                        </S.FilterButtonText>
                    </S.FilterButton>
                ))}
            </S.ButtonsScroll>
        </S.HeaderContainer>
    )
}

export default Header
