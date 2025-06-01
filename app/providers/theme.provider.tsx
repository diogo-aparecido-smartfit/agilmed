import { ThemeBase, darkPalette, lightPalette } from '@/config/theme'
import { RootState } from '@/store'
import { ThemeProvider } from '@emotion/react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
    const { darkMode } = useSelector((state: RootState) => state.settings)
    const [themeData, setThemeData] = useState({
        ...ThemeBase,
        colors: darkMode ? darkPalette : lightPalette,
    })

    useEffect(() => {
        setThemeData({
            ...ThemeBase,
            colors: darkMode ? darkPalette : lightPalette,
        })
    }, [darkMode])

    return <ThemeProvider theme={themeData}>{children}</ThemeProvider>
}
