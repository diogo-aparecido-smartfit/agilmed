import Text from '@/components/Text/Text'
import * as S from '@/screens/appointment/appointmentDetails/appointment-details.style'
import Header from './Components/Header/Header'
import { Calendar1, Clock, Note, Star1 } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { Marker } from 'react-native-maps'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { UsePlaceDetailsController } from './place-details.controller'
import { ICategoryType } from '@/types/types'
import { categoryMap } from '@/utils/constants'

export default function PlaceDetailsPage() {
    const {
        handleOpenOnMaps,
        mapRef,
        region,
        bottomSheetRef,
        snapPoints,
        currentPlace,
    } = UsePlaceDetailsController()

    return (
        <S.Container
            source={{
                uri: 'https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                                    - {currentPlace?.phone}
                                </Text>
                            </S.InformationContainer>
                        </S.Header>
                        <S.DividerContainer>
                            <S.Divider />
                            <Note size={12} color={Theme.colors.inputColor} />
                            <S.Divider />
                        </S.DividerContainer>
                        <S.Content>
                            <S.AddressContainer>
                                <Text fontWeight="500" fontSize="lg">
                                    Endereço da{' '}
                                    {
                                        categoryMap[
                                            currentPlace?.category as ICategoryType
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
                                        title="Clínica Apollo"
                                        coordinate={region}
                                    />
                                </S.CustomMap>
                            </S.AddressContainer>
                        </S.Content>
                    </S.ContentContainer>
                </BottomSheetView>
            </BottomSheet>
        </S.Container>
    )
}
