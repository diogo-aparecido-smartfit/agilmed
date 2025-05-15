/** @jsxImportSource @emotion/react */
import { Theme } from '@/config/theme'
import { css } from '@emotion/native'

export const containerStyle = css({
    flex: 1,
    backgroundColor: Theme.colors.white,
})

export const imageBackgroundStyle = css({
    width: '100%',
    height: '45%',
})

export const contentContainerStyle = css({
    padding: 40,
    paddingHorizontal: 24,
    backgroundColor: Theme.colors.white,
    flexDirection: 'column',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
})

export const headerStyle = css({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const contentStyle = css({
    flexDirection: 'column',
    gap: 8,
})

export const addressContainerStyle = css({
    marginTop: 16,
    flexDirection: 'column',
    gap: 8,
})

export const informationContainerStyle = css({
    flexDirection: 'column',
})

export const reviewsContainerStyle = css({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
})

export const dividerContainerStyle = css({
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginVertical: 24,
})

export const dividerStyle = css({
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.inputColor,
})

export const customMapStyle = css({
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
})
