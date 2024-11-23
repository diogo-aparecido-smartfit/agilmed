import Text from "@/components/Text/Text";
import * as S from "./style";
import Avatar from "@/components/Avatar/Avatar";
import React from "react";
import LoadingDots from "react-native-loading-dots";
import { Theme } from "@/config/theme";
import { Cpu } from "iconsax-react-native";

interface MessageBubbleProps {
  children: string | React.ReactNode;
  isReceived?: boolean;
  isLoading?: boolean;
}

const MessageBubble = ({
  children,
  isReceived,
  isLoading,
}: MessageBubbleProps) => {
  if (isReceived) {
    if (isLoading) {
      return (
        <S.ReceivedContainer>
          <Avatar size={32} uri={Cpu} />
          <S.Container isReceived={isReceived}>
            <LoadingDots
              size={8}
              dots={3}
              bounceHeight={5}
              colors={[
                Theme.colors.lightDescription,
                Theme.colors.lightDescription,
                Theme.colors.lightDescription,
              ]}
            />
          </S.Container>
        </S.ReceivedContainer>
      );
    }

    return (
      <S.ReceivedContainer>
        <Avatar size={32} uri={Cpu} />
        <S.Container isReceived={isReceived}>
          <Text color="black">{children}</Text>
        </S.Container>
      </S.ReceivedContainer>
    );
  }

  if (typeof children !== "string") {
    return <S.Container isReceived={isReceived}>{children}</S.Container>;
  }

  return (
    <S.Container isReceived={isReceived}>
      <Text color="white">{children}</Text>
    </S.Container>
  );
};

export default MessageBubble;
