import React, { useEffect } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { onSnapshot, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../utilities/firebase/firebase.config'
import Card from '../../components/Card'
import { deleteTodo, formatDate, handleFavorite, handleToggle } from '../../services'
import useApp from '../../utilities/hook/useApp'

const FavoriteTodo = () => {
  const app = useApp()
  const [todoFavorite, setTodoFavorite] = React.useState([])
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodoFavorite(
        snapshot.docs.filter((todo) => formatDate(todo.date) === formatDate(app?.date) && todo.isFavorite === true)
        .map((doc) => ({ ...doc.data(), id: doc.id })),
      )
    })
    console.log(todoFavorite)
  }, [formatDate(app?.date)])

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 30 }}>
          Mes Tâches favoris du{' '}
          {formatDate(app?.date) !== formatDate(new Date())
            ? formatDate(app?.date)
            : 'jour'}
        </Text>
        {todoFavorite
          .map((todo, index) => (
            <Card
              onPress={() => {}}
              title={todo.title}
              onDelete={() => deleteTodo(todo)}
              onEdit={() => {
                           
                navigation.navigate('EditTodo', { title: todo?.title, description: todo?.description, date: todo?.date, id: todo?.id })
            }}
              date={todo.date}
              key={index}
              checked={todo.isCompleted}
              onChange={() => handleToggle(todo)}
              description={todo.description}
              isFavorite={todo.isFavorite}
              handleLiked={() => handleFavorite(todo)}
            />
          ))}
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default FavoriteTodo
