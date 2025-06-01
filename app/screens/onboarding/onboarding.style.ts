import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentView = styled.View`
    flex: 1;
    padding-bottom: 120px;
`
