import { router } from 'expo-router'
import { useRef, useState, useEffect } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import Lottie from 'lottie-react-native'
import {
    Calendar,
    Receipt21,
    InfoCircle,
    TicketStar,
    Icon,
} from 'iconsax-react-native'

export type Feature = {
    id: string
    icon: Icon
    title: string
    description: string
}

export const features: Feature[] = [
    {
        id: '1',
        icon: Calendar,
        title: 'Agendamento',
        description: 'Agende consultas com médicos disponíveis',
    },
    {
        id: '2',
        icon: Receipt21,
        title: 'Informações',
        description: 'Tire dúvidas sobre exames e procedimentos',
    },
    {
        id: '3',
        icon: InfoCircle,
        title: 'Suporte',
        description: 'Obtenha ajuda com qualquer funcionalidade',
    },
    {
        id: '4',
        icon: TicketStar,
        title: 'Recomendações',
        description: 'Receba sugestões personalizadas',
    },
]

export const useChatlistController = () => {
    const { width: screenWidth } = Dimensions.get('window')
    const CARD_WIDTH = screenWidth - 80

    const animationRef = useRef<Lottie>(null)
    const scrollViewRef = useRef<ScrollView>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.reset()
            animationRef.current.play()
        }
    }, [])

    useEffect(() => {
        const carouselInterval = setInterval(() => {
            if (scrollViewRef.current) {
                const nextIndex = (activeIndex + 1) % features.length
                const xOffset = nextIndex * (CARD_WIDTH + 16)

                scrollViewRef.current.scrollTo({
                    x: xOffset,
                    animated: true,
                })

                setActiveIndex(nextIndex)
            }
        }, 3000)

        return () => clearInterval(carouselInterval)
    }, [activeIndex, CARD_WIDTH])

    const handleScroll = (event: {
        nativeEvent: { contentOffset: { x: number } }
    }) => {
        const offsetX = event.nativeEvent.contentOffset.x
        const index = Math.round(offsetX / (CARD_WIDTH + 16))

        if (index !== activeIndex && index >= 0 && index < features.length) {
            setActiveIndex(index)
        }
    }

    const handleStartConversation = () => {
        router.push('/(home)/(chat)/chat')
    }

    return {
        handleStartConversation,
        animationRef,
        scrollViewRef,
        activeIndex,
        handleScroll,
        CARD_WIDTH,
        features,
    }
}
