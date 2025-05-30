import { View } from 'react-native'
import Text from '@/components/Text/Text'
import NearPlace from '../NearPlace/NearPlace'
import * as S from './NearbyMedicalCentersSection.style'

interface NearbyMedicalCentersSectionProps {
    units: any[]
    loading: boolean
}

export default function NearbyMedicalCentersSection({
    units,
    loading,
}: NearbyMedicalCentersSectionProps) {
    return (
        <S.Container>
            <View>
                <Text fontWeight="600">
                    {loading
                        ? 'Carregando unidades médicas próximas de você 📍'
                        : 'Unidades médicas próximas de você 📍'}
                </Text>
                <Text fontSize="sm" color="description">
                    Clique na unidade desejada para mais detalhes
                </Text>
            </View>

            {units.map((unit) => (
                <NearPlace
                    id={unit.id}
                    key={unit.id}
                    name={unit.name}
                    type={unit.category || ''}
                    distance={`${((unit?.dist || 0) / 1000).toFixed(1)} km`}
                    openAt="08:00"
                    rating="4,5 (200 reviews)"
                />
            ))}
        </S.Container>
    )
}
