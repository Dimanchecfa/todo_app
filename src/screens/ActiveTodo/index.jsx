import React, { useEffect } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../utilities/firebase/firebase.config'
import Card from '../../components/Card'
import useApp from '../../utilities/hook/useApp'
import { formatDate } from '../../services'

const ActiveTodo = () => {
  const [todos, setTodos] = React.useState([])
  const [todoActive, setTodoActive] = React.useState([])
  const app = useApp()
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodoActive(
        snapshot.docs
          .filter((todo) => formatDate(todo.date) === formatDate(app?.date))
          .map((doc) => ({ ...doc.data(), id: doc.id })),
      )
    })
  }, [formatDate(app?.date)])

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}>
          Mes taches actives du {
            formatDate(app?.date) === formatDate(new Date()) ? 'jour' : formatDate(app?.date)
          }
          
        </Text>
        {todoActive
          .filter((todo) => todo.isCompleted === false)
          .map((todo, index) => (
            <Card
              onPress={() => {}}
              title={todo.title}
              onDelete={() => {
                console.log(todo.id)
              }}
              onEdit={() => {
                           
                navigation.navigate('EditTodo', { title: todo?.title, description: todo?.description, date: todo?.date, id: todo?.id })
            }}
              date={todo.date}
              key={index}
              checked={todo.isCompleted}
              onChange={() => {
                console.log(todo.id)
              }}
            />
          ))}
      </ScrollView>
    </>
  )
}

export default ActiveTodo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
