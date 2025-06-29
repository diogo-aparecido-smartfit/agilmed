import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 40px 24px;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

export const TextContainer = styled.View`
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 56px;
`

export const CodeContainer = styled.View`
    flex-direction: column;
    gap: 32px;
`

export const RememberedPassword = styled.TouchableOpacity``
