import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import Loader from './src/components/Loader'
import AppStack from './src/navigation/AppStack'
import { AppProvider } from './src/utilities/context/app.context'

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <AppStack />
      </AppProvider>
    </NavigationContainer>
  )
}
