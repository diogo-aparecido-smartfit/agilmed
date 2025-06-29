import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import * as S from './styles'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native'
import { TouchableOpacity, View } from 'react-native'
import Text from '../Text/Text'
import { Theme } from '@/config/theme'
import { useTheme } from '@/hooks/useTheme'

interface IData {
    label: string
    value: any
}

interface DropdownProps {
    label?: string
    data: IData[]
    placeholder?: string
    error?: string
    onSelect: (
        selectedItem: { label: string; value: any },
        index: number
    ) => void
}

const TextDropdown = ({
    label,
    data,
    placeholder = 'Select an option',
    error,
    onSelect,
}: DropdownProps) => {
    const { colors } = useTheme()

    return (
        <S.DropdownContainer>
            {label && <Text fontWeight="600">{label}</Text>}
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) =>
                    onSelect(selectedItem, index)
                }
                renderButton={(selectedItem, isOpened) => (
                    <TouchableOpacity>
                        <S.DropdownButton>
                            {selectedItem ? (
                                <Text color={'title'}>
                                    {selectedItem.label}
                                </Text>
                            ) : (
                                <Text ellipsizeMode="tail" color="inputColor">
                                    {placeholder}
                                </Text>
                            )}
                            {isOpened ? (
                                <ArrowUp2
                                    size={16}
                                    color={Theme.colors.inputColor}
                                />
                            ) : (
                                <ArrowDown2
                                    size={16}
                                    color={Theme.colors.inputColor}
                                />
                            )}
                        </S.DropdownButton>
                    </TouchableOpacity>
                )}
                renderItem={(item, index) => (
                    <View style={{ backgroundColor: colors.background }}>
                        <S.DropdownItem>
                            <S.DropdownItemText>
                                {item.label}
                            </S.DropdownItemText>
                        </S.DropdownItem>
                    </View>
                )}
                dropdownStyle={{
                    borderRadius: 16,
                    overflow: 'hidden',
                }}
            />
            {error && <S.ErrorText>{error}</S.ErrorText>}
        </S.DropdownContainer>
    )
}

export default TextDropdown
