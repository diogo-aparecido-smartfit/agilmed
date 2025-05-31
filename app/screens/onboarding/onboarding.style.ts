import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Theme.colors.white};
`

export const ContentView = styled.View`
    flex: 1;
    padding-bottom: 120px;
`
