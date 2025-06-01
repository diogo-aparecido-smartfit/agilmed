import { router } from 'expo-router'
import * as S from './style'
import { ArrowLeft } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

interface LayoutHeaderProps {
    hasBackButton?: boolean
    transparent?: boolean
}

const LayoutHeader = ({ hasBackButton, transparent }: LayoutHeaderProps) => {
    const { darkMode } = useSelector((state: RootState) => state.settings)

    if (hasBackButton) {
        return (
            <S.Container transparent={transparent}>
                <S.Button onPress={() => router.back()}>
                    <ArrowLeft
                        size={24}
                        color={
                            darkMode ? Theme.colors.white : Theme.colors.black
                        }
                    />
                </S.Button>
            </S.Container>
        )
    }

    return <S.Container />
}

export default LayoutHeader
