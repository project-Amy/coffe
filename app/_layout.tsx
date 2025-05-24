import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({});
  const noHeader = { headerShown: false };
  const STATUSBAR_HEIGHT =
    Platform.OS === "android" ? Constants.statusBarHeight : 0;
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
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <Stack>
          <Stack.Screen name="index" options={noHeader} />
          <Stack.Screen name="(tabs)" options={noHeader} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(coffe)" options={noHeader} />
          <Stack.Screen name="(auth)/register" options={noHeader} />

          <View
            style={{
              height: STATUSBAR_HEIGHT,
              backgroundColor: Colors.primary,
            }}
          >
            <StatusBar style="light" />
          </View>
        </Stack>
      </ClerkProvider>
    </React.Fragment>
  );
}
