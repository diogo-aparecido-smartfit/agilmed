import { MutableRefObject } from 'react'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import { VerifyCode } from '../VerifyCode/VerifyCode'

interface VerificationCodeModalProps {
    bottomSheetRef: MutableRefObject<BottomSheet | null>
    isVerified?: boolean
}

export default function VerificationCodeModal({
    bottomSheetRef,
    isVerified,
}: VerificationCodeModalProps) {
    if (isVerified) return null

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDownToClose
            index={-1}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior="close"
                />
            )}
        >
            <BottomSheetView>
                <VerifyCode bottomSheetRef={bottomSheetRef} />
            </BottomSheetView>
        </BottomSheet>
    )
}
