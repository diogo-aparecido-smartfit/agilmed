import { Platform, RefreshControl } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Portal } from '@gorhom/portal'
import { useHomeController } from './home.controller'

import Header from './Components/Header/Header'
import UpcomingAppointmentsSection from './Components/UpcomingAppointmentsSection/UpcomingAppointmentsSection'
import QuickActionsSection from './Components/QuickActionsSection/QuickActionsSection'
import NearbyMedicalCentersSection from './Components/NearbyMedicalCentersSection/NearbyMedicalCentersSection'
import VerificationCodeModal from './Components/VerificationCodeModal/VerificationCodeModal'

import * as S from './home.style'

export default function HomePage() {
    const {
        units,
        loading: loadingUnits,
        appointments,
        loadingAppointments,
        refetch,
        bottomSheetRef,
        handleOpenVerifyCode,
        user,
    } = useHomeController()

    return (
        <GestureHandlerRootView>
            <Portal>
                <VerificationCodeModal
                    bottomSheetRef={bottomSheetRef}
                    isVerified={user?.isVerified}
                />
            </Portal>

            <S.Container>
                <S.ContentContainer
                    refreshControl={
                        <RefreshControl
                            refreshing={loadingAppointments || loadingUnits}
                            onRefresh={refetch}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 24,
                        flexDirection: 'column',
                        paddingBottom: 40,
                        overflow: 'visible',
                        paddingTop: Platform.OS === 'android' ? 50 : 40,
                    }}
                >
                    <S.ContentSection>
                        <Header
                            user={user}
                            showVerificationAlert={!user?.isVerified}
                            onOpenVerifyCode={handleOpenVerifyCode}
                        />
                    </S.ContentSection>

                    <UpcomingAppointmentsSection
                        appointments={appointments}
                        loading={loadingAppointments}
                    />

                    <S.ContentSection>
                        <QuickActionsSection />
                    </S.ContentSection>

                    <S.ContentSection>
                        <NearbyMedicalCentersSection
                            units={units}
                            loading={loadingUnits}
                        />
                    </S.ContentSection>
                </S.ContentContainer>
            </S.Container>
        </GestureHandlerRootView>
    )
}
