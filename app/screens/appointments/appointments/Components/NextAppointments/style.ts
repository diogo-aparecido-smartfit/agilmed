import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 20px 16px;
    gap: 20px;
`

export const HeaderContainer = styled.View`
    flex-direction: row;
    gap: 10px;
`

export const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Theme.colors.lightDescription};
`

export const DoctorInfoWrapper = styled.View`
    flex-direction: column;
    gap: 8px;
`

export const SchedulesWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`

export const ScheduleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`
