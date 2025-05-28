import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { RootState } from '@/store'
import { useCurrentLocation } from '@/hooks/useCurrentLocation'
import { fetchPharmaciesRequest } from '@/store/slices/places.slice'
import BottomSheet from '@gorhom/bottom-sheet'

export function useHomeController() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['50%'], [])
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

    const handleOpenVerifyCode = useCallback(() => {
        bottomSheetRef.current?.expand()
    }, [])

    return {
        units,
        loading,
        error,
        snapPoints,
        bottomSheetRef,
        handleOpenVerifyCode,
    }
}
