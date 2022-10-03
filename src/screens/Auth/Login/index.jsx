import React from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import COLORS from "../../../theme/color";
import { auth } from "../../../utilities/firebase/firebase.config";
import useApp from "../../../utilities/hook/useApp";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HEIGHT = Dimensions.get("window").height;
const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const { login, setUser, user } = useApp();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const validate = async (e) => {
   
    setLoading(true);
    const { email, password } = inputs;
    console.log(inputs);
    let error = {};
    if (!email || !password) {
      error = {
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      };
      return setErrors(error);
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
        Alert.alert("Success", "You have successfully logged in");
        navigation.navigate("Home");




      console.log("Login successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView>


        <View style={styles.container}>
          <View style={styles.header}>
            <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              value={inputs.email}
              placeholder="Entrer votre adresse email"
              error={errors.email}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              error={errors.password}
              value={inputs.password}
              password
            />
            <Button title="Se connecter" onPress={validate} />
            <Text>
              Je n'ai pas de compte !{" "}
              <Text
                onPress={() => navigation.navigate("Register") }
                style={{
                  color: COLORS.green,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                S'inscrire
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
      <Loader visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    flexDirection: "column",
    backgroundColor: COLORS.white,
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

export default Login;
