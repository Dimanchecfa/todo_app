import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import EditTodo from "../screens/EditTodo";
import Home from "../screens/Home";
import Splash from "../screens/Splash";
import useApp from "../utilities/hook/useApp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AddTodo from "../screens/AddTodo";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  const app = useApp();
  
  
  return (
    <NavigationContainer>
      {app?.isSplash? (
        <Stack.Navigator initialRouteName={app?.isSplash? "Home" : "Login"}>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerTitle: "Modification",
              headerTitleAlign: "center",

            }}
            name="EditTodo"
            component={EditTodo}
          />
          <Stack.Screen
            options={{
              headerTitle: "Ajout",
              headerTitleAlign: "center",
            }}
            name="AddTodo"
            component={AddTodo}
          />
        </Stack.Navigator>
      ) : (
        <Splash />
      )}
    </NavigationContainer>
  );
}

          


export default StackNavigation;
