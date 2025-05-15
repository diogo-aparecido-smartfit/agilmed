import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const ReceivedContainer = styled.View`
    flex-direction: row;
    gap: 8px;
`

export const Container = styled.View<{ isReceived?: boolean }>`
    padding: 16px;
    flex-shrink: 1;
    align-self: ${({ isReceived }) => (isReceived ? 'flex-start' : 'flex-end')};
    background-color: ${({ isReceived }) =>
        isReceived ? Theme.colors.inputBackground : Theme.colors.mainColor};
    border-radius: ${({ isReceived }) =>
        isReceived ? '0px 24px 24px 24px' : '24px 24px 0px 24px'};
`
