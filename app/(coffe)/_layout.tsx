import { Stack } from "expo-router";
import React from "react";

export default function CoffeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{ 
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
