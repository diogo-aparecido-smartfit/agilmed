/** @jsxImportSource @emotion/react */
import { Theme } from '@/config/theme'
import { css } from '@emotion/native'

export const containerStyle = css({
    flex: 1,
    backgroundColor: Theme.colors.white,
})

export const contentContainerStyle = css({
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    flexDirection: 'column',
})

export const buttonWrapperStyle = css({
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    alignSelf: 'stretch',
    gap: 8,
})

export const avatarContainerStyle = css({})

export const personalInfoStyle = css({
    marginTop: 18,
    alignItems: 'center',
    gap: 8,
})

export const formContainerStyle = css({
    width: '100%',
    marginVertical: 32,
    gap: 20,
})
