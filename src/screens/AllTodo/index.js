import React, {useEffect} from 'react';
import {ScrollView, Text, View} from "react-native";
import Card from "../../components/Card";
import {onSnapshot, collection} from "firebase/firestore";
import {db} from "../../utilities/firebase/firebase.config";

const AllTodo = () => {
    const [todos, setTodos] = React.useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "todo"), (snapshot) => {
            setTodos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            console.log(todos);
        });
    }, []);

    return (
        <>
            <ScrollView>
                <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20}}>All Todo</Text>

                {
                    todos.map((todo, index) => (
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

export default AllTodo;