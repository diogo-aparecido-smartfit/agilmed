import { Edit2 } from "iconsax-react-native";
import * as S from "./styles";

interface EditButtonProps {
  onChange: () => void;
}

export default function EditButton({ onChange }: EditButtonProps) {
  return (
    <S.Container onPress={onChange}>
      <Edit2 size={18} color="#FFF" />
    </S.Container>
  );
}
