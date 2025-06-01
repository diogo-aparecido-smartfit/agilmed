import styled from '@emotion/native'
import { SafeAreaView } from 'react-native'

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

export const HeaderContainer = styled.View`
    margin-bottom: 40px;
`

export const SettingsContainer = styled.View`
    flex: 1;
    gap: 32px;
`

export const Section = styled.View`
    margin-bottom: 24px;
`

export const SettingItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const SettingItemLeft = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const TermsItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const TermsLink = styled.TouchableOpacity`
    padding: 8px;
`
