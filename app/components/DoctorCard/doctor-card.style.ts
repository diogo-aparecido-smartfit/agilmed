import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.background};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    elevation: 2;
    shadow-color: ${(props) => props.theme.colors.inputColor};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
`

export const PrimaryContentWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
    flex: 1;
`

export const Title = styled.Text`
    font-size: 16px;
    font-family: ${Theme.fonts.bold};
    color: ${Theme.colors.black};
`

export const Subtitle = styled.Text`
    font-size: 14px;
    font-family: ${Theme.fonts.regular};
    color: ${Theme.colors.description};
`

export const Divider = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${Theme.colors.inputColor};
    margin: 12px 0px;
`

export const SecondaryContentWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const InfoItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const InfoLabel = styled.Text`
    font-size: 14px;
    font-family: ${Theme.fonts.semiBold};
    color: ${Theme.colors.black};
`
