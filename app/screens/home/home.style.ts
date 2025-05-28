import { Theme } from '@/config/theme'
import { TouchableOpacity, View, Text, FlatList, Platform } from 'react-native'
import styled from '@emotion/native'

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${Theme.colors.white};
`

export const VerifyEmailBanner = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 12px;
    background-color: #e6f0ff;
    border-radius: 8px;
    border: 1px solid #b3d4ff;
    margin-top: 8px;
`

export const Header = styled.View`
    flex-direction: column;
    gap: 16px;
`

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ContentContainer = styled.ScrollView`
    margin-top: 32px;
`

export const WelcomeWrapper = styled.View`
    flex-direction: column;
    gap: 6px;
`

export const Username = styled(Text)`
    color: ${Theme.colors.title};
    font-family: ${Theme.fonts.bold};
    font-size: 20px;
    line-height: 24px;
`

export const AlertTitle = styled.Text`
    color: '#3178C6';
    font-family: ${Theme.fonts.regular};
    font-size: 14px;
`

export const AlertTextButton = styled.TouchableOpacity``

export const AlertText = styled.Text`
    color: ${Theme.colors.mainColor};
    font-family: ${Theme.fonts.regular};
    font-size: 14px;
`

export const Title = styled.Text`
    color: ${Theme.colors.description};
    font-family: ${Theme.fonts.regular};
    font-size: 16px;
    line-height: 18px;
`

export const Description = styled(Text)`
    color: ${Theme.colors.title};
    font-family: ${Theme.fonts.regular};
    font-size: 16px;
`

export const UsersList = styled(FlatList)`
    flex-grow: 1;
`

export const UsersListContainer = styled(View)`
    flex: 1;
`

export const UserContainer = styled(View)`
    flex-direction: column;
    margin: 8px 0;
`

export const AlertButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${Theme.colors.mainColor};
    padding: 12px 10px;
    border-radius: 8px;
`

export const AlertButtonText = styled(Text)`
    font-size: 16px;
    font-weight: 500;
    color: #fff;
`

export const NextAppointmentsContainer = styled.View`
    flex-direction: column;
    gap: 16px;
`

export const NextAppointmentsWrapper = styled.ScrollView`
    margin: 0 -24px;
`

export const FastActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
`

export const NearDoctorsContainer = styled.View`
    margin-top: 24px;
    flex-direction: column;
    gap: 16px;
`

export const NearDoctorsList = styled.View`
    flex-direction: column;
    align-items: center;
    gap: 12px;
`
