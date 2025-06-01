import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
    darkMode: boolean
    notifications: boolean
}

const initialState: SettingsState = {
    darkMode: false,
    notifications: true,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        },
        setNotifications: (state, action: PayloadAction<boolean>) => {
            state.notifications = action.payload
        },
    },
})

export const { setDarkMode, setNotifications } = settingsSlice.actions
export default settingsSlice.reducer
