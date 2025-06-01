import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import userReducer from './slices/user.slice'
import chatReducer from './slices/chat.slice'
import placesReducer from './slices/places.slice'
import onboardingReducer from './slices/onboarding.slice'
import settingsReducer from './slices/settings.slice'
import modalReducer from './slices/modal.slice'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    places: placesReducer,
    onboarding: onboardingReducer,
    settings: settingsReducer,
    modal: modalReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
