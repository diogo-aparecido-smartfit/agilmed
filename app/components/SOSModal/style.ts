import styled from '@emotion/native'

export const Container = styled.View`
    flex: 1;
    padding: 16px 24px;
`

export const Header = styled.View`
    margin-bottom: 24px;
    align-items: center;
`

export const ContentSection = styled.View`
    margin-bottom: 24px;
`

export const SectionTitle = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
`

export const EmergencyList = styled.View`
    gap: 12px;
`

export const EmergencyItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-radius: 12px;
    padding: 12px;
`

export const EmergencyIconContainer = styled.View`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.error}10;
    justify-content: center;
    align-items: center;
`

export const EmergencyInfo = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ChatbotOption = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-radius: 12px;
    padding: 12px;
`

export const ChatbotIconContainer = styled.View`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.mainColor}20;
    justify-content: center;
    align-items: center;
`

export const Disclaimer = styled.View`
    padding: 16px;
    margin-top: auto;
`
