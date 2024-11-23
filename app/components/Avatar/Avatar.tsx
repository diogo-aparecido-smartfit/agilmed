import { Icon, IconProps, Smileys } from "iconsax-react-native";
import * as S from "./style";
import { Theme } from "@/config/theme";
import { ActivityIndicator } from "react-native";

interface AvatarProps {
  uri?: string | typeof Icon;
  size?: number;
  icon?: IconProps;
  isLoading?: boolean;
  onPress?: () => void;
}

const Avatar = ({ uri, onPress, icon, size, isLoading }: AvatarProps) => {
  if (isLoading) {
    return (
      <S.Container onPress={onPress} width={size} height={size}>
        <S.IconBackground>
          <ActivityIndicator color={Theme.colors.mainColor} />
        </S.IconBackground>
      </S.Container>
    );
  }

  if (!uri) {
    return (
      <S.Container onPress={onPress} width={size} height={size}>
        <S.IconBackground>
          <Smileys
            variant="Bold"
            size={size ? size / 2 : 32}
            color={Theme.colors.mainColor}
          />
        </S.IconBackground>
      </S.Container>
    );
  }

  if (typeof uri !== "string") {
    const IconComponent = uri;

    return (
      <S.Container onPress={onPress} width={size} height={size}>
        <S.IconBackground>
          <IconComponent
            color={Theme.colors.mainColor}
            size={size ? size / 2 : 56 / 2}
            {...icon}
          />
        </S.IconBackground>
      </S.Container>
    );
  }

  return (
    <S.Container onPress={onPress} width={size} height={size}>
      <S.Image
        width={size ?? 56}
        height={size ?? 56}
        source={{ uri: uri as string }}
      />
    </S.Container>
  );
};

export default Avatar;
