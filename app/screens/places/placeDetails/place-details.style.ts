import { Theme } from '@/config/theme'
import MapView from 'react-native-maps'
import styled from '@emotion/native'

export const Container = styled.ImageBackground`
    flex: 1;
    background-color: ${Theme.colors.white};
`

export const ContentContainer = styled.View`
    padding: 40px 24px;
    background-color: ${Theme.colors.white};
    flex-direction: column;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Content = styled.View`
    flex-direction: column;
    gap: 8px;
`

export const AddressContainer = styled.View`
    margin-top: 16px;
    flex-direction: column;
    gap: 8px;
`

export const InformationContainer = styled.View`
    flex-direction: column;
`

export const ReviewsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const DividerContainer = styled.View`
    flex-direction: row;
    gap: 4px;
    align-items: center;
    margin: 24px 0;
`

export const Divider = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Theme.colors.inputColor};
`

export const DetailsContainer = styled.View``

export const CustomMap = styled(MapView)`
    width: 100%;
    height: 250px;
    border-radius: 16px;
    overflow: hidden;
`

export const customMapStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#1d2c4d',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#8ec3b9',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1a3646',
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#4b6878',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#64779e',
            },
        ],
    },
    {
        featureType: 'administrative.province',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#4b6878',
            },
        ],
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#334e87',
            },
        ],
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
            {
                color: '#023e58',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#283d6a',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#6f9ba5',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1d2c4d',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#023e58',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#3C7680',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#304a7d',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#98a5be',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1d2c4d',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#2c6675',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#255763',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#b0d5ce',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#023e58',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#98a5be',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1d2c4d',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#283d6a',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
            {
                color: '#3a4762',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#0e1626',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#4e6d70',
            },
        ],
    },
]

export const SectionContainer = styled.View`
    margin-top: 24px;
    flex-direction: column;
    gap: 12px;
`

export const ServicesList = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
`

export const ServiceItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: ${Theme.colors.lightGray};
    padding: 8px 12px;
    border-radius: 8px;
`

export const OpeningHoursContainer = styled.View`
    flex-direction: column;
    gap: 8px;
`

export const OpeningHoursItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 0;
`

export const ActionsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
`

export const ActionButton = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: white;
    border: 1px solid;
    border-color: ${Theme.colors.mainColor};
    padding: 12px 16px;
    border-radius: 12px;
    flex: 1;
    margin: 0px 4px;
`

export const StatusContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
`

export const StatusDot = styled.View<{ isOpen: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) =>
        props.isOpen ? Theme.colors.success : Theme.colors.error};
`

export const SpecialistsList = styled.View`
    flex-direction: column;
    gap: 16px;
`

export const SpecialistItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const SpecialistInfo = styled.View`
    flex-direction: column;
`

export const FacilityImagePlaceholder = styled.View`
    width: 100%;
    height: 220px;
    background-color: ${Theme.colors.lightDescription};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 16px;
`

export const PrimaryButton = styled(ActionButton)`
    background-color: ${Theme.colors.mainColor};
`

export const SecondaryButton = styled(ActionButton)`
    background-color: ${Theme.colors.lightGray};
`

export const OutlineButton = styled(ActionButton)`
    background-color: transparent;
    border: 1px solid ${Theme.colors.mainColor};
`

export const IconButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${Theme.colors.lightGray};
    justify-content: center;
    align-items: center;
`

export const FloatingButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${Theme.colors.mainColor};
    justify-content: center;
    align-items: center;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
`
