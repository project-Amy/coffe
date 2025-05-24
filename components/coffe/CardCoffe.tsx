import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CardCoffeeProps {
  name: string;
  price: number;
  image?: string;
  description: string;
  id: string;
}

export default function CardCoffee({
  name,
  price,
  image,
  id,
  description,
}: CardCoffeeProps) {
  function handleDescription() {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    }
    return description;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.priceText}>{price.toFixed(2)} €</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{handleDescription()}</Text>
      </View>
      <View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(coffe)/[id]",
              params: { id: id, name: name },
            })
          }
          style={styles.infoButton}
        >
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "85%",
    height: 150,
    margin: "auto",
    marginTop: 15,
    borderRadius: 15,
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  descriptionContainer: {
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 0,
  },
  infoButton: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
