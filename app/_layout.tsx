import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({});
  const noHeader = { headerShown: false };
  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? Constants.statusBarHeight : 0;
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <React.Fragment>
      <Stack>
        <Stack.Screen name="index" options={noHeader} />
        <Stack.Screen name="(tabs)" options={noHeader} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(coffe)" options={noHeader} />

        <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: Colors.primary }}>
          <StatusBar />
        </View>
      </Stack>
    </React.Fragment>
  );
}
