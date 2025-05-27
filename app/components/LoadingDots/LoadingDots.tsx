import React, { useRef, useEffect } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Theme } from '@/config/theme'

interface LoadingDotsProps {
    size?: number
    color?: string
    dots?: number
    bounceHeight?: number
    style?: any
}

const LoadingDots = ({
    size = 8,
    color = Theme.colors.lightDescription,
    dots = 3,
    bounceHeight = 5,
    style,
}: LoadingDotsProps) => {
    const animations = useRef(
        Array.from({ length: dots }, () => new Animated.Value(0))
    ).current

    useEffect(() => {
        const createAnimation = (index: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(index * 120),
                    Animated.timing(animations[index], {
                        toValue: -bounceHeight,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animations[index], {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            )

        const animated = animations.map((_, i) => createAnimation(i))
        animated.forEach((anim) => anim.start())

        return () => {
            animated.forEach((anim) => anim.stop())
        }
    }, [animations, bounceHeight])

    return (
        <View style={[styles.container, style]}>
            {animations.map((anim, i) => (
                <Animated.View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            width: size,
                            height: size,
                            backgroundColor: color,
                            marginHorizontal: size / 2,
                            transform: [{ translateY: anim }],
                        },
                    ]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    dot: {
        borderRadius: 999,
    },
})

export default LoadingDots
