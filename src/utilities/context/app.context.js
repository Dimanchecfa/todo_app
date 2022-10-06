import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { set } from 'react-native-reanimated'
import { auth } from '../firebase/firebase.config'

const AppContext = createContext(null)

const AppProvider = ({ children }) => {
 const [date, setDate] = useState(new Date())
 const [userInfo, setUserInfo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const register = (user) => {
    try {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName: user.nom,
          });
          setUserInfo(userAuth.user.uid);
          const userData = {
            nom: userAuth.user.displayName,
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          };
          AsyncStorage.setItem('user', JSON.stringify(userData));
          setIsLoading(false);

        });
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  };
  const login = (user) => {
    try {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userAuth) => {
          setIsLoading(false);
         const userData = {
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            nom: userAuth.user.displayName,
          };
          setUserInfo(userData);
          AsyncStorage.setItem('user', JSON.stringify(userData));
         
        });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    try {
      auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
 
  

  const value = {
    date,
    setDate,
    register,
    login,
    logout,
    isLoading,
    setIsLoading,
    userInfo,
    setUserInfo,

  }

  return (
  <AppContext.Provider value={{
    date , setDate , register , login , logout , isLoading , setIsLoading , userInfo , setUserInfo
  }} >{children}</AppContext.Provider>
  )
}
export { AppContext, AppProvider }
