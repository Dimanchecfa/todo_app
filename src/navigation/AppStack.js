import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditTodo from "../screens/EditTodo";
import Home from "../screens/Home";
import useApp from "../utilities/hook/useApp";
import AddTodo from "../screens/AddTodo";
import ProfilScreen from "../screens/ProfilScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const app = useApp();
  return (
   
      
        <Stack.Navigator>
          
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
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
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Profil",
              headerTintColor: "white",
             

            }}
            name="Profil"
            component={ProfilScreen}
          />
        </Stack.Navigator>
     
    
  );
}

          


export default AppStack;
