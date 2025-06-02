import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: ${(props) => props.theme.colors.background};
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

export const AvatarContainer = styled.View`
    position: relative;
    align-self: center;
    margin-bottom: 24px;
`

export const FormContainer = styled.View`
    width: 100%;
    gap: 16px;
    margin-bottom: 24px;
`

export const SectionTitle = styled.View`
    margin-top: 8px;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors.fillColor};
`

export const RowContainer = styled.View`
    flex-direction: row;
    gap: 12px;
    width: 100%;
`

export const RowItem = styled.View`
    flex: 1;
`

export const ButtonContainer = styled.View`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 24px;
`
