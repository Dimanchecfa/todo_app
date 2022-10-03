import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@react-native-material/core";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useApp from "../../utilities/hook/useApp";
const Splash = () => {
  const app = useApp();
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/sph.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.text_welcome}>Bienvenue !</Text>
          <Text style={styles.text}>
            Créez votre compte pour enregistrer vos tâche et y accéder n'importe
            où.
          </Text>
        </View>
        <TouchableOpacity
          
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 5,
            width: "85%",
            height: 60,
            alignItems: "center",
            marginTop: 45,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <MaterialCommunityIcons name="google" size={24} color="black" />
          <Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }}>
            Continuer avec Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          app.setIsSplash(!app.isSplash);
          console.log(app.isSplash);
        }}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 5,
            width: "85%",
            height: 60,
            alignItems: "center",
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <MaterialCommunityIcons name="email" size={24} color="black" />
          <Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }}>
            Continuer avec Email
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#243745",
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 200,
    borderRadius: 15,
    marginTop: "30%",
  },
  text_welcome: {
    color: "#fff",
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    marginTop: 20,
    marginHorizontal: 40,
  },
});

export default Splash;
