import styled from '@emotion/native'
import MapView from 'react-native-maps'
import { ImageBackground } from 'react-native'

export const Container = styled(ImageBackground)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.background};
`

export const ErrorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background-color: ${(props) => props.theme.colors.background};
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`

export const DoctorInfoSection = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

export const InformationContainer = styled.View`
    flex-direction: column;
    gap: 4px;
`

export const ActionsContainer = styled.View`
    flex-direction: row;
    gap: 12px;
`

export const ActionButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.fillColor};
`

export const StatusBadge = styled.View`
    align-self: flex-start;
    padding: 8px 16px;
    border-radius: 50px;
    margin-bottom: 16px;
`

export const DividerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 24px;
`

export const Divider = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${(props) => props.theme.colors.divider};
    margin-horizontal: 8px;
`

export const Content = styled.View`
    gap: 24px;
`

export const SectionTitle = styled.View`
    margin-bottom: 16px;
`

export const InfoCard = styled.View`
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 16px;
    padding: 16px;
    gap: 12px;
`

export const InfoItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const ReasonSection = styled.View`
    gap: 12px;
`

export const ReasonCard = styled.View`
    flex-direction: row;
    align-items: flex-start;
    background-color: ${(props) => props.theme.colors.fillColor};
    padding: 16px;
    border-radius: 16px;
`

export const NotesCard = styled.View`
    background-color: ${(props) => props.theme.colors.fillColor};
    padding: 16px;
    border-radius: 16px;
`

export const AddressSection = styled.View`
    gap: 12px;
`

export const AddressCard = styled.View`
    background-color: ${(props) => props.theme.colors.fillColor};
    border-radius: 16px;
    padding: 16px;
    overflow: hidden;
`

export const AddressInfo = styled.View`
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 16px;
`

export const CustomMap = styled(MapView)`
    width: 100%;
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
`

// Estilo de mapa para o tema claro
export const customMapStyle = [
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }],
    },
]

// Estilo de mapa para o tema escuro
export const darkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#242f3e' }],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#746855' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#242f3e' }],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
]
