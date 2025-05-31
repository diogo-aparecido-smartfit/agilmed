import { Theme } from '@/config/theme'
import { SafeAreaView } from 'react-native'
import styled from '@emotion/native'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${Theme.colors.background};
`

export const Header = styled.View`
    padding: 16px;
    background-color: ${Theme.colors.white};
`

export const HeaderTop = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`

export const BackButton = styled.TouchableOpacity`
    padding: 8px;
    margin-right: 8px;
`

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-family: ${Theme.fonts.bold};
    color: ${Theme.colors.black};
    flex: 1;
`

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const ListWrapper = styled.View`
    flex: 1;
`
