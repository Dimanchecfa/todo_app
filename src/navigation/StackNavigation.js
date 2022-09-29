import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import Home from "../screens/Home";
import Splash from "../screens/Splash";
import useApp from "../utilities/hook/useApp";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  const app = useApp();
  return (
    <NavigationContainer>
      {app?.isSplash ? (
        <Stack.Navigator initialRouteName="Home">
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
        </Stack.Navigator>
      ) : (
        <Splash />
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
