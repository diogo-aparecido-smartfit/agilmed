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
        header: () => <LayoutHeader />,
      }}
      initialRouteName="appointments"
    >
      <Stack.Screen name="appointments" />
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            paddingTop: 0,
          },
        }}
        name="details/[id]"
      />
    </Stack>
  );
}
