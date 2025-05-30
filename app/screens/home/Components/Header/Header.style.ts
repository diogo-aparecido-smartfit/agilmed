import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Header = styled.View`
    flex-direction: column;
    gap: 16px;
`

export const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const WelcomeWrapper = styled.View`
    flex-direction: column;
`

export const Title = styled.Text`
    font-family: ${Theme.fonts.regular};
    font-size: 16px;
    color: ${Theme.colors.title};
`

export const Username = styled.Text`
    font-size: 24px;
    color: ${Theme.colors.title};
    font-family: ${Theme.fonts.bold};
`
