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
import COLORS from '../../theme/color'
import Spinner from '../../components/Spinner'

const CompletedTodo = ({ navigation }) => {
  const app = useApp()
  const [todoCompleted, setTodoCompleted] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodoCompleted(
        snapshot.docs
          
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((todo) => todo.time == formatDate(app?.date) && todo.isCompleted == true),
      )
      setLoading(false)
      console.log(todoCompleted)
    })
  }, [formatDate(app?.date)])

  return (
    <>
      {
        loading ? <Spinner /> : ( 
          <ScrollView style={styles.container}>
        <Text
          style={{
            fontSize: 20, marginVertical: 10 , marginHorizontal: 20 ,color : COLORS.black
          }}
        >
          Mes Tâches terminées du{' '}
          {formatDate(app?.date) !== formatDate(new Date())
            ? formatDate(app?.date)
            : 'jour'}
        </Text>
        {
          todoCompleted.length > 0 ? (
            todoCompleted
          
        .map((todo, index) => (
          <Card
            onPress={() => {}}
            title={todo.title}
            description = {todo.description}
            onDelete={() => {
              deleteTodo(todo)
            }}
            onEdit={() => {
              console.log(todo)
              navigation.navigate('EditTodo', {
                title: todo?.title,
                description: todo?.description,
                date: todo?.dates,
                id: todo?.id,
                time: todo?.time,
              })
            }}
            date={todo.time}
            key={index}
            checked={todo.isCompleted}
            onChange={() => {
              handleToogle(todo)
            }}

          />
        )) ) : (
          <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text
                      style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}
                    >
                        Aucune tâche terminée
                      
                    </Text>
                  </View>
        )

        }
      </ScrollView>
        )
      }
    </>
  )
}

export default CompletedTodo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
