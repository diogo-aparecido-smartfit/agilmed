import styled from '@emotion/native'
import { Dimensions, ImageBackground } from 'react-native'

export const Container = styled(ImageBackground)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.background};
`

export const ErrorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background-color: ${(props) => props.theme.colors.background};
`

export const HeaderButton = styled.TouchableOpacity`
    position: absolute;
    top: 48px;
    left: 16px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.colors.cardBackground}90;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

export const Content = styled.View`
    flex-direction: column;
    gap: 24px;
`

export const SectionTitle = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
`

export const DoctorHeader = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

export const DoctorInfo = styled.View`
    flex: 1;
`

export const SpecialtyBadge = styled.View`
    background-color: ${(props) => props.theme.colors.fillColor};
    padding: 6px 12px;
    border-radius: 16px;
    align-self: flex-start;
    margin-top: 4px;
`

export const ActionButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
    gap: 12px;
`

export const ActionButton = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.fillColor};
    padding: 12px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-direction: row;
    gap: 8px;
`

export const MainActionButton = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 16px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
`

export const InfoCard = styled.View`
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 16px;
    padding: 16px;
    gap: 12px;
`

export const InfoItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const AddressCard = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 16px;
    padding: 16px;
    gap: 12px;
`

export const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${(props) => `${props.theme.colors.description}20`};
    margin: 8px 0;
`

export const BioSection = styled.View`
    gap: 8px;
`

export const ScheduleSection = styled.View`
    gap: 12px;
`

export const DaySchedule = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
`
