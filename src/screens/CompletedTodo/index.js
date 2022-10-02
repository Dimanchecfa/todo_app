import React, {useEffect} from 'react';
import {ScrollView, Text, View , StyleSheet} from "react-native";
import {onSnapshot, collection} from "firebase/firestore";
import useApp from '../../utilities/hook/useApp';
import {db} from "../../utilities/firebase/firebase.config";
import Card from "../../components/Card";
import { formatDate, handleToogle } from '../../services';

const CompletedTodo = () => { 
   const app = useApp();
    const [todoCompleted, setTodoCompleted] = React.useState([]);
    useEffect(() => {
        onSnapshot(collection(db, "todo"), (snapshot) => {
            setTodoCompleted(snapshot.docs.filter((todo) => formatDate(todo.date) === formatDate(app?.date))
                .map((doc) => ({...doc.data() , id: doc.id})))
        });
    }, [app?.date]);

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20}}>taches termine</Text>
                {
                    todoCompleted.filter((todo) => todo.isCompleted === false).map((todo, index) => (
                        <Card onPress={() => {}} title={todo.title} onDelete={() => {
                            console.log(todo.id);
                        }} onEdit={() => {}} date={todo.date} key={index} checked={todo.isCompleted} onChange={() => {
                            handleToogle(todo) 
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