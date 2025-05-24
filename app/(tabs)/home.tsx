import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import CardCoffee from "@/components/coffe/CardCoffe";
import { Colors } from "@/constants/Colors";
import useGetCoffees from "@/hooks/coffe/use-get-all-coffes";

interface CoffeCup {
  id: string;
  name: string;
  price: number;
}
export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { getAllCoffes } = useGetCoffees();
  const [data, setData] = useState<CoffeCup[]>([]);

  async function fetchData() {
    try {
      const response = await getAllCoffes();
      if (response) {
        console.log("Response:", response);
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
          columnWrapperStyle={{ gap: 10, justifyContent: "space-between" }}
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardCoffee name={item.name} price={item.price} id={item.id} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
      <View>
        <Text>Hello</Text>
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
