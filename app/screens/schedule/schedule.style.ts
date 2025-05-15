/** @jsxImportSource @emotion/react */
import { Theme } from '@/config/theme'
import { css } from '@emotion/native'

export const containerStyle = css({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
})

export const titleStyle = css({
    color: Theme.colors.black,
    fontSize: 24,
    fontWeight: '700',
})

export const buttonStyle = css({
    marginTop: 16,
})

export const buttonTextStyle = css({
    color: Theme.colors.black,
    fontSize: 16,
    fontWeight: '500',
})
