import styled from '@emotion/native'
import { Theme } from '@/config/theme'
import { View, Text } from 'react-native'

export const DropdownContainer = styled(View)`
    flex: 1;
    gap: 12px;
    margin-bottom: 12px;
`

export const DropdownButton = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: ${Theme.colors.inputBackground};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${Theme.colors.borderColor};
`

export const DropdownButtonText = styled(Text)`
    font-size: 16px;
    color: ${Theme.colors.black};
    font-family: ${Theme.fonts.medium};
`

export const DropdownIcon = styled(View)`
    margin-left: 8px;
`

export const DropdownMenu = styled(View)`
    background-color: ${Theme.colors.inputBackground};
    border-radius: 16px;
    padding: 8px 0;
`

export const DropdownItem = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 16px;
`

export const DropdownItemText = styled(Text)`
    font-size: 16px;
    color: ${Theme.colors.black};
    font-family: ${Theme.fonts.regular};
    margin-left: 12px;
`

export const ErrorText = styled(Text)`
    color: ${Theme.colors.error};
    font-family: ${Theme.fonts.regular};
    font-size: 14px;
    margin-top: 8px;
`
