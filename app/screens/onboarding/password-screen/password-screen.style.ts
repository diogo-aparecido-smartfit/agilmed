import { Theme } from '@/config/theme'
import { SafeAreaView } from 'react-native'
import styled from '@emotion/native'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

export const HeaderContainer = styled.View`
    margin-bottom: 40px;
`

export const FormContainer = styled.View`
    margin-top: 20px;
`
