import { Colors } from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface FormData {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: null,
    password: null,
    confirmPassword: null,
    showPassword: false,
    showConfirmPassword: false,
  });

  async function onSignUpPress() {
    if (!isLoaded || loading) {
      return;
    }
    setLoading(true);
    if (!formData.email || !formData.password) {
      Alert.alert("Errore", "Email e password sono obbligatori");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Errore", "Le password non coincidono");
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert("Errore", "La password deve essere di almeno 6 caratteri");
      return;
    }

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });
      setActive({ session: signUp.createdSessionId });
      router.replace("/(tabs)/home");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Errore",
        err.errors?.[0]?.message || "Errore durante la registrazione"
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setFormData({
      email: null,
      password: null,
      confirmPassword: null,
      showPassword: false,
      showConfirmPassword: false,
    });
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" backgroundColor={Colors.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con logo caffè */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Ionicons name="cafe" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.welcomeText}>Benvenuto</Text>
          <Text style={styles.subtitleText}>
            Crea il tuo account per iniziare
          </Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <>
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email || ""}
                placeholder="esempio@email.com"
                placeholderTextColor={Colors.textLight}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={formData.password || ""}
                  placeholder="Minimo 6 caratteri"
                  placeholderTextColor={Colors.textLight}
                  secureTextEntry={!formData.showPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                  autoCapitalize="none"
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      showPassword: !formData.showPassword,
                    })
                  }
                >
                  <Ionicons
                    name={formData.showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={Colors.textLight}
                  />
                </Pressable>
              </View>
            </View>

            {/* Conferma Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Conferma Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={formData.confirmPassword || ""}
                  placeholder="Ripeti la password"
                  placeholderTextColor={Colors.textLight}
                  secureTextEntry={!formData.showConfirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                  autoCapitalize="none"
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      showConfirmPassword: !formData.showConfirmPassword,
                    })
                  }
                >
                  <Ionicons
                    name={formData.showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color={Colors.textLight}
                  />
                </Pressable>
              </View>
            </View>

            {/* Bottone Registrati */}
            <Pressable
              style={[styles.primaryButton, loading && styles.disabledButton]}
              onPress={onSignUpPress}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? "Registrazione..." : "Registrati"}
              </Text>
            </Pressable>

            {/* Link Login */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Hai già un account? </Text>
              <Pressable onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.linkButton}>Accedi</Text>
              </Pressable>
            </View>
          </>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutralBeige,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    fontFamily: "Sora",
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.neutralLight,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 8,
    fontFamily: "Sora",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.neutralLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.neutralLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Sora",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Sora",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  linkText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  linkButton: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  verificationContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textDark,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Sora",
  },
  verificationSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
  emailText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  codeInput: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 8,
  },
});
