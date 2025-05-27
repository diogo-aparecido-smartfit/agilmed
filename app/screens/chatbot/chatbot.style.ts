import { Theme } from '@/config/theme'
import { ScrollView } from 'react-native'
import styled from '@emotion/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    flex-grow: 1;
    background-color: ${Theme.colors.white};
`

export const ChatContainer = styled.View`
    flex: 1;
    padding: 0px 24px;
    gap: 16px;
`

export const MessageContainer = styled.View`
    gap: 16px;
    margin-bottom: 16px;
`

export const FooterContainer = styled.KeyboardAvoidingView`
    padding: 32px 24px;
    flex-direction: row;
    gap: 16px;
    margin-top: auto;
    justify-content: space-between;
`

export const SendMessageButton = styled.TouchableOpacity`
    padding: 12px;
    border-radius: 999px;
    background-color: ${Theme.colors.mainColor};
    align-items: center;
    justify-content: center;
    align-self: center;
`

export const HeaderContainer = styled.View`
    display: flex;
    padding: 24px;
    flex-direction: row;
    align-items: center;
`

export const BotInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-left: 24px;
`

export const BotInfoWrapper = styled.View`
    flex-direction: column;
`

export const StatusWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const ActivePointer = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 16px;
    background-color: #7dde86;
`

export const TextInputWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`

export const OptionsRow = styled.ScrollView`
    flex-direction: row;
    margin: 0 -24px;
`

export const TextInput = styled.TextInput`
    flex: 1;
    padding: 10px 20px;
    border-radius: 48px;
    border: 1px solid ${Theme.colors.inputColor};
    background-color: ${Theme.colors.inputBackground};
    color: ${Theme.colors.black};
`

export const MicrophoneButton = styled.TouchableOpacity`
    z-index: 10;
    position: absolute;
    right: 0;
    padding: 12px 20px;
`

export const MapViewContainer = styled.View`
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const MarkOnMap = styled.TouchableOpacity`
    flex-direction: row;
    gap: 4px;
    align-items: center;
    justify-content: center;
`

export const EmptyContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
`
