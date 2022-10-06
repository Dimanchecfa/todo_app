
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import Loader from './src/components/Loader';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import { AppContext, AppProvider } from './src/utilities/context/app.context'
import { auth } from './src/utilities/firebase/firebase.config';
import useApp from './src/utilities/hook/useApp'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function App() {
  
  const {userInfo ,  setUserInfo } = useApp;

  const getUser = async () => {
    const user = await AsyncStorage.removeItem('user');
    console.log(user);
    if (user) {
    setUserInfo(user);
      console.log(userInfo);
    }
  };
  useEffect(() => {
   (async () => getUser())();
    
  }, [userInfo]);

  
  

 
 
  
  

  return (
   <NavigationContainer>
     <AppProvider>
        {
          !userInfo == null ? <AppStack /> : <AuthStack />
        }
        
    </AppProvider>
   
   </NavigationContainer>
   
    
  )
}
