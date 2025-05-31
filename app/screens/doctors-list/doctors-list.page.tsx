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

export default function DoctorsListPage() {
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
                        <ArrowLeft size="24" color={Theme.colors.black} />
                    </S.BackButton>
                    <S.HeaderTitle>Médicos</S.HeaderTitle>
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
                    <ActivityIndicator
                        size="large"
                        color={Theme.colors.mainColor}
                    />
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
                                colors={[Theme.colors.mainColor]}
                            />
                        }
                        ListEmptyComponent={<EmptyList />}
                    />
                </S.ListWrapper>
            )}
        </S.Container>
    )
}
