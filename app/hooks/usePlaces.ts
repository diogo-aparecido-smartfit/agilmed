import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { fetchPharmaciesRequest } from '@/store/slices/places.slice'
import { useCurrentLocation } from './useCurrentLocation'

export const usePlaces = () => {
    const dispatch = useDispatch()
    const {
        list: units,
        loading,
        error,
    } = useSelector((state: RootState) => state.places)
    const { location } = useCurrentLocation()

    useEffect(() => {
        if (location) {
            dispatch(
                fetchPharmaciesRequest({
                    lat: location.latitude,
                    lon: location.longitude,
                })
            )
        }
    }, [dispatch, location])

    return {
        units,
        loading,
        error,
    }
}
