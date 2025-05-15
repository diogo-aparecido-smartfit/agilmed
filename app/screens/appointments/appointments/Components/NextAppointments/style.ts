/** @jsxImportSource @emotion/react */
import { Theme } from '@/config/theme'
import { css } from '@emotion/native'

export const containerStyle = css({
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
})

export const headerContainerStyle = css({
    flexDirection: 'row',
    gap: 10,
})

export const dividerStyle = css({
    height: 1,
    width: '100%',
    backgroundColor: Theme.colors.lightDescription,
})

export const doctorInfoWrapperStyle = css({
    flexDirection: 'column',
    gap: 8,
})

export const schedulesWrapperStyle = css({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
})

export const scheduleContainerStyle = css({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
})
