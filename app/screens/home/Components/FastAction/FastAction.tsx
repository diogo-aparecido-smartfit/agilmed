import { Icon } from "iconsax-react-native";
import * as S from "./style";
import Text from "@/components/Text/Text";
import { Theme } from "@/config/theme";

interface FastActionProps {
  Icon: Icon;
  text: string;
  onPress?: () => void;
}

const FastAction = ({ Icon, text, onPress }: FastActionProps) => {
  return (
    <S.FastActionWrapper>
      <S.FastActionButton onPress={onPress}>
        <Icon variant="Bold" color={Theme.colors.mainColor} />
      </S.FastActionButton>
      <Text fontSize="sm" color="description">
        {text}
      </Text>
    </S.FastActionWrapper>
  );
};

export default FastAction;
