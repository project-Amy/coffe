import QuickOrder from "@/components/coffe/QuickOrder";
import { useFavoriteStore } from "@/store/UseFavoriteStore";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Favorite() {
  const { favorites } = useFavoriteStore();

  useEffect(() => {
    console.log("all favorites", favorites);
  }, [favorites]);


  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text>Favorite page!</Text>
        <Text>{favorites.length}</Text>
      </View>
      <QuickOrder name="Cappuccino macha 12313451" image="https://jofrkgbsqpnokovltkqz.supabase.co/storage/v1/object/public/assets/Property%201=Coffee,%20Property%202=1.png" id="12313451" />
      
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
