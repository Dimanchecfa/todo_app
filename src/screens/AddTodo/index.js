import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View , StyleSheet  } from "react-native";


const AddTodo = () => {

  return (
    <>
      <View style={styles.container}>
        <Text
            style={styles.text}
        >
            Ajouter une tâche
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
    text: {
        fontSize: 20,
        fontWeight: "bold",

    }
});

export default AddTodo;
