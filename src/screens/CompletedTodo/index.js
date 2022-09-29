import React, {useEffect} from 'react';
import {ScrollView, Text, View , StyleSheet} from "react-native";
import {onSnapshot, collection} from "firebase/firestore";
import {db} from "../../utilities/firebase/firebase.config";
import Card from "../../components/Card";

const CompletedTodo = () => { const [todos, setTodos] = React.useState([]);
    const [todoCompleted, setTodoCompleted] = React.useState([]);
    useEffect(() => {
        onSnapshot(collection(db, "todo"), (snapshot) => {
            setTodoCompleted(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));

        });
    }, []);

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20}}>taches termine</Text>
                {
                    todoCompleted.filter((todo) => todo.isCompleted === false).map((todo, index) => (
                        <Card onPress={() => {}} title={todo.title} onDelete={() => {
                            console.log(todo.id);
                        }} onEdit={() => {}} date={todo.date} key={index} checked={todo.isCompleted} onChange={() => {
                            console.log(todo.id);
                        }}/>
                    ))
                }
            </ScrollView>

        </>
    );
};

export default CompletedTodo ;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});