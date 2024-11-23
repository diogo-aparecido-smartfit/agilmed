import Text from "@/components/Text/Text";
import * as S from "./style";

interface OptionBubbleProps {
  children: string;
  onPress?: () => void;
}

const OptionBubble = ({ children, onPress }: OptionBubbleProps) => {
  return (
    <S.Container onPress={onPress}>
      <Text fontWeight="500" color="mainColor">
        {children}
      </Text>
    </S.Container>
  );
};

export default OptionBubble;
