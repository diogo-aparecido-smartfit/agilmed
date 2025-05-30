import Text from '@/components/Text/Text'
import * as S from './place-details.style'
import Header from './Components/Header/Header'
import { Calendar, Call, Location, Note, Star1 } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { Marker } from 'react-native-maps'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { UsePlaceDetailsController } from './place-details.controller'
import { ICategoryType } from '@/types/types'
import { categoryMap } from '@/utils/constants'
import { useCallback, useMemo } from 'react'
import { Linking } from 'react-native'
import { router } from 'expo-router'

export default function PlaceDetailsPage() {
    const {
        handleOpenOnMaps,
        mapRef,
        region,
        bottomSheetRef,
        snapPoints,
        currentPlace,
    } = UsePlaceDetailsController()

    const isOpen = useMemo(() => {
        const now = new Date()
        const hour = now.getHours()
        const day = now.getDay()
        return day > 0 && day < 6 && hour >= 8 && hour < 18
    }, [])

    const getCategoryImage = useCallback((category: string) => {
        const images = {
            hospital:
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2940&auto=format&fit=crop',
            pharmacy:
                'https://images.unsplash.com/photo-1587854680352-936b22b91030?q=80&w=2940&auto=format&fit=crop',
            clinic: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2936&auto=format&fit=crop',
            default:
                'https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop',
        }

        if (!category) return images.default

        for (const key of Object.keys(images)) {
            if (category.includes(key))
                return images[key as keyof typeof images]
        }

        return images.default
    }, [])

    const categoryImageUrl = useMemo(
        () => getCategoryImage(currentPlace?.category || 'default'),
        [currentPlace, getCategoryImage]
    )

    return (
        <S.Container
            source={{
                uri: categoryImageUrl,
            }}
            imageStyle={{
                width: 'auto',
                height: '45%',
            }}
        >
            <Header />
            <BottomSheet
                backgroundStyle={{ borderRadius: 32 }}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
            >
                <BottomSheetView>
                    <S.ContentContainer>
                        <S.Header>
                            <S.InformationContainer>
                                <Text fontWeight="700" fontSize="xl">
                                    {currentPlace?.name}
                                </Text>
                                <Text fontWeight="400" color="description">
                                    {
                                        categoryMap[
                                            currentPlace?.category as ICategoryType
                                        ]
                                    }{' '}
                                    -{' '}
                                    {currentPlace?.phone ||
                                        'Telefone não disponível'}
                                </Text>
                                <S.StatusContainer>
                                    <S.StatusDot isOpen={isOpen} />
                                    <Text color={isOpen ? 'success' : 'error'}>
                                        {isOpen ? 'Aberto agora' : 'Fechado'}
                                    </Text>
                                </S.StatusContainer>
                            </S.InformationContainer>
                            <S.ReviewsContainer>
                                <Text>4.8</Text>
                                <Star1
                                    variant="Bold"
                                    size={24}
                                    color={Theme.colors.yellow}
                                />
                            </S.ReviewsContainer>
                        </S.Header>

                        <S.DividerContainer>
                            <S.Divider />
                            <Note size={12} color={Theme.colors.inputColor} />
                            <S.Divider />
                        </S.DividerContainer>

                        <S.ActionsContainer>
                            <S.ActionButton
                                onPress={() =>
                                    Linking.openURL(
                                        `tel:${currentPlace?.phone}`
                                    )
                                }
                            >
                                <Call
                                    size={20}
                                    color={Theme.colors.mainColor}
                                />
                                <Text color="mainColor">Ligar</Text>
                            </S.ActionButton>

                            <S.ActionButton onPress={handleOpenOnMaps}>
                                <Location
                                    size={20}
                                    color={Theme.colors.mainColor}
                                />
                                <Text color="mainColor">Rota</Text>
                            </S.ActionButton>
                        </S.ActionsContainer>

                        <S.Content>
                            <S.AddressContainer>
                                <Text fontWeight="500" fontSize="lg">
                                    Endereço da{' '}
                                    {
                                        categoryMap[
                                            (currentPlace?.category as ICategoryType) ||
                                                'pharmacy'
                                        ]
                                    }
                                </Text>
                                <Text color="description">
                                    {currentPlace?.address}
                                </Text>
                                <S.CustomMap
                                    onPress={handleOpenOnMaps}
                                    ref={mapRef}
                                    initialRegion={region}
                                >
                                    <Marker
                                        title={currentPlace?.name}
                                        coordinate={region}
                                    />
                                </S.CustomMap>
                            </S.AddressContainer>

                            <S.SectionContainer>
                                <Text fontWeight="500" fontSize="lg">
                                    Horário de Funcionamento
                                </Text>
                                <S.OpeningHoursContainer>
                                    <S.OpeningHoursItem>
                                        <Text fontWeight="500">
                                            Segunda - Sexta
                                        </Text>
                                        <Text color="description">
                                            08:00 - 18:00
                                        </Text>
                                    </S.OpeningHoursItem>
                                    <S.OpeningHoursItem>
                                        <Text fontWeight="500">Sábado</Text>
                                        <Text color="description">
                                            08:00 - 12:00
                                        </Text>
                                    </S.OpeningHoursItem>
                                    <S.OpeningHoursItem>
                                        <Text fontWeight="500">Domingo</Text>
                                        <Text color="description">Fechado</Text>
                                    </S.OpeningHoursItem>
                                </S.OpeningHoursContainer>
                            </S.SectionContainer>
                        </S.Content>
                    </S.ContentContainer>
                </BottomSheetView>
            </BottomSheet>
        </S.Container>
    )
}
