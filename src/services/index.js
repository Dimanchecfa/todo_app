import {updateDoc , doc , deleteDoc} from "firebase/firestore";
import {db} from "../utilities/firebase/firebase.config";


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
