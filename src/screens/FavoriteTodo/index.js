import React, {useEffect} from 'react';
import {ScrollView, Text, View , StyleSheet} from "react-native";
import {onSnapshot, collection , updateDoc, doc} from "firebase/firestore";
import {db} from "../../utilities/firebase/firebase.config";
import Card from "../../components/Card";
import {deleteTodo, handleToogle} from "../../services";

const FavoriteTodo = () => {
    const [todoFavorite, setTodoFavorite] = React.useState([]);
    useEffect(() => {
        onSnapshot(collection(db, "todo"), (snapshot) => {
            setTodoFavorite(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));

        });
    }, []);



    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 20, fontWeight: "bold", margin: 30}}>
                    Mes favoris
                </Text>
                {
                    todoFavorite.filter((todo) => todo.isFavorite === false).map((todo, index) => (
                        <Card onPress={() => {}} title={todo.title} onDelete={()=> {}} onEdit={() => {}} date={todo.date} key={index} checked={todo.isCompleted} onChange={
                            () => handleToogle(todo)
                        } description={todo.description}/>
                    ))
                }
            </ScrollView>

        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});
export default FavoriteTodo;

