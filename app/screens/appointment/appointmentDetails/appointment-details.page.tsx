/** @jsxImportSource @emotion/react */
import Text from '@/components/Text/Text'
import * as S from '@/screens/appointment/appointmentDetails/appointment-details.style'
import Header from './Components/Header/Header'
import { Calendar1, Clock, Note, Star1 } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { ImageBackground, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { UseAppointmentDetailsController } from './appointment-details.controller'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export default function AppointmentDetailsPage() {
    const { handleOpenOnMaps, mapRef, region, bottomSheetRef, snapPoints } =
        UseAppointmentDetailsController()

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' },
        })
    }, [navigation])

    return (
        <View css={S.containerStyle}>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                css={S.imageBackgroundStyle}
            >
                <Header />
            </ImageBackground>
            <BottomSheet
                backgroundStyle={{ borderRadius: 32 }}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
            >
                <BottomSheetView>
                    <View css={S.contentContainerStyle}>
                        <View css={S.headerStyle}>
                            <View css={S.informationContainerStyle}>
                                <Text fontWeight="700" fontSize="xl">
                                    Dr. Joseph Brostito
                                </Text>
                                <Text fontWeight="400" color="description">
                                    Dentista | Clínica Apollo
                                </Text>
                            </View>
                            <View css={S.reviewsContainerStyle}>
                                <Text>4.8</Text>
                                <Star1
                                    variant="Bold"
                                    color={Theme.colors.yellow}
                                />
                            </View>
                        </View>
                        <View css={S.dividerContainerStyle}>
                            <View css={S.dividerStyle} />
                            <Note size={12} color={Theme.colors.inputColor} />
                            <View css={S.dividerStyle} />
                        </View>
                        <View css={S.contentStyle}>
                            <Text fontWeight="500" fontSize="lg">
                                Detalhes do agendamento
                            </Text>
                            <View css={S.reviewsContainerStyle}>
                                <Calendar1
                                    size={16}
                                    color={Theme.colors.description}
                                />
                                <Text color="description">
                                    Quarta-Feira, 14 de Outubro
                                </Text>
                            </View>
                            <View css={S.reviewsContainerStyle}>
                                <Clock
                                    size={16}
                                    color={Theme.colors.description}
                                />
                                <Text color="description">14:00</Text>
                            </View>
                            <View css={S.addressContainerStyle}>
                                <Text fontWeight="500" fontSize="lg">
                                    Endereço da Clínica
                                </Text>
                                <Text color="description">
                                    Av. Afonso Pena, 1177 - Centro, Uberlândia -
                                    MG, 38400-706
                                </Text>
                                <MapView
                                    css={S.customMapStyle}
                                    onPress={handleOpenOnMaps}
                                    ref={mapRef}
                                    initialRegion={region}
                                >
                                    <Marker
                                        title="Clínica Apollo"
                                        coordinate={region}
                                    />
                                </MapView>
                            </View>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}
