import { Theme } from '@/config/theme'
import { Platform } from 'react-native'
import styled from '@emotion/native'

export const Container = styled.View<{ transparent?: boolean }>`
    background-color: ${({ transparent }) =>
        transparent ? 'transparent' : Theme.colors.white};
    height: ${Platform.OS === 'android' ? '70px' : '90px'};
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 24px;
`

export const Button = styled.TouchableOpacity``
