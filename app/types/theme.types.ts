import '@emotion/react'
import { lightPalette, darkPalette } from '@/config/theme'

type ThemeColors = typeof lightPalette

declare module '@emotion/react' {
    export interface Theme {
        colors: ThemeColors
        fonts: {
            thin: string
            thinItalic: string
            extraLight: string
            extraLightItalic: string
            light: string
            lightItalic: string
            regular: string
            regularItalic: string
            medium: string
            mediumItalic: string
            semiBold: string
            semiBoldItalic: string
            bold: string
            boldItalic: string
            extraBold: string
            extraBoldItalic: string
            black: string
            blackItalic: string
        }
        sizes: {
            xs: string
            sm: string
            base: string
            lg: string
            xl: string
            '2xl': string
            '3xl': string
            '4xl': string
            '5xl': string
            '6xl': string
        }
    }
}
