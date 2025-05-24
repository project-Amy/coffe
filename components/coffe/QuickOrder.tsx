import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface QuickOrderProps {
  name: string;
  image: string;
  id: string;
}

export default function QuickOrder({ name, image, id }: QuickOrderProps) {
  const [quantity, setQuantity] = useState(0);

  function handleAddToCart() {
    setQuantity(quantity + 1);
  }

  function handleRemoveFromCart() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <View style={styles.container} key={id}>
      <View style={styles.quickOrderContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.image}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={handleRemoveFromCart}>
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
        <View style={styles.quantityContainer}>
          <Text style={{ margin: "auto", paddingHorizontal: 10 }}>{quantity}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    margin: "auto",
    marginBottom: 10,
    height: 100,
    padding: 10,
  },
  quickOrderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  quantityContainer: {
    width: 20,
    textAlign: "center",
    margin: "auto",
  },
  image: {
    width: "100%",
    maxWidth: 150,
    height: 50,
    borderRadius: 5,
  },
  nameText: {
    fontSize: 14,
    marginTop: 20,
  },
});
