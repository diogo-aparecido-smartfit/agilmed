/** @jsxImportSource @emotion/react */
import { router } from 'expo-router'
import * as S from './style'
import { ArrowLeft } from 'iconsax-react-native'
import { TouchableOpacity, View } from 'react-native'

const Header = () => {
    return (
        <View css={S.containerStyle}>
            <TouchableOpacity
                onPress={() => router.back()}
                css={S.backButtonStyle}
            >
                <ArrowLeft size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
}

export default Header
