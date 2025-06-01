import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.ScrollView`
    flex-direction: column;
`

export const ProfileSection = styled.View`
    margin-bottom: 24px;
`

export const ProfileHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`

export const EditProfileButton = styled.TouchableOpacity`
    padding: 8px;
`

export const ProfileCard = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${Theme.colors.fillColor};
    padding: 16px;
    border-radius: 16px;
`

export const AvatarContainer = styled.View`
    margin-right: 16px;
`

export const ProfileInfo = styled.View`
    flex: 1;
    gap: 4px;
`

export const SettingSection = styled.View`
    margin-bottom: 24px;
`

export const SettingItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${Theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const SettingItemLeft = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const AboutItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: ${Theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const ButtonsSection = styled.View`
    margin-top: 16px;
    gap: 12px;
`
