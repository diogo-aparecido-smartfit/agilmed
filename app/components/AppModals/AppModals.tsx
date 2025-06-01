import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { SOSModal } from '@/components/SOSModal/SOSModal'
import BottomSheet from '@gorhom/bottom-sheet'
import { hideSosModal } from '@/store/slices/modal.slice'

export function AppModals() {
    const dispatch = useDispatch()
    const { sosModalVisible } = useSelector((state: RootState) => state.modal)
    const sosModalRef = useRef<BottomSheet>(null)

    const handleCloseSosModal = () => {
        dispatch(hideSosModal())
    }

    useEffect(() => {
        if (sosModalVisible && sosModalRef.current) {
            setTimeout(() => {
                sosModalRef.current?.expand()
            }, 100)
        } else if (!sosModalVisible && sosModalRef.current) {
            sosModalRef.current.close()
        }
    }, [sosModalVisible])

    return (
        <>
            {sosModalVisible && (
                <SOSModal
                    ref={sosModalRef}
                    isVisible={sosModalVisible}
                    onClose={handleCloseSosModal}
                />
            )}
        </>
    )
}
