import { Text } from "@react-native-material/core";
import React from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import COLORS from "../../../theme/color";
import useApp from "../../../utilities/hook/useApp";

const HEIGHT = Dimensions.get("window").height;
const Register = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    nom: "",
    email: "",
    password: "",
  });
  const { register, setUser, user } = useApp();
  const [loading, setloading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const validate = (e) => {
    const { nom, email, password } = inputs;
    console.log(inputs);
    setloading(true);
    let error = {};
    if (!nom || !email || !password) {
      error = {
        nom: !nom ? "Votre nom est requis" : "",
        email: !email ? "Votre email est requis" : "",
        password: !password ? "Votre mot de passe est requis" : "",
      };
      return setErrors(error);
    }

    const user = {
      nom,
      email,
      password,
    };
    try {
      register(user);
      setloading(false);
      Alert.alert("Succès", "Votre compte a été créé avec succès" + user.nom);
      navigation.navigate("Login", { email: user.email });
    } catch (error) {
      setloading(false);
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.area}>
          <Text style={styles.area_text}>Inscription</Text>
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Input
              onChangeText={(text) => handleOnchange(text, "nom")}
              onFocus={() => handleError(null, "nom")}
              iconName="account-outline"
              label="Nom complet"
              placeholder="Enter votre nom complet"
              error={errors.nom}
              value={inputs.nom}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              placeholder="Entrer votre adresse email"
              error={errors.email}
              value={inputs.email}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              error={errors.password}
              password
              value={inputs.password}
            />
            <Button title="S'inscrire" onPress={validate} />
            <Text>
              J'ai deja un compte!{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: COLORS.green,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
        <Loader visible={loading} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
    height: HEIGHT,
    width: "100%",
  },
  header: {
    marginTop: 80,
    width: "100%",
    paddingHorizontal: 30,
  },
  area: {
    backgroundColor: "#ffffff",
    height: HEIGHT / 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  area_text: {
    fontSize: 25,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
});

export default Register;
