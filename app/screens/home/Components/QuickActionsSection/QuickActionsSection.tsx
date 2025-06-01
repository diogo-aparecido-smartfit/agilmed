import { useCallback } from 'react'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import FastAction from '../FastAction/FastAction'
import { QUICK_ACTIONS } from './constants'
import * as S from './QuickActionsSection.style'
import { showSosModal } from '@/store/slices/modal.slice'

export default function QuickActionsSection() {
    const dispatch = useDispatch()

    const handleActionPress = useCallback(
        (action: string) => {
            switch (action) {
                case 'sos':
                    console.log('SOS button pressed')
                    dispatch(showSosModal())
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
        },
        [dispatch]
    )

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
