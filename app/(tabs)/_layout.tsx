import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require("@/assets/images/Home.png")} />
            ) : (
              <Image source={require("@/assets/images/emptyhome.png")} />
            ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require("@/assets/images/favorites-active.png")} />
            ) : (
              <Image source={require("@/assets/images/Favorites.png")} />
            ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require("@/assets/images/active-cart.png")} />
            ) : (
              <Image source={require("@/assets/images/Cart.png")} />
            ),
        }}
      />
    </Tabs>
  );
}
