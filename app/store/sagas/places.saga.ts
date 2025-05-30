import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { Get } from '@/services/api/api.methods'
import {
    fetchPharmaciesFailure,
    fetchPharmaciesRequest,
    fetchPharmaciesSuccess,
    Pharmacy,
} from '../slices/places.slice'

function* handleFetchPharmacies(
    action: PayloadAction<{ lat: number; lon: number }>
) {
    try {
        const { lat, lon } = action.payload

        const response: any[] = yield call(
            Get,
            `/medical-centers?lat=${lat}&lon=${lon}&query=&categorySet=7321,9376,9366,9367,9368,9369,9370,9371,9372,9373`
        )

        const data: Pharmacy[] = response.map((item) => ({
            id: item.id,
            name: item.poi.name,
            phone: item.poi.phone,
            address: item.address.freeformAddress,
            position: item.position,
            dist: item.dist,
            category: item.poi.categories?.[0] ?? 'unknown',
        }))

        yield put(fetchPharmaciesSuccess(data))
    } catch (error: any) {
        yield put(
            fetchPharmaciesFailure(error.message || 'Erro ao buscar farmácias')
        )
    }
}

export default function* placesSaga() {
    yield takeLatest(fetchPharmaciesRequest.type, handleFetchPharmacies)
}
