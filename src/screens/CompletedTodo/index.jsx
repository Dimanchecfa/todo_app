import React, { useEffect } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { onSnapshot, collection } from 'firebase/firestore'
import useApp from '../../utilities/hook/useApp'
import { db } from '../../utilities/firebase/firebase.config'
import Card from '../../components/Card'
import {
  deleteTodo,
  formatDate,
  handleFavorite,
  handleToogle,
} from '../../services'

const CompletedTodo = ({ navigation }) => {
  const app = useApp()
  const [todoCompleted, setTodoCompleted] = React.useState([])
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodoCompleted(
        snapshot.docs
          .filter(
            (todo) =>
              formatDate(todo.date) === formatDate(app?.date) &&
              todo.isCompleted === true,
          )
          .map((doc) => ({ ...doc.data(), id: doc.id })),

      )
      console.log(todoCompleted)
    })
  }, [formatDate(app?.date)])

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 , marginHorizontal: 15}}>
         Mes Tâches terminées du {
            formatDate(app?.date) !== formatDate(new Date())
                ? formatDate(app?.date)
                : 'jour'
         }
        </Text>
        {todoCompleted.map((todo, index) => (
          <Card
            onPress={() => {}}
            title={todo.title}
            onDelete={() => {
              deleteTodo(todo)
            }}
            onEdit={() => {
              console.log(todo)
              navigation.navigate('EditTodo', {
                title: todo?.title,
                description: todo?.description,
                date: todo?.date,
                id: todo?.id,
              })
            }}
            date={todo.date}
            key={index}
            checked={todo.isCompleted}
            onChange={() => {
              handleToogle(todo)
            }}
            description={todo.description}
            isFavorite={todo.isFavorite}
            handleLiked={() => handleFavorite(todo)}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default CompletedTodo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
