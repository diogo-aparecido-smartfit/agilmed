import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Pharmacy {
    id: string
    name: string
    phone?: string
    address: string
    position: {
        lat: number
        lon: number
    }
    dist?: number
    category?: string
}

interface PharmacyState {
    loading: boolean
    error: string | null
    list: Pharmacy[]
}

const initialState: PharmacyState = {
    loading: false,
    error: null,
    list: [],
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        fetchPharmaciesRequest(
            state,
            _action: PayloadAction<{ lat: number; lon: number }>
        ) {
            state.loading = true
            state.error = null
        },
        fetchPharmaciesSuccess(state, action: PayloadAction<Pharmacy[]>) {
            state.loading = false
            state.list = action.payload
        },
        fetchPharmaciesFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchPharmaciesRequest,
    fetchPharmaciesSuccess,
    fetchPharmaciesFailure,
} = placesSlice.actions

export default placesSlice.reducer
