import { MutableRefObject } from 'react'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import { VerifyCode } from '../VerifyCode/VerifyCode'
import { useTheme } from '@/hooks/useTheme'

interface VerificationCodeModalProps {
    bottomSheetRef: MutableRefObject<BottomSheet | null>
    isVerified?: boolean
}

export default function VerificationCodeModal({
    bottomSheetRef,
    isVerified,
}: VerificationCodeModalProps) {
    const { colors } = useTheme()
    if (isVerified) return null

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDownToClose
            index={-1}
            backgroundStyle={{ backgroundColor: colors.background }}
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
