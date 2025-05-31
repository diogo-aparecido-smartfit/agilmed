import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    flex-direction: column;
    padding: 16px;
    gap: 12px;
    background-color: ${Theme.colors.white};
    border-radius: 12px;
    margin-bottom: 16px;
    elevation: 2;
    shadow-color: ${Theme.colors.black};
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
    background-color: ${Theme.colors.inputBackground};
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
                return Theme.colors.success
            case 'cancelled':
                return Theme.colors.error
            case 'completed':
                return Theme.colors.mainColor
            default:
                return Theme.colors.warning
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
    background-color: ${Theme.colors.fillColor};
    padding: 8px 12px;
    border-radius: 8px;
`
