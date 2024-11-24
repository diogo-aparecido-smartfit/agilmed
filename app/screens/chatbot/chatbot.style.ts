import { Theme } from "@/config/theme";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: "padding",
})`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const ChatContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 24,
    gap: 16,
  },
})`
  flex: 1;
`;

export const MessageContainer = styled.View`
  gap: 16px;
  margin-bottom: 16px;
`;

export const FooterContainer = styled.KeyboardAvoidingView`
  padding: 32px 24px;
  flex-direction: row;
  gap: 16px;
  margin-top: auto;
  justify-content: space-between;
`;

export const SendMessageButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 999px;
  background-color: ${Theme.colors.mainColor};
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const HeaderContainer = styled.View`
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
`;

export const BotInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-left: 24px;
`;

export const BotInfoWrapper = styled.View`
  flex-direction: column;
`;

export const StatusWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ActivePointer = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 16px;
  background-color: #7dde86;
`;

export const TextInputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const OptionsRow = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
  margin: 0 -24px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: Theme.colors.inputColor,
})`
  flex: 1;
  padding: 10px 20px;
  border-radius: 48px;
  border: 1px solid ${Theme.colors.inputColor};
  background-color: ${Theme.colors.inputBackground};
  color: ${Theme.colors.black};
`;

export const MicrophoneButton = styled.TouchableOpacity`
  z-index: 10;
  position: absolute;
  right: 0;
  padding: 12px 20px;
`;

export const MapViewContainer = styled.View`
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const MarkOnMap = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`;
