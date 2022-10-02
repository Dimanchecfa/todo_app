import {updateDoc , doc , deleteDoc, onSnapshot} from "firebase/firestore";
import {db} from "../utilities/firebase/firebase.config";

export const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
};

export const handleToogle = async(todo) => {
    console.log(todo);
    const todoRef = doc(db, "todo", todo.id);
  await  updateDoc(todoRef, {
        isCompleted: !todo.isCompleted,
    });
}

export const deleteTodo = async (todo) => {
    console.log(todo);
    const todoRef = doc(db, "todo", todo.id);
   await deleteDoc(todoRef);
}
export const editTodo = async (todo) => {
    const todoRef = doc(db, "todo", todo.id);
    await updateDoc(todoRef, {
        title: todo.title,
        date: todo.date,
    });
}

export const handleFavorite = async (todo) => {
    const todoRef = doc(db, "todo", todo.id);
   await updateDoc(todoRef, {
        isFavorite: !todo.isFavorite,
    });
}


