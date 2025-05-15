import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@/store'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { fetchPharmaciesRequest } from '@/store/slices/places.slice'

export function useHomeController() {
    const dispatch = useDispatch()
    const { location } = useCurrentLocation()

    const units = useSelector((state: RootState) => state.places.list)
    const loading = useSelector((state: RootState) => state.places.loading)
    const error = useSelector((state: RootState) => state.places.error)

    useEffect(() => {
        if (location) {
            dispatch(
                fetchPharmaciesRequest({
                    lat: location.latitude,
                    lon: location.longitude,
                })
            )
        }
    }, [location])

    return {
        units,
        loading,
        error,
    }
}
