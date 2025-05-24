import React /* , { useEffect } */ from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
/* import useGetSingleCoffe from "@/hooks/useGetSingleCoffe"; */

export default function CoffeDetails() {
  // Ottieni l'oggetto di navigazione per impostare il titolo
  const navigation = useNavigation();
  /* const { getSingleCoffe } = useGetSingleCoffe(); */
  const params = useLocalSearchParams();
  const id = params.id as string;

  

  /* useEffect(() => {
    getSingleCoffe(id);
  }, []);
 */
  return (
    <View style={styles.container}>
     {/*  <Text style={styles.title}>{name}</Text> */}
    {/*   <Text style={styles.subtitle}>ID: {id}</Text> */}
      {/* <Image source={image} style={styles.image} /> */}
      <Text>Coffe Details {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
