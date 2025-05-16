import * as S from '@/screens/places/placesList/places-list.style'
import { useCallback } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import { router } from 'expo-router'
import { Calendar1, Hospital, Link2, Sun } from 'iconsax-react-native'
import Text from '@/components/Text/Text'
import { getFirstAndLastName } from '@/utils/utils'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { Platform, View } from 'react-native'
import { Theme } from '@/config/theme'
import NearPlace from './Components/NearPlace/NearPlace'
import { usePlacesListController } from './places-list.controller'

export default function PlacesListPage() {
    const { units, loading, error } = usePlacesListController()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleNavigateToProfile = useCallback(() => {
        router.navigate('/(home)/(settings)/settings')
    }, [])

    return (
        <S.Container>
            <S.ContentContainer
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 24,
                    flexDirection: 'column',
                    paddingBottom: 40,
                    paddingHorizontal: 24,
                }}
            >
                <S.NearDoctorsContainer>
                    <View>
                        <Text fontSize="2xl" fontWeight="600">
                            Unidades médicas próximas de você 📍
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
                            distance={`${((unit?.dist || 0) / 1000).toFixed(
                                1
                            )} km`}
                            openAt="08:00"
                            rating="4,5 (200 reviews)"
                        />
                    ))}
                </S.NearDoctorsContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
