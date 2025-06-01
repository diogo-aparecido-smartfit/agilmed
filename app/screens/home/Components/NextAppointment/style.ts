import styled from '@emotion/native'
import { Theme } from '@/config/theme'

export const Container = styled.TouchableOpacity`
    border-radius: 16px;
    padding: 16px;
    background-color: ${(props) => props.theme.colors.mainColor};
    overflow: hidden;
    elevation: 4;
    shadow-color: ${(props) => props.theme.colors.mainColor};
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
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.white};
`

export const PrimaryContentWrapper = styled.View`
    flex-direction: row;
    gap: 12px;
    margin-bottom: 16px;
`

export const AvatarContainer = styled.View`
    margin-right: 4px;
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    flex: 1;
`

export const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${(props) => `${props.theme.colors.white}20`};
    margin-bottom: 16px;
`

export const SecondaryContentWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const InfoColumn = styled.View`
    flex-direction: column;
    gap: 8px;
`

export const AppointmentInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const ViewDetailsButton = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
    background-color: ${(props) => `${props.theme.colors.white}20`};
    padding: 8px 12px;
    border-radius: 8px;
`
