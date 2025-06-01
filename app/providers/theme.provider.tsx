import { ThemeTransition } from '@/components/ThemeTransition/theme-transition'
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

    const [isTransitioning, setIsTransitioning] = useState(false)
    const [lastThemeMode, setLastThemeMode] = useState(darkMode)

    useEffect(() => {
        if (darkMode !== lastThemeMode) {
            setIsTransitioning(true)
            setLastThemeMode(darkMode)
        }
    }, [darkMode])

    const handleTransitionComplete = () => {
        setThemeData({
            ...ThemeBase,
            colors: darkMode ? darkPalette : lightPalette,
        })
        setTimeout(() => {
            setIsTransitioning(false)
        }, 3000)
    }

    return (
        <ThemeProvider theme={themeData}>
            {children}

            {isTransitioning && (
                <ThemeTransition
                    onTransitionComplete={handleTransitionComplete}
                />
            )}
        </ThemeProvider>
    )
}
