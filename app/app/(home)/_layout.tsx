import { Tabs, useSegments } from "expo-router";
import React from "react";
import { Home, Calendar2, Message, Profile } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import { Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.View<{ focused: boolean }>`
  padding: 14px;
  border-radius: 12px;
  background-color: ${({ focused }) =>
    focused ? Theme.colors.fillColor : "transparent"};
`;

const TabBarIcon = ({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) => {
  if (!children) {
    return null;
  }

  return <Container focused={focused}>{children}</Container>;
};

const appointmentsPageToHideTabBar = ["[id]"];

const tabBarStyle = {
  height: Platform.OS === "ios" ? 100 : 80,
  borderTopWidth: 1,
  shadowOpacity: 0,
  elevation: 0,
};

export default function TabLayout() {
  const segment = useSegments();
  const page = segment[segment.length - 1];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.mainColor,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 80,
          borderTopWidth: 1,
          shadowOpacity: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          top: 20,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Home variant={focused ? "Bold" : "Outline"} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="(appointments)"
        options={{
          title: "Appointments",
          tabBarStyle: {
            ...tabBarStyle,
            display: appointmentsPageToHideTabBar.includes(page)
              ? "none"
              : undefined,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Calendar2 variant={focused ? "Bold" : "Outline"} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: "Chat",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Message variant={focused ? "Bold" : "Outline"} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Profile variant={focused ? "Bold" : "Outline"} color={color} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
