import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.TouchableOpacity`
    background-color: ${Theme.colors.mainColor};
    padding: 20px;
    flex-direction: column;
    border-radius: 12px;
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
`

export const Title = styled.Text`
    font-size: 16px;
    font-family: ${Theme.fonts.bold};
    color: ${Theme.colors.white};
`

export const Subtitle = styled.Text`
    font-size: 14px;
    font-family: ${Theme.fonts.regular};
    color: ${Theme.colors.lightDescription};
`

export const PrimaryContentWrapper = styled.View`
    flex-direction: row;
    gap: 8px;
    align-items: center;
    padding-bottom: 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${Theme.colors.description};
`

export const SecondaryContentWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 14px;
    margin-top: 18px;
`

export const AppointmentInfoWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const AppointmentInfoText = styled.Text`
    font-size: 12px;
    font-family: ${Theme.fonts.regular};
    color: ${Theme.colors.white};
`
