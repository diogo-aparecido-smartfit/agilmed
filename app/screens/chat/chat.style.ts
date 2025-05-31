import { Theme } from '@/config/theme'
import styled from '@emotion/native'
import Animated from 'react-native-reanimated'

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${Theme.colors.mainColor};
`

export const ScrollContainer = styled.ScrollView`
    width: 100%;
`

export const ContentContainer = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 24px;
`

export const HeaderSection = styled.View`
    align-items: center;
    margin-bottom: 32px;
    padding-top: 20px;
`

export const AvatarContainer = styled.View`
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
    justify-content: center;
    align-items: center;
`

export const FeaturesSection = styled.View`
    margin-bottom: 32px;
`

export const CarouselCard = styled.View`
    background-color: ${Theme.colors.white};
    border-radius: 16px;
    padding: 24px;
    margin-vertical: 8px;
    elevation: 3;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
    align-items: center;
    justify-content: center;
    height: 200px;
`

export const FeatureIconContainer = styled.View`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: ${Theme.colors.fillColor};
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`

export const FeatureContent = styled.View`
    align-items: center;
    justify-content: center;
`

export const CarouselPagination = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
`

interface PaginationDotProps {
    active: boolean
}

export const PaginationDot = styled(Animated.View)<PaginationDotProps>`
    width: ${(props) => (props.active ? '12px' : '8px')};
    height: 8px;
    border-radius: ${(props) => (props.active ? '6px' : '4px')};
    background-color: ${(props) =>
        props.active ? Theme.colors.white : 'rgba(255, 255, 255, 0.5)'};
    margin-horizontal: 4px;
`
export const StatusBadge = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: center;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 6px 12px;
    border-radius: 20px;
    margin-bottom: 24px;
`

export const StatusDot = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #4ade80;
    margin-right: 6px;
`

export const StartChatButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    padding: 16px;
    gap: 8px;
`

export const FeatureCard = styled.View`
    flex-direction: row;
    background-color: ${Theme.colors.white};
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 8px;
    width: 48%;
    elevation: 2;
    shadow-color: #000;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.2;
    shadow-radius: 2px;
    align-items: center;
`
