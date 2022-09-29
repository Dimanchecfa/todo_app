import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import {Text, View, StyleSheet, Keyboard} from "react-native";
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
        description: "",
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
        Keyboard.dismiss();
        setLoading(true);
        const {title, isCompleted, isFavorite, description} = inputs;
        let error = {};
        if (!title) {
            error = {
                title: !title ? "Le titre est requis" : "",

            }
            return setError(error);
        }
        const todo = {
            title,
            description,
            isCompleted : false,
            isFavorite : false,
            date: new Date().toISOString(),

        }

        console.log(todo);
        try {
          await addDoc(collection(db, "todo"), todo);
          setLoading(false);
          setInputs(
              inputs.title = "",
                inputs.description = "",
          )}
        catch (e) {
            console.log(e);
            setLoading(false);
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
                    placeholder="Ajouter un titre"
                    value={inputs.title}
                    label={"Titre"}
                    onChangeText={(text) => handleOnchange(text, "title")}
                    error={error.title}
                    onBlur={() => handleErrors("", "title")}
                />

              <Input
                    placeholder="Prendre des notes"
                    iconName="text"
                    label="Description"
                    value={inputs.description}
                    onChangeText={(text) => handleOnchange(text, "description")}
                    onFocus={() => handleErrors(null, "description")}
                    error={error.description}
                    isMultiline={true}


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
