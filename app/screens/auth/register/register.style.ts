import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Theme.colors.white};
`

export const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

export const FormContainer = styled.View`
    flex: 1;
    margin: 32px 0;
    padding: 32px 12px;
`

export const RowIputContainer = styled.View`
    flex-direction: row;
    flex: 1;
    justify-content: center;
    gap: 8px;
`

export const DividerContainer = styled.View`
    padding: 8px 0 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
`

export const Divider = styled.View`
    flex: 1;
    flex-direction: row;
    height: 1px;
    background-color: ${Theme.colors.inputColor};
`
