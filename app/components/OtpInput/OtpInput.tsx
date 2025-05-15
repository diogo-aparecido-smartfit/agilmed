import React, { useCallback, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import * as S from './style'
import { Theme } from '@/config/theme'

interface OTPInputProps {
    length: number
    onCodeFilled: (code: string) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onCodeFilled }) => {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputs = useRef<(TextInput | null)[]>([])

    const handleChange = useCallback(
        (text: string, index: number) => {
            if (text.length > 1) return

            const newOtp = [...otp]
            newOtp[index] = text
            setOtp(newOtp)

            if (text && index < length - 1) {
                inputs.current[index + 1]?.focus()
            }

            if (newOtp.join('').length === length) {
                onCodeFilled(newOtp.join(''))
            }
        },
        [inputs, onCodeFilled, otp]
    )

    const handleBackspace = useCallback((text: string, index: number) => {
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }, [])

    return (
        <S.Container>
            {otp.map((_, index) => (
                <S.InputBox
                    key={index}
                    value={otp[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            handleBackspace(otp[index], index)
                        }
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    placeholderTextColor={Theme.colors.lightDescription}
                    placeholder="0"
                    ref={(input) => {
                        inputs.current[index] = input
                    }}
                    onFocus={(e) => {
                        e.target.setNativeProps({
                            style: { borderColor: Theme.colors.mainColor },
                        })
                    }}
                    onBlur={(e) => {
                        e.target.setNativeProps({
                            style: {
                                borderColor:
                                    !otp[index] &&
                                    Theme.colors.lightDescription,
                            },
                        })
                    }}
                />
            ))}
        </S.Container>
    )
}

export default OTPInput
