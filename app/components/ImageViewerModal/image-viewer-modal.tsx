import React from 'react'
import {
    Modal,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native'
import * as S from './image-viewer-modal.style'
import { useTheme } from '@/hooks/useTheme'
import { ArrowLeft2 } from 'iconsax-react-native'

interface ImageViewerModalProps {
    isVisible: boolean
    imageUri?: string
    onClose: () => void
    rounded?: boolean
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
    isVisible,
    imageUri,
    onClose,
    rounded = true,
}) => {
    const { colors } = useTheme()
    const windowWidth = Dimensions.get('window').width

    if (!imageUri) return null

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <StatusBar
                backgroundColor="rgba(0, 0, 0, 0.9)"
                barStyle="light-content"
            />
            <TouchableWithoutFeedback onPress={onClose}>
                <S.Container>
                    <TouchableWithoutFeedback
                        onPress={(e) => e.stopPropagation()}
                    >
                        <S.ImageContainer>
                            <S.Image
                                source={{ uri: imageUri }}
                                style={{
                                    width: windowWidth * 0.8,
                                    height: windowWidth * 0.8,
                                    borderRadius: rounded
                                        ? (windowWidth * 0.8) / 2
                                        : 0,
                                }}
                                resizeMode="cover"
                            />
                        </S.ImageContainer>
                    </TouchableWithoutFeedback>
                </S.Container>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ImageViewerModal
