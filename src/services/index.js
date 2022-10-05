import {updateDoc , doc , deleteDoc, onSnapshot} from "firebase/firestore";
import { Alert } from "react-native";
import {db} from "../utilities/firebase/firebase.config";

export const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth()}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
};

export const handleToggle = async(todo) => {
    console.log(todo);
    const todoRef = doc(db, "todo", todo?.id);
  await  updateDoc(todoRef, {
        isCompleted: !todo?.isCompleted,
    });
}

export const deleteTodo = async (todo) => {
    const todoRef = doc(db, "todo", todo.id);
   Alert.alert(
         "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        await deleteDoc(todoRef);
                    }
                }
            ]
        )
   
}
export const editTodo = async (todo) => {
    const todoRef = doc(db, "todo", todo.id);
    await updateDoc(todoRef, {
        title: todo.title,
        date: todo.date,
    });
}

export const handleFavorite = async (todo) => {
    const todoRef = doc(db, "todo", todo?.id);
   await updateDoc(todoRef, {
        isFavorite: !todo?.isFavorite,
    });
   console.log(todo);
}

export const formatTitle = (text) => {
    if(text?.length > 10){
        return text.substring(0,10) + "...";
    }
    return text;
}

export const formatDescription = (text) => {
    if(text?.length > 25) {
        return text.substring(0 , 20) + "..."
    }
    return text

}

export const handleEdit = ({navigation}) => {
    navigation.navigate("EditTodo");
}

export const generateToken = () => {
    return Math.floor(Math.random() * 1000000000);
}

export const searchTodo = async (query) => {
    const todoRef = collection(db, "todo");
    const q = query(todoRef, where("title", "==", query));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    })
    app?.setFilter(true);
}



