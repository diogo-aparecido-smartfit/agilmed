import MapView from 'react-native-maps'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Linking, Platform } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const UsePlaceDetailsController = () => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const mapRef = useRef<MapView>(null)
    const snapPoints = useMemo(() => ['65%', '80%', '100%'], [])
    const local = useLocalSearchParams()
    const units = useSelector((state: RootState) => state.places.list)
    const currentPlace = units.find((item) => item.id === local.id)

    useEffect(() => {
        if (mapRef.current && currentPlace) {
            mapRef.current?.animateCamera({
                center: region,
                pitch: 65,
                heading: 90,
                altitude: 1000,
                zoom: 15,
            })
        }
    }, [])

    console.log(currentPlace?.position.lat)

    const region = {
        latitude: currentPlace?.position.lat || -18.91229011548046,
        longitude: currentPlace?.position.lon || -48.274014322977926,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    }

    const scheme = Platform.select({
        ios: 'maps://0,0?q=',
        android: 'geo:0,0?q=',
    })
    const latLng = `${region.latitude},${region.longitude}`
    const label =
        'AgilMed: Está gostando do App? Nos conte o que está achando 🥰'
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
    })

    const handleOpenOnMaps = useCallback(() => {
        Linking.openURL(url as string)
    }, [])

    return {
        handleOpenOnMaps,
        mapRef,
        region,
        bottomSheetRef,
        snapPoints,
        currentPlace,
    }
}
