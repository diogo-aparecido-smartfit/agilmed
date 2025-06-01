import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalsState {
    sosModalVisible: boolean
}

const initialState: ModalsState = {
    sosModalVisible: false,
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        showSosModal: (state) => {
            state.sosModalVisible = true
        },
        hideSosModal: (state) => {
            state.sosModalVisible = false
        },
        toggleSosModal: (state) => {
            state.sosModalVisible = !state.sosModalVisible
        },
    },
})

export const { showSosModal, hideSosModal, toggleSosModal } =
    modalsSlice.actions
export default modalsSlice.reducer
