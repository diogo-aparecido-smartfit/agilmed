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
    margin-bottom: 24px;
`

export const FormContainer = styled.View`
    width: 100%;
    gap: 20px;
    margin-bottom: 24px;
`

export const ButtonContainer = styled.View`
    width: 100%;
    margin-top: auto;
`
