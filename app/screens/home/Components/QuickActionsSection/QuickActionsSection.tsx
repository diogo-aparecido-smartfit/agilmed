import { useCallback } from 'react'
import { router } from 'expo-router'
import { showMessage } from 'react-native-flash-message'
import { Calendar1, Hospital, Link2, Sun } from 'iconsax-react-native'
import FastAction from '../FastAction/FastAction'
import { QUICK_ACTIONS } from './constants'
import * as S from './QuickActionsSection.style'

export default function QuickActionsSection() {
    const handleActionPress = useCallback((action: string) => {
        switch (action) {
            case 'sos':
                showMessage({
                    message:
                        'Desculpe, mas esta ação ainda não foi implementada.',
                    type: 'warning',
                })
                break
            case 'appointments':
                router.push('/(home)/(appointments)/appointments')
                break
            case 'doctors':
                router.push('/(doctors)/doctors-list')
                break
            case 'places':
                router.push('/(places)/places-list')
                break
            default:
                break
        }
    }, [])

    return (
        <S.Container>
            {QUICK_ACTIONS.map((action) => (
                <FastAction
                    key={action.id}
                    onPress={() => handleActionPress(action.id)}
                    Icon={action.icon}
                    text={action.text}
                />
            ))}
        </S.Container>
    )
}
