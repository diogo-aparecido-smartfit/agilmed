import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const FastActionWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

export const FastActionButton = styled.TouchableOpacity`
    padding: 24px;
    border-radius: 999px;
    background-color: ${Theme.colors.inputBackground};
`
