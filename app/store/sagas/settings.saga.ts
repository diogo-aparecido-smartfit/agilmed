import { takeLatest, put, call, Effect } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setDarkMode, setNotifications } from '../slices/settings.slice'

function* saveDarkModeSetting(
    action: ReturnType<typeof setDarkMode>
): Generator<Effect> {
    try {
        yield call(
            [AsyncStorage, 'setItem'],
            '@agilmed:darkMode',
            JSON.stringify(action.payload)
        )
    } catch (error) {
        console.error('Failed to save dark mode setting', error)
    }
}

function* saveNotificationsSetting(
    action: ReturnType<typeof setNotifications>
) {
    try {
        yield call(
            [AsyncStorage, 'setItem'],
            '@agilmed:notifications',
            JSON.stringify(action.payload)
        )
    } catch (error) {
        console.error('Failed to save notifications setting', error)
    }
}

function* loadSettings(): Generator<Effect> {
    try {
        const darkMode = yield call(
            [AsyncStorage, 'getItem'],
            '@agilmed:darkMode'
        )
        const notifications = yield call(
            [AsyncStorage, 'getItem'],
            '@agilmed:notifications'
        )

        if (darkMode !== null) {
            yield put(setDarkMode(JSON.parse(darkMode)))
        }

        if (notifications !== null) {
            yield put(setNotifications(JSON.parse(notifications)))
        }
    } catch (error) {
        console.error('Failed to load settings', error)
    }
}

export function* settingsSaga() {
    yield takeLatest(setDarkMode.type, saveDarkModeSetting)
    yield takeLatest(setNotifications.type, saveNotificationsSetting)
    yield call(loadSettings)
}
