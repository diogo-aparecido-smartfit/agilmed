import LayoutHeader from "@/components/LayoutHeader/LayoutHeader";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        contentStyle: {
          paddingTop: Platform.OS === "android" ? 70 : 90,
        },
        header: () => <LayoutHeader hasBackButton />,
      }}
      initialRouteName="settings"
    >
      <Stack.Screen
        options={{
          animation: "slide_from_right",
        }}
        name="settings"
      />
    </Stack>
  );
}
