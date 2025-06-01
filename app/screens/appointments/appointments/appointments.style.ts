import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 24px;
`

export const EmptyContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 24px;
`

export const ListHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    gap: 8px;
`
