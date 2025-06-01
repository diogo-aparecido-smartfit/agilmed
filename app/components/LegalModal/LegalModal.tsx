import React, { useRef, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'iconsax-react-native'
import Text from '@/components/Text/Text'
import * as S from './style'
import { useTheme } from '@emotion/react'
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'

interface LegalModalProps {
    isVisible: boolean
    onClose: () => void
    title: string
    content: string | React.ReactNode
}

export const LegalModal: React.FC<LegalModalProps> = ({
    isVisible,
    onClose,
    title,
    content,
}) => {
    const theme = useTheme()
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = ['90%']

    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.expand()
        } else {
            bottomSheetRef.current?.close()
        }
    }, [isVisible])

    const handleSheetChanges = (index: number) => {
        if (index === -1) {
            onClose()
        }
    }

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
        />
    )

    if (!isVisible) return null

    return (
        <Portal>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                onClose={onClose}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{
                    backgroundColor: theme.colors.lightGray,
                    width: 40,
                }}
                backgroundStyle={{
                    backgroundColor: theme.colors.background,
                }}
            >
                <S.Header>
                    <TouchableOpacity onPress={onClose}>
                        <ArrowLeft size={24} color={theme.colors.title} />
                    </TouchableOpacity>
                    <Text
                        fontSize="lg"
                        fontWeight="700"
                        style={{ flex: 1, textAlign: 'center' }}
                    >
                        {title}
                    </Text>
                    <S.EmptySpace />
                </S.Header>

                <BottomSheetScrollView
                    contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                >
                    {typeof content === 'string' ? (
                        <Text color="description" fontSize="sm">
                            {content}
                        </Text>
                    ) : (
                        content
                    )}
                </BottomSheetScrollView>

                <S.Footer>
                    <S.CloseButton onPress={onClose}>
                        <Text color="white" fontWeight="600">
                            Fechar
                        </Text>
                    </S.CloseButton>
                </S.Footer>
            </BottomSheet>
        </Portal>
    )
}
