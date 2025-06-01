import React from 'react'
import { ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import { Theme } from '@/config/theme'
import * as S from './doctors-list.style'
import { DoctorCard } from '@/components/DoctorCard/doctor-card'
import { EmptyList } from '@/components/EmptyList/empty-list'
import { SpecialtyFilter } from '@/components/SpecialtyFilter/specialty-filter'
import { IDoctor } from '@/types/types'
import { SearchBar } from '@/components/SearchBar/search-bar'
import { useDoctorsListController } from './doctors-list.controller'
import { ArrowLeft } from 'iconsax-react-native'
import Text from '@/components/Text/Text'
import { useTheme } from '@/hooks/useTheme'

export default function DoctorsListPage() {
    const { colors } = useTheme()
    const {
        filteredDoctors,
        specialties,
        isLoading,
        searchQuery,
        selectedSpecialty,
        setSearchQuery,
        setSelectedSpecialty,
        handleRefresh,
        handleBackPress,
    } = useDoctorsListController()

    const renderItem = ({ item }: { item: IDoctor }) => (
        <DoctorCard doctor={item} />
    )

    return (
        <S.Container>
            <S.Header>
                <S.HeaderTop>
                    <S.BackButton onPress={handleBackPress}>
                        <ArrowLeft size="24" color={colors.title} />
                    </S.BackButton>
                    <Text fontSize="xl" fontWeight="700">
                        Médicos
                    </Text>
                </S.HeaderTop>

                <SearchBar
                    placeholder="Buscar médicos..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </S.Header>

            <SpecialtyFilter
                specialties={specialties}
                selectedSpecialty={selectedSpecialty}
                onSelectSpecialty={setSelectedSpecialty}
            />

            {isLoading ? (
                <S.LoadingContainer>
                    <ActivityIndicator size="large" color={colors.mainColor} />
                </S.LoadingContainer>
            ) : (
                <S.ListWrapper>
                    <FlatList
                        data={filteredDoctors}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            padding: 16,
                            paddingBottom: 80,
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={handleRefresh}
                                tintColor={colors.title}
                            />
                        }
                        ListEmptyComponent={<EmptyList />}
                    />
                </S.ListWrapper>
            )}
        </S.Container>
    )
}
