import styled from '@emotion/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    flex-direction: column;
    padding: 16px;
    gap: 12px;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 12px;
    margin-bottom: 16px;
    elevation: 2;
    shadow-color: ${(props) => props.theme.colors.black};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`

export const HeaderContainer = styled.View`
    flex-direction: row;
    gap: 10px;
    align-items: center;
`

export const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.inputBackground};
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
    gap: 4px;
    flex: 1;
`

interface StatusBadgeProps {
    status: string
}

export const StatusBadge = styled.View<StatusBadgeProps>`
    padding: 4px 8px;
    border-radius: 12px;
    background-color: ${(props) => {
        switch (props.status) {
            case 'confirmed':
                return (props) => props.theme.colors.success
            case 'cancelled':
                return (props) => props.theme.colors.error
            case 'completed':
                return (props) => props.theme.colors.mainColor
            default:
                return (props) => props.theme.colors.warning
        }
    }};
`

export const SchedulesWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

export const ScheduleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const ReasonContainer = styled.View`
    flex-direction: column;
    gap: 4px;
    background-color: ${(props) => props.theme.colors.fillColor};
    padding: 8px 12px;
    border-radius: 8px;
`
