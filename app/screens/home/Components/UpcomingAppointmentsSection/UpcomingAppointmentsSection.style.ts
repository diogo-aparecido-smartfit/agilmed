import styled from '@emotion/native'
import { Theme } from '@/config/theme'

export const Container = styled.View`
    width: 100%;
    margin: 16px 0px;
    padding-top: 8px;
`

export const Wrapper = styled.View`
    overflow: visible;
`

export const SectionHeader = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0px 24px;
`

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const CountBadge = styled.View`
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 4px 8px;
    border-radius: 12px;
    min-width: 24px;
    align-items: center;
    justify-content: center;
`

export const AppointmentsWrapper = styled.ScrollView`
    width: 100%;
`

export const AppointmentContainer = styled.View`
    min-width: 300px;
`

export const PaginationContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    gap: 8px;
`

interface PaginationDotProps {
    active: boolean
}

export const PaginationDot = styled.View<PaginationDotProps>`
    width: ${(props) => (props.active ? '24px' : '8px')};
    height: 8px;
    border-radius: ${(props) => (props.active ? '4px' : '4px')};
    background-color: ${(props) =>
        props.active
            ? props.theme.colors.mainColor
            : props.theme.colors.lightGray};
    transition: all 0.3s ease;
`

export const EmptyContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 12px;
    margin-horizontal: 24px;
`

export const EmptyIllustration = styled.View`
    margin-bottom: 16px;
`

export const LoadingContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 32px;
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 12px;
    margin-horizontal: 24px;
`
