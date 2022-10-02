import React, {useEffect} from 'react';
import {ScrollView, Text, View} from "react-native";
import Card from "../../components/Card";
import useApp from "../../utilities/hook/useApp";
import {onSnapshot, collection} from "firebase/firestore";
import {db} from "../../utilities/firebase/firebase.config";
import { formatDate } from '../../services';

const AllTodo = () => {
    const app = useApp();
    const [todos, setTodos] = React.useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "todo"), (snapshot) => {
            setTodos(snapshot.docs.filter((todo) => formatDate(todo.date) === formatDate(app?.date))
                .map((doc) => ({...doc.data() , id: doc.id})))
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