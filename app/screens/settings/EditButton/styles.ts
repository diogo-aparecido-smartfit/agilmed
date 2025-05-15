/** @jsxImportSource @emotion/react */
import { Theme } from '@/config/theme'
import { css } from '@emotion/native'

export const containerStyle = css({
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: Theme.colors.mainColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
})
