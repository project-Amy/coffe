import { Colors } from "@/constants/Colors";
import useGetSingleCoffe from "@/hooks/coffe/use-get-coffe";
import { CoffeCup } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CoffeDetails() {
  const [coffe, setCoffe] = useState<CoffeCup | null>(null);
  const { getSingleCoffe } = useGetSingleCoffe();
  const params = useLocalSearchParams();
  const id = params.id as string;

  async function currentCoffe(id: string) {
    try {
      const response = await getSingleCoffe(id);
      if (response && response.data) {
        setCoffe(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    if (id) {
      currentCoffe(id);
    }
  }, []);

  useEffect(() => {
    console.log("coffe state updated", coffe);
  }, [coffe]);

  return (
    <View style={styles.container}>
      {coffe ? (
        <React.Fragment>
          <View style={styles.imageContainer}>
            <Image source={{ uri: coffe?.image }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{coffe.name}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{coffe.description}</Text>
            </View>
            <View>
              <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add to cart</Text>
              </Pressable>
            </View>
          </View>
        </React.Fragment>
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.placeholderImage} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.placeholderTitle} />
            <View style={styles.descriptionContainer}>
              <View style={styles.placeholderDescription} />
            </View>
            <View>
              <View style={styles.placeholderButton}></View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    marginTop: 30,
  },
  image: {
    width: "90%",
    borderRadius: 15,
    height: 250,
    margin: "auto",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    margin: "auto",
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  placeholderImage: {
    width: "90%",
    height: 250,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    margin: "auto",
  },
  placeholderTitle: {
    width: "70%",
    height: 28,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 10,
  },
  placeholderDescription: {
    width: "95%",
    height: 80,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 10,
  },
  placeholderButton: {
    marginTop: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 15,
    margin: "auto",
  },
});
