import { Theme } from '@/config/theme'
import { SafeAreaView } from 'react-native'
import styled from '@emotion/native'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.View`
    flex: 1;
    padding: 40px 24px;
    align-items: center;
    justify-content: center;
    z-index: 1;
`

export const HeaderContainer = styled.View`
    align-items: center;
    justify-content: center;
`

export const CountdownContainer = styled.View`
    margin-top: 40px;
    padding: 10px 20px;
`

export const ConfettiOverlay = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    pointer-events: none;
`
