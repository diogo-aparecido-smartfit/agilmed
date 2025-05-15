import { Theme } from '@/config/theme'
import MapView from 'react-native-maps'
import styled from '@emotion/native'

export const Container = styled.ImageBackground`
    flex: 1;
    background-color: ${Theme.colors.white};
`

export const ContentContainer = styled.View`
    /* flex: 1; */
    /* width: 100%; */
    /* height: 60%; */
    padding: 40px 24px;
    /* bottom: 0;
  position: absolute; */
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
