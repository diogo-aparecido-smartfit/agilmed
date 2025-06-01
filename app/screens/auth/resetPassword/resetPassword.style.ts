import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

export const FormContainer = styled.View`
    margin: 32px 0;
    padding: 32px 12px;
`
