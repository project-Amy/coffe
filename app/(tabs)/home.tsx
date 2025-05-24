import CardCoffee from "@/components/coffe/CardCoffe";
import { Colors } from "@/constants/Colors";
import useGetCoffees from "@/hooks/coffe/use-get-all-coffes";
import { CoffeCup } from "@/types/types";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { getAllCoffes } = useGetCoffees();
  const [data, setData] = useState<CoffeCup[]>([]);

  async function fetchData() {
    try {
      const response = await getAllCoffes();
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Error fetching!", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {isFocused && <StatusBar style="dark" backgroundColor="white" />}
      <View style={styles.headerSection}>
        <Text style={styles.titleContainer}>Location</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          columnWrapperStyle={{ gap: 20, justifyContent: "space-between" }}
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <CardCoffee
                name={item.name}
                price={item.price}
                id={item.id}
                image={item && item?.image}
                description={item.description}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: Colors.textDark,
    height: 300,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 50,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 15,
  },
});
