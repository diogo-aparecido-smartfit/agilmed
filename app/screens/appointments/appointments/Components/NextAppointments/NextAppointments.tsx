/** @jsxImportSource @emotion/react */
import Text from '@/components/Text/Text'
import * as S from './style'
import Avatar from '@/components/Avatar/Avatar'
import { Calendar2, Clock } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import Button from '@/components/Button/Button'
import { router } from 'expo-router'
import { View } from 'react-native'

const NextAppointments = () => {
    return (
        <View css={S.containerStyle}>
            <View css={S.headerContainerStyle}>
                <Avatar size={48} />
                <View css={S.doctorInfoWrapperStyle}>
                    <Text color="black" fontWeight="700">
                        Dr. Joseph Brostito
                    </Text>
                    <Text color="description" fontSize="sm" fontWeight="400">
                        Dentista
                    </Text>
                </View>
            </View>
            <View css={S.dividerStyle} />
            <View css={S.schedulesWrapperStyle}>
                <View css={S.scheduleContainerStyle}>
                    <Calendar2 color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        Domingo, 12 Julho
                    </Text>
                </View>
                <View css={S.scheduleContainerStyle}>
                    <Clock color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        11:00 - 12:00
                    </Text>
                </View>
            </View>
            <Button
                onPress={() => router.navigate('/(appointment)/details/1')}
                isSecondary
                text="Detalhes"
            />
        </View>
    )
}

export default NextAppointments
