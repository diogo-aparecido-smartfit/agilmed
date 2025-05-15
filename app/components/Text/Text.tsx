import React from 'react'
import styled from '@emotion/native'
import { TextProps as RNTextProps } from 'react-native'
import { Theme } from '@/config/theme'

const fontWeightMap = {
    '100': 'thin',
    '200': 'extraLight',
    '300': 'light',
    '400': 'regular',
    '500': 'medium',
    '600': 'semiBold',
    '700': 'bold',
    '800': 'extraBold',
    '900': 'black',
} as const

type FontWeight = keyof typeof fontWeightMap

interface TextProps extends RNTextProps {
    color?: keyof typeof Theme.colors
    fontSize?: keyof typeof Theme.sizes
    fontWeight?: FontWeight
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    letterSpacing?: string
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
    textDecoration?: 'dashed' | 'dotted' | 'underline' | 'overline'
    italic?: boolean
}

const StyledText = styled.Text<TextProps>`
    color: ${({ color }) => (color ? Theme.colors[color] : Theme.colors.title)};
    font-size: ${({ fontSize }) =>
        fontSize ? Theme.sizes[fontSize] : Theme.sizes.base};
    text-align: ${({ textAlign }) => textAlign || 'left'};
    letter-spacing: ${({ letterSpacing }) => letterSpacing || '0px'};
    text-decoration-line: ${({ textDecoration }) => textDecoration || 'none'};
    text-transform: ${({ textTransform }) => textTransform || 'none'};
    font-family: ${({ fontWeight, italic }) =>
        fontWeight
            ? Theme.fonts[
                  italic
                      ? (`${fontWeightMap[fontWeight]}Italic` as keyof typeof Theme.fonts)
                      : fontWeightMap[fontWeight]
              ]
            : Theme.fonts.regular};
`

const Text: React.FC<TextProps> = ({
    children,
    color,
    fontSize,
    fontWeight,
    textAlign,
    letterSpacing,
    textTransform,
    italic,
    ...rest
}) => {
    return (
        <StyledText
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textAlign={textAlign}
            letterSpacing={letterSpacing}
            textTransform={textTransform}
            italic={italic}
            {...rest}
        >
            {children}
        </StyledText>
    )
}

export default Text
