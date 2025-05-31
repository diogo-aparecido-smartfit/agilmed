import React from 'react'
import * as S from './empty-list.style'
import Text from '@/components/Text/Text'
import { Profile2User } from 'iconsax-react-native'
import { Theme } from '@/config/theme'

export function EmptyList() {
    return (
        <S.Container>
            <Profile2User
                size={64}
                color={Theme.colors.lightDescription}
                variant="Bulk"
            />
            <Text
                fontSize="lg"
                fontWeight="600"
                color="description"
                textAlign="center"
                style={{ marginTop: 16 }}
            >
                Nenhum médico encontrado
            </Text>
            <Text
                fontSize="sm"
                color="lightDescription"
                textAlign="center"
                style={{ marginTop: 8 }}
            >
                Tente remover os filtros ou tente novamente mais tarde
            </Text>
        </S.Container>
    )
}
