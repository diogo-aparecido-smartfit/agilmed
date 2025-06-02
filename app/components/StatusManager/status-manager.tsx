import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View } from 'react-native'
import { Theme } from '@/config/theme'

export default function StatusBarManager() {
    const { darkMode } = useSelector((state: RootState) => state.settings)

    return (
        <View
            style={{
                backgroundColor: darkMode
                    ? Theme.colors.black
                    : Theme.colors.white,
                height: 0,
            }}
        ></View>
    )
}
