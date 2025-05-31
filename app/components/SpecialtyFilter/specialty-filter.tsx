import React from 'react'
import * as S from './specialty-filter.style'
import Text from '@/components/Text/Text'

interface SpecialtyFilterProps {
    specialties: string[]
    selectedSpecialty: string | null
    onSelectSpecialty: (specialty: string | null) => void
}

export function SpecialtyFilter({
    specialties,
    selectedSpecialty,
    onSelectSpecialty,
}: SpecialtyFilterProps) {
    return (
        <S.Container>
            <S.ScrollViewContainer
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    gap: 8,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <S.FilterItem
                    active={selectedSpecialty === null}
                    onPress={() => onSelectSpecialty(null)}
                >
                    <Text
                        fontSize="sm"
                        fontWeight={selectedSpecialty === null ? '600' : '400'}
                        color={
                            selectedSpecialty === null
                                ? 'mainColor'
                                : 'description'
                        }
                    >
                        Todos
                    </Text>
                </S.FilterItem>
                {specialties.map((specialty) => (
                    <S.FilterItem
                        key={specialty}
                        active={selectedSpecialty === specialty}
                        onPress={() => onSelectSpecialty(specialty)}
                    >
                        <Text
                            fontSize="sm"
                            fontWeight={
                                selectedSpecialty === specialty ? '600' : '400'
                            }
                            color={
                                selectedSpecialty === specialty
                                    ? 'mainColor'
                                    : 'description'
                            }
                        >
                            {specialty}
                        </Text>
                    </S.FilterItem>
                ))}
            </S.ScrollViewContainer>
        </S.Container>
    )
}
