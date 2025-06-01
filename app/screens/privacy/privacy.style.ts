import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Theme.colors.white};
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: ${Theme.colors.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Theme.colors.fillColor};
`

export const BackButton = styled.TouchableOpacity`
    padding: 8px;
`

export const EmptyView = styled.View`
    width: 40px;
`

export const ContentContainer = styled.ScrollView`
    flex-direction: column;
`

export const Section = styled.View`
    margin-bottom: 24px;
`

export const SectionTitle = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    gap: 8px;
`

export const PrivacyItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${Theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const PrivacyItemLeft = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`

export const ItemTextContainer = styled.View`
    gap: 4px;
    flex: 1;
`

export const ActionButton = styled.TouchableOpacity`
    padding: 16px;
    background-color: ${Theme.colors.fillColor};
    border-radius: 12px;
    margin-bottom: 8px;
`

export const ButtonsContainer = styled.View`
    margin-top: 16px;
    gap: 12px;
`
