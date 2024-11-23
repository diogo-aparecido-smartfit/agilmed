import { router } from "expo-router";
import * as S from "./style";
import { ArrowLeft } from "iconsax-react-native";

const Header = () => {
  return (
    <S.Container>
      <S.BackButton onPress={() => router.back()}>
        <ArrowLeft size={24} color="#FFF" />
      </S.BackButton>
    </S.Container>
  );
};

export default Header;
