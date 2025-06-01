import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTheme } from '@emotion/react'
import Text from '@/components/Text/Text'
import { TickSquare } from 'iconsax-react-native'

interface CheckboxProps {
    value: boolean
    onValueChange: (value: boolean) => void
    label?: string
    disabled?: boolean
}

export function Checkbox({
    value,
    onValueChange,
    label,
    disabled = false,
}: CheckboxProps) {
    const theme = useTheme()

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onValueChange(!value)}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <View style={styles.checkboxContainer}>
                {value ? (
                    <TickSquare
                        size={20}
                        color={theme.colors.mainColor}
                        variant="Bold"
                    />
                ) : (
                    <View
                        style={[
                            styles.checkbox,
                            { borderColor: theme.colors.description },
                        ]}
                    />
                )}
            </View>
            {label && (
                <Text
                    fontSize="sm"
                    color={disabled ? 'inputColor' : 'title'}
                    style={styles.label}
                >
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkboxContainer: {
        marginRight: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
    },
    label: {
        flex: 1,
    },
})
