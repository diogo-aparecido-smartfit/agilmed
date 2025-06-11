import React, { useState } from 'react'
import { Icon, IconProps, Smileys } from 'iconsax-react-native'
import * as S from './style'
import { Theme } from '@/config/theme'
import { ActivityIndicator } from 'react-native'
import ImageViewerModal from '../ImageViewerModal/image-viewer-modal'

interface AvatarProps {
    uri?: string | typeof Icon
    size?: number
    icon?: IconProps
    isLoading?: boolean
    onPress?: () => void
    enableImageViewer?: boolean
}

const Avatar = ({
    uri,
    onPress,
    icon,
    size,
    isLoading,
    enableImageViewer = true,
}: AvatarProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handlePress = () => {
        if (enableImageViewer && typeof uri === 'string') {
            setIsModalVisible(true)
        }

        if (onPress) {
            onPress()
        }
    }

    if (isLoading) {
        return (
            <S.Container onPress={handlePress} width={size} height={size}>
                <S.IconBackground>
                    <ActivityIndicator color={Theme.colors.mainColor} />
                </S.IconBackground>
            </S.Container>
        )
    }

    if (!uri) {
        return (
            <S.Container onPress={handlePress} width={size} height={size}>
                <S.IconBackground>
                    <Smileys
                        variant="Bold"
                        size={size ? size / 2 : 32}
                        color={Theme.colors.mainColor}
                    />
                </S.IconBackground>
            </S.Container>
        )
    }

    if (typeof uri !== 'string') {
        const IconComponent = uri

        return (
            <S.Container onPress={handlePress} width={size} height={size}>
                <S.IconBackground>
                    <IconComponent
                        color={Theme.colors.mainColor}
                        size={size ? size / 2 : 56 / 2}
                        {...icon}
                    />
                </S.IconBackground>
            </S.Container>
        )
    }

    return (
        <>
            <S.Container onPress={handlePress} width={size} height={size}>
                <S.Image
                    width={size ?? 56}
                    height={size ?? 56}
                    source={{ uri: uri as string }}
                />
            </S.Container>

            <ImageViewerModal
                isVisible={isModalVisible}
                imageUri={uri}
                onClose={() => setIsModalVisible(false)}
                rounded={true}
            />
        </>
    )
}

export default Avatar
