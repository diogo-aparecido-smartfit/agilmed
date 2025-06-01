import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.background};
    flex-direction: column;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    padding: 40px 24px;
    flex-direction: column;
`

export const ContentContainer = styled.View`
    /* flex: 1; */
    background-color: ${(props) => props.theme.colors.background};
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
