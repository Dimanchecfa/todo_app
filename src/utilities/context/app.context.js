import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { set } from 'react-native-reanimated'
import { auth } from '../firebase/firebase.config'

const AppContext = createContext(null)

const AppProvider = ({ children }) => {
 const [date, setDate] = useState(new Date())
  
 
  

  const value = {
    date,
    setDate,

  }

  return (
  <AppContext.Provider value={value} >{children}</AppContext.Provider>
  )
}
export { AppContext, AppProvider }
