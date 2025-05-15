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
    justifyContent: 'center',
    flexDirection: 'column',
})

export const appointmentListStyle = css({
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 24,
    flexDirection: 'column',
    flex: 1,
    gap: 24,
})
