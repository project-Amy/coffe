import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/coffee.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.container_paragraph}>
          <View style={styles.text_container}>
            <Text style={styles.text_style}>
              Fall in Love with Coffee in Blissful Delight!
            </Text>
            <Text style={styles.sub_text}>
              Welcome to our cozy coffee corner, where every cup is delightful
              for you.
            </Text>
          </View>
          <Pressable style={styles.button} onPress={() => router.push("/home")}>
            <Text style={styles.button_text}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Sora",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    alignSelf: "center",
  },
  container_paragraph: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 400,
  },
  text_container: {
    width: "90%",
    margin: "auto",
    padding: 10,
  },
  text_style: {
    color: Colors.neutralLight,
    fontSize: 34,
    fontFamily: "Sora",
    fontWeight: "700",
    lineHeight: 45,
    textAlign: "center",
  },
  sub_text: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: "Sora",
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    color: Colors.textLight,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 15,
    margin: "auto",
    width: "90%",
    alignItems: "center",
    fontSize: 34,
  },
  button_text: {
    color: Colors.neutralLight,
    fontSize: 16,
    fontFamily: "Sora",
    fontWeight: "700",
  },
});
