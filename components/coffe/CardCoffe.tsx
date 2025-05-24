import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

interface CardCoffeeProps {
  name: string;
  price: number;
  image?: string;
  id: string;
}

export default function CardCoffee({
  name,
  price,
  image,
  id,
}: CardCoffeeProps) {
  return (
    <>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(coffe)/[id]",
            params: { id: id, name: name },
          })
        }
      >
        <View style={styles.cardContainer}>
          <Text>{name}</Text>
          {image && <Image source={{ uri: image }} />}
          <Text>{price}</Text>
          <Pressable>
            <Image source={require("@/assets/images/favorites-active.png")} />
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 10,
    width: 180,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
});
