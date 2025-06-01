import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Theme } from '@/config/theme'
import { useColorScheme } from 'react-native'

export const useTheme = () => {
    const { darkMode: userPreference } = useSelector(
        (state: RootState) => state.settings
    )
    const systemPreference = useColorScheme()

    const themeMode =
        userPreference !== null
            ? userPreference
            : systemPreference === 'dark'
            ? true
            : false

    return {
        colors: themeMode ? Theme.dark.colors : Theme.light.colors,
        fonts: Theme.fonts,
        sizes: Theme.sizes,
        isDark: themeMode,
    }
}
