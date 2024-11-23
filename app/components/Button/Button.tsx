import { Theme } from "@/config/theme";
import * as S from "./style";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  text: string;
  backgroundColor?: string;
  outlined?: boolean;
  isSecondary?: boolean;
  borderRadius?: number;
  width?: string;
}

const Button = ({
  text,
  isLoading,
  backgroundColor,
  outlined,
  borderRadius,
  isSecondary,
  onPress,
  ...props
}: ButtonProps) => {
  if (isLoading) {
    return (
      <S.ButtonContainer
        disabled
        backgroundColor={backgroundColor}
        testID="loading-button"
        outlined={outlined}
        borderRadius={borderRadius}
        isSecondary={isSecondary}
        onPress={onPress}
        {...props}
      >
        <ActivityIndicator
          color={
            isSecondary
              ? Theme.colors.mainColor
              : !outlined
              ? Theme.colors.white
              : Theme.colors.mainColor
          }
        />
      </S.ButtonContainer>
    );
  } else {
    return (
      <S.ButtonContainer
        testID="button-container"
        backgroundColor={backgroundColor}
        outlined={outlined}
        borderRadius={borderRadius}
        isSecondary={isSecondary}
        onPress={onPress}
        {...props}
      >
        <S.ButtonText isSecondary={isSecondary} outlined={outlined}>
          {text}
        </S.ButtonText>
      </S.ButtonContainer>
    );
  }
};

export default Button;
