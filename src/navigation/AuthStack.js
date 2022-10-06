import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import COLORS from '../theme/color';
import OnboardingScreen from '../screens/Auth/Onboarding';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Login" component={Login} options={{
                headerStyle: {
                    backgroundColor: COLORS.themeColor,
                    color : COLORS.white
                },
                headerTitleAlign: 'center',
                headerTintColor: COLORS.white,
                headerTitle : 'Connexion'
            }}/>
            <Stack.Screen name="Register" component={Register} options={{
                headerStyle: {
                    backgroundColor: COLORS.themeColor,
                    color : COLORS.white
                },
                headerTitleAlign: 'center',
                headerTintColor: COLORS.white,
                headerTitle : 'Inscription'
            }}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
             headerShown : false
            }}
            
            />
        </Stack.Navigator>
    )
}

 

export default AuthStack
