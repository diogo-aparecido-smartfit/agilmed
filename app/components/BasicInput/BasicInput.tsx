import * as S from "./style";
import { Theme } from "@/config/theme";
import { Icon } from "iconsax-react-native";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  error?: string;
  mask?: string;
  label?: string;
  icon?: {
    Icon: Icon;
    color?: string;
    size?: number;
    onPress?: () => void;
  };
}

const BasicInput = ({ error, label, icon, ...props }: InputProps) => {
  return (
    <S.InputContainer>
      <S.InputLabel>{label}</S.InputLabel>
      <S.InputText
        focusable={true}
        {...props}
        onFocus={(e) => {
          e.target.setNativeProps({
            style: {
              borderColor: !error ? Theme.colors.mainColor : Theme.colors.error,
            },
          });
        }}
        onBlur={(e) => {
          e.target.setNativeProps({
            style: {
              borderColor: !error
                ? Theme.colors.borderColor
                : Theme.colors.error,
            },
          });
        }}
      />
      {icon && (
        <S.IconContainer onPress={icon.onPress}>
          {<icon.Icon color={icon.color} size={icon.size} />}
        </S.IconContainer>
      )}
      <S.ErrorText>{error}</S.ErrorText>
    </S.InputContainer>
  );
};

export default BasicInput;
