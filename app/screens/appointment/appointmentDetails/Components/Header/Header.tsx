import * as S from './style'
import { ArrowLeft } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { UseAppointmentDetailsController } from '../../appointment-details.controller'

const Header = () => {
    const { handleBackPress } = UseAppointmentDetailsController()

    return (
        <S.Container>
            <S.BackButton onPress={handleBackPress}>
                <ArrowLeft
                    color={Theme.colors.white}
                    size={24}
                    variant="Bold"
                />
            </S.BackButton>
        </S.Container>
    )
}

export default Header
