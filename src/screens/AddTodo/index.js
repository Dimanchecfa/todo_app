import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View , StyleSheet  } from "react-native";
import Input from "../../components/Input";
import COLORS from "../../theme/color";
import {HEIGHT} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import Button from "../../components/Button";
import {auth, db} from "../../utilities/firebase/firebase.config";
import {addDoc, collection} from "firebase/firestore";
import Loader from "../../components/Loader";


const AddTodo = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({});
    const [inputs, setInputs] = React.useState({
        title: "",
        isCompleted: false,
        isFavorite: false,
    })
    const handleOnchange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }));
    }
    const handleErrors = (error, input) => {
        setError((prevState) => ({...prevState, [input]: error}));
    }
    const validate = async () => {
        setLoading(true);
        const {title, isCompleted, isFavorite} = inputs;
        let error = {};
        if (!title) {
            error = {
                title: !title ? "Le titre est requis" : "",
            }
            return setError(error);
        }
        const todo = {
            title,
            isCompleted,
            isFavorite,
            date: new Date().getTime(),

        }

        console.log(todo);
        try {
          await addDoc(collection(db, "todo"), todo);
          setTimeout(() => {
                setLoading(false);

          }, 2000);
          setInputs(
              inputs.title = "",
          )}
        catch (e) {
            console.log(e);
        }

    }

  return (
    <>
      <View style={styles.container}>
          <Text
              style={styles.text}
          >
              Ajouter une tâche
          </Text>
          <View style={styles.view}>

              <Input
                    placeholder="Nom de la tâche"
                    iconName="text"
                    label="Nom de la tâche"
                    value={inputs.title}
                    onChangeText={(text) => handleOnchange(text, "title")}
                    onFocus={() => handleErrors(null, "title")}
                    error={error.title}

                />
              <Button title={"Ajouter"} onPress={validate} />

          </View>
          <Loader visible={loading} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,

    alignItems: "center",
      height: HEIGHT,

  },
    text: {
      marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",

    },
    view: {
      marginTop: 20,

        flex: 1,


        width: "100%",
        paddingHorizontal: 30,

    }
});

export default AddTodo;
