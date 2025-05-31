import Avatar from '@/components/Avatar/Avatar'
import * as S from './style'
import { Calendar, Clock, ArrowRight } from 'iconsax-react-native'
import { useCallback } from 'react'
import { router } from 'expo-router'
import Text from '@/components/Text/Text'
import { Theme } from '@/config/theme'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface NextAppointmentProps {
    id: number
    doctorName: string
    doctorImagePicture: string
    doctorType: string
    date: string
    startAt: string
    endAt: string
}

const NextAppointment = ({
    id,
    date,
    doctorName,
    doctorType,
    endAt,
    startAt,
    doctorImagePicture,
}: NextAppointmentProps) => {
    const handleNavigateToAppointment = useCallback(() => {
        router.push(`/(appointment)/details/${id}`)
    }, [id])

    const formattedDate = () => {
        try {
            return format(new Date(date), "EEEE, dd 'de' MMMM", {
                locale: ptBR,
            })
        } catch (error) {
            return date
        }
    }

    return (
        <S.Container onPress={handleNavigateToAppointment}>
            <S.CardHeader>
                <Text fontSize="lg" fontWeight="700" color="white">
                    Próxima Consulta
                </Text>
                <S.StatusIndicator />
            </S.CardHeader>

            <S.PrimaryContentWrapper>
                <S.AvatarContainer>
                    <Avatar uri={doctorImagePicture} size={60} />
                </S.AvatarContainer>
                <S.DoctorInfoWrapper>
                    <Text fontSize="lg" fontWeight="700" color="white">
                        {doctorName}
                    </Text>
                    <Text fontSize="sm" color="lightDescription">
                        {doctorType}
                    </Text>
                </S.DoctorInfoWrapper>
            </S.PrimaryContentWrapper>

            <S.Divider />

            <S.SecondaryContentWrapper>
                <S.InfoColumn>
                    <S.AppointmentInfoWrapper>
                        <Calendar
                            size={16}
                            color={Theme.colors.lightDescription}
                            variant="Bold"
                        />
                        <Text fontSize="sm" color="white">
                            {formattedDate()}
                        </Text>
                    </S.AppointmentInfoWrapper>

                    <S.AppointmentInfoWrapper>
                        <Clock
                            size={16}
                            color={Theme.colors.lightDescription}
                            variant="Bold"
                        />
                        <Text fontSize="sm" color="white">
                            {startAt} - {endAt}
                        </Text>
                    </S.AppointmentInfoWrapper>
                </S.InfoColumn>

                <S.ViewDetailsButton>
                    <Text fontSize="xs" fontWeight="600" color="white">
                        Ver detalhes
                    </Text>
                    <ArrowRight
                        size={16}
                        color={Theme.colors.white}
                        variant="Bold"
                    />
                </S.ViewDetailsButton>
            </S.SecondaryContentWrapper>
        </S.Container>
    )
}

export default NextAppointment
