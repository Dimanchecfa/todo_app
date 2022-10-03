import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Card from '../../components/Card'
import useApp from '../../utilities/hook/useApp'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../utilities/firebase/firebase.config'
import { deleteTodo, formatDate, handleEdit, handleFavorite, handleToggle } from '../../services'
import { format } from 'prettier'
import Spinner from '../../components/Spinner'

const AllTodo = ({ navigation }) => {
  const app = useApp()
  const [todos, setTodos] = React.useState([])
  const [loading , setLoading] = React.useState(true)
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodos(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((task) => formatDate(task.date) == formatDate(app?.date)),
      )
        setLoading(false)


      
    })
   




  }, [formatDate(app?.date)])

  return (
    <>
        {
            loading ? <Spinner /> : ( <ScrollView>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 30 , marginHorizontal: 20 }}>
                 Les tâches du{' '}
                  {formatDate(app?.date) !== formatDate(new Date())
                    ? formatDate(app?.date)
                    : 'jour'}
                </Text>
        
                {todos.length > 0 ? (
                  todos.map((todo, index) => (
                    <Card
                      onPress={() => {}}
                      title={todo?.title}
                      onDelete={() => deleteTodo(todo)}
                        onEdit={() => {
                           
                            console.log(todo)
                            navigation.navigate('EditTodo', { title: todo?.title, description: todo?.description, date: todo?.date, id: todo?.id })
                        }}
                      description={todo?.description}
                      date={todo?.date}
                      key={index}
                      checked={todo?.isCompleted}
                      onChange={() => handleToggle(todo)}
                      isFavorite={todo?.isFavorite}
                      handleLiked={() => handleFavorite(todo)}
                    />
                  ))
                ) : (
                  <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text
                      style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}
                    >
                        Aucune tâche pour le moment
                      
                    </Text>
                  </View>
                )}
              </ScrollView>)

        }
    </>
  )
}

export default AllTodo
