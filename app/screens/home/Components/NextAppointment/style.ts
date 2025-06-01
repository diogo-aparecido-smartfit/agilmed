import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.TouchableOpacity`
    background-color: ${Theme.colors.mainColor};
    padding: 20px;
    flex-direction: column;
    border-radius: 16px;
    min-width: 300px;
    flex: 1;
    elevation: 4;
    shadow-color: ${Theme.colors.mainColor};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.3;
    shadow-radius: 4px;
`

export const CardHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`

export const StatusIndicator = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #4caf50;
    box-shadow: 0px 0px 4px rgba(76, 175, 80, 0.6);
`

export const PrimaryContentWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`

export const AvatarContainer = styled.View`
    border-radius: 30px;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.3);
    padding: 2px;
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
    gap: 4px;
`

export const Divider = styled.View`
    height: 1px;
    background-color: rgba(255, 255, 255, 0.15);
    margin-vertical: 16px;
`

export const SecondaryContentWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`

export const InfoColumn = styled.View`
    flex-direction: column;
    gap: 12px;
`

export const AppointmentInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const ViewDetailsButton = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 12px;
    border-radius: 20px;
`
