import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${Theme.colors.mainColor};
`

export const ContentContainer = styled.View`
    flex: 1;
    flex-direction: column;
    gap: 16px;
    padding: 40px 24px;
`

export const NavigationButton = styled.TouchableOpacity`
    max-width: 80%;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

export const ScheduleButton = styled.TouchableOpacity`
    margin-top: auto;
    justify-content: space-between;
    flex-direction: row;
    padding: 8px 12px;
    border-radius: 8px;
`

export const ChatButton = styled.View`
    padding: 10px;
    border-radius: 12px;
    background-color: ${Theme.colors.white};
    align-items: center;
    justify-content: center;
    align-self: center;
`

export const ScheduleTextWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    gap: 4px;
`

export const IconContainer = styled.View``
