import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditTodo from '../screens/EditTodo'
import Home from '../screens/Home'
import useApp from '../utilities/hook/useApp'
import AddTodo from '../screens/AddTodo'
import ProfilScreen from '../screens/ProfilScreen'
import COLORS from '../theme/color'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import OnboardingScreen from '../screens/Auth/Onboarding'
import { useEffect, useState } from 'react'
import { auth } from '../utilities/firebase/firebase.config'
import Loader from '../components/Loader'
import { Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppStack = () => {
  const [isAuth, setIsAuth] = useState(undefined)

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('user')
    auth.onAuthStateChanged((user) => {
      if(userData) {
        return setIsAuth(true)
      } 
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(null)
      }
    })
  }

  useEffect(() => {
    (() => getUser())();
    
  }, [isAuth])
  return (
    <Stack.Navigator>
      {isAuth ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Modification',
              headerTitleAlign: 'center',
            }}
            name="EditTodo"
            component={EditTodo}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Ajout',
              headerTitleAlign: 'center',
            }}
            name="AddTodo"
            component={AddTodo}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Profil"
            component={ProfilScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerStyle: {
                backgroundColor: COLORS.themeColor,
                color: COLORS.white,
              },
              headerTitleAlign: 'center',
              headerTintColor: COLORS.white,
              headerTitle: 'Connexion',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerStyle: {
                backgroundColor: COLORS.themeColor,
                color: COLORS.white,
              },
              headerTitleAlign: 'center',
              headerTintColor: COLORS.white,
              headerTitle: 'Inscription',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppStack
