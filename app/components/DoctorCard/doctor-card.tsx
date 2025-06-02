import React from 'react'
import { TouchableOpacity } from 'react-native'
import Avatar from '@/components/Avatar/Avatar'
import Text from '@/components/Text/Text'
import { useRouter } from 'expo-router'
import * as S from './doctor-card.style'
import { IDoctor } from '@/types/types'

interface DoctorCardProps {
    doctor: IDoctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    const router = useRouter()

    const handleNavigateToDoctor = () => {
        // router.push(`/doctors/${doctor.id}`)
        console.log('aqui')
    }

    return (
        <S.Container onPress={handleNavigateToDoctor}>
            <S.PrimaryContentWrapper>
                <Avatar uri={doctor.user.profile_picture_url || ''} />
                <S.DoctorInfoWrapper>
                    <Text fontWeight="700">{doctor.user.full_name}</Text>
                    <Text fontSize="sm">{doctor.specialty}</Text>
                </S.DoctorInfoWrapper>
            </S.PrimaryContentWrapper>
            <S.Divider />
            <S.SecondaryContentWrapper>
                <S.InfoItem>
                    <Text fontSize="sm" fontWeight="600">
                        CRM:
                    </Text>
                    <Text fontSize="sm" color="description">
                        {doctor.crm}
                    </Text>
                </S.InfoItem>
                <S.InfoItem>
                    <Text fontWeight="600" fontSize="sm">
                        Cidade:
                    </Text>
                    <Text fontSize="sm" color="description">
                        {doctor.city}/{doctor.state}
                    </Text>
                </S.InfoItem>
            </S.SecondaryContentWrapper>
        </S.Container>
    )
}
