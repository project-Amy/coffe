import { useFavoriteStore } from "@/store/UseFavoriteStore";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable } from "react-native";

export default function CoffeLayout() {
  const { addFavorite, removeFavorite, allFavorites } = useFavoriteStore();

  function handleFavorite(id: string) {
    if (allFavorites().includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }

  function isFavorite(id: string) {
    return allFavorites().includes(id);
  }

  useEffect(() => {
    console.log(allFavorites());
  }, [allFavorites()]);

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          headerTitle: "Details",
          headerRight: () => {
            const { id } = route.params as { id: string };
            return (
              <Pressable onPress={() => handleFavorite(id)}>
                <Image
                  source={
                    isFavorite(id)
                      ? require("@/assets/images/favorites-active.png")
                      : require("@/assets/images/Favorites.png")
                  }
                />
              </Pressable>
            );
          },
        })}
      />
    </Stack>
  );
}
