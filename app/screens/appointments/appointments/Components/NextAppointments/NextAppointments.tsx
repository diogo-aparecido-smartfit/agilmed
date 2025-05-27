import Text from '@/components/Text/Text'
import * as S from './style'
import Avatar from '@/components/Avatar/Avatar'
import { Calendar2, Clock } from 'iconsax-react-native'
import { Theme } from '@/config/theme'

const NextAppointments = () => {
    return (
        <S.Container>
            <S.HeaderContainer>
                <Avatar size={48} />
                <S.DoctorInfoWrapper>
                    <Text color="black" fontWeight="700">
                        Dr. Joseph Brostito
                    </Text>
                    <Text color="description" fontSize="sm" fontWeight="400">
                        Dentista
                    </Text>
                </S.DoctorInfoWrapper>
            </S.HeaderContainer>
            <S.Divider />
            <S.SchedulesWrapper>
                <S.ScheduleContainer>
                    <Calendar2 color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        Domingo, 12 Julho
                    </Text>
                </S.ScheduleContainer>
                <S.ScheduleContainer>
                    <Clock color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        11:00 - 12:00
                    </Text>
                </S.ScheduleContainer>
            </S.SchedulesWrapper>
        </S.Container>
    )
}

export default NextAppointments
