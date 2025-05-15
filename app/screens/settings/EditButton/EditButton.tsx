/** @jsxImportSource @emotion/react */
import { Edit2 } from 'iconsax-react-native'
import * as S from './styles'
import { TouchableOpacity } from 'react-native'

interface EditButtonProps {
    onChange: () => void
}

export default function EditButton({ onChange }: EditButtonProps) {
    return (
        <TouchableOpacity onPress={onChange} css={S.containerStyle}>
            <Edit2 size={18} color="#FFF" />
        </TouchableOpacity>
    )
}
