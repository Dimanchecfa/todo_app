import { AppBar } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import Splash from './src/screens/Splash';
import { AppProvider } from './src/utilities/context/app.context';
import useApp from './src/utilities/hook/useApp';

export default function App() {
 
  


  return (
  
    
    <AppProvider>
       <StackNavigation /> 
    </AppProvider>
      
    
       
    
    
      
     
      
     
  
  );
}


