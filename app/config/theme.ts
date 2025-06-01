import store from '@/store'

export const lightPalette = {
    title: '#000',
    description: '#8696BB',
    lightDescription: '#CBE1FF',
    lightGray: '#687076',
    inputBackground: '#FAFAFC',
    borderColor: '#F4F4F6',
    inputColor: '#B2BCC9',
    error: '#ef4444',
    background: '#fff',
    success: '#50C878',
    mainColor: '#4894FE',
    fillColor: '#63B4FF10',
    icon: '#687076',
    tabIconDefault: '#687076',
    white: '#fff',
    black: '#000',
    yellow: '#FEB052',
    warning: '#F9A825',
    danger: '#ef4444',
}

export const darkPalette = {
    title: '#ECEDEE',
    description: '#9BA1A6',
    lightDescription: '#4A5056',
    lightGray: '#9BA1A6',
    inputBackground: '#1E2022',
    borderColor: '#2C2F33',
    inputColor: '#687076',
    error: '#f87171',
    background: '#151718',
    success: '#4ADE80',
    mainColor: '#4894FE',
    fillColor: 'rgba(72, 148, 254, 0.15)',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    white: '#ECEDEE',
    black: '#151718',
    yellow: '#FEB052',
    warning: '#FBBF24',
    danger: '#f87171',
}

export const ThemeBase = {
    light: {
        colors: lightPalette,
    },
    dark: {
        colors: darkPalette,
    },
    fonts: {
        thin: 'Poppins_100Thin',
        thinItalic: 'Poppins_100Thin_Italic',
        extraLight: 'Poppins_200ExtraLight',
        extraLightItalic: 'Poppins_200ExtraLight_Italic',
        light: 'Poppins_300Light',
        lightItalic: 'Poppins_300Light_Italic',
        regular: 'Poppins_400Regular',
        regularItalic: 'Poppins_400Regular_Italic',
        medium: 'Poppins_500Medium',
        mediumItalic: 'Poppins_500Medium_Italic',
        semiBold: 'Poppins_600SemiBold',
        semiBoldItalic: 'Poppins_600SemiBold_Italic',
        bold: 'Poppins_700Bold',
        boldItalic: 'Poppins_700Bold_Italic',
        extraBold: 'Poppins_800ExtraBold',
        extraBoldItalic: 'Poppins_800ExtraBold_Italic',
        black: 'Poppins_900Black',
        blackItalic: 'Poppins_900Black_Italic',
    },
    sizes: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
    },
} as const

type ColorPalette = typeof lightPalette
type ColorKeys = keyof ColorPalette

type ThemeColors = {
    [key in ColorKeys]: string
}

export const Theme = {
    ...ThemeBase,

    colors: new Proxy({} as ThemeColors, {
        get: (_, prop: string) => {
            const state = store.getState()
            const isDarkMode = state?.settings?.darkMode || false

            if (isDarkMode) {
                return darkPalette[prop as ColorKeys]
            } else {
                return lightPalette[prop as ColorKeys]
            }
        },
    }),
}

export type ThemeType = typeof Theme
