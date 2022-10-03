import { createContext, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/firebase.config'

const AppContext = createContext(null)

const AppProvider = ({ children }) => {
  const [isSplash, setIsSplash] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  const [date, setDate] = useState(new Date())
  const register = (user) => {
    try {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName: user.nom,
          });
        });
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  };
  

  const value = {
    isSplash,
    setIsSplash,
    user,
    setUser,
    register,
    date,
    setDate,
    isAuth,
    setIsAuth,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export { AppContext, AppProvider }
