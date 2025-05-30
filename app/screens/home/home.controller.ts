import { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useAppointments } from '@/hooks/api/useAppointments'
import BottomSheet from '@gorhom/bottom-sheet'
import { usePlaces } from '@/hooks/usePlaces'

export const useHomeController = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const bottomSheetRef = useRef<BottomSheet>(null)

    const {
        appointments,
        error: appointmentsError,
        loading: loadingAppointments,
        refetch: refetchAppointments,
    } = useAppointments()

    const { units, loading: loadingUnits, error: unitsError } = usePlaces()

    const handleOpenVerifyCode = useCallback(() => {
        bottomSheetRef.current?.expand()
    }, [])

    const refetch = useCallback(() => {
        refetchAppointments()
    }, [refetchAppointments])

    return {
        units,
        loading: loadingUnits,
        error: unitsError,
        appointments,
        loadingAppointments,
        appointmentsError,
        bottomSheetRef,
        user,
        refetch,
        handleOpenVerifyCode,
    }
}
