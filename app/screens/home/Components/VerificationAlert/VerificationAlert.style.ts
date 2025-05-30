import styled from '@emotion/native'
import { Theme } from '@/config/theme'

export const VerifyEmailBanner = styled.View`
    background-color: #eff6ff;
    padding: 12px 16px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
`

export const AlertTitle = styled.Text`
    font-family: 'Montserrat-SemiBold';
    font-size: 14px;
    color: ${Theme.colors.title};
`

export const AlertText = styled.Text`
    font-family: 'Montserrat-SemiBold';
    font-size: 14px;
    color: #3178c6;
    text-decoration: underline;
`

export const AlertTextButton = styled.TouchableOpacity`
    margin-top: 4px;
`
