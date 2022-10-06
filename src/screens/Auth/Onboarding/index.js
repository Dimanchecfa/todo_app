import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Gaming from '../../../../assets/list.png'
import COLORS from '../../../theme/color';
import { AppContext } from '../../../utilities/context/app.context';
import AuthProvider from '../../../utilities/context/auth.context';

const OnboardingScreen = ({navigation}) => {
    const { text } = useContext(AppContext);
    return (
      <>
      <StatusBar backgroundColor={COLORS.themeColor} barStyle="light-content" />
          <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
        <Text
          style={{
           
            fontWeight: 'bold',
            fontSize: 30,
            color: COLORS.themeColor,
          }}>
            BIENVENUE 
        </Text>
        <Text style={{
            fontSize: 20,
            width: 300,
            textAlign: 'center',
            marginTop: 10,
        }}>
           Cliquez sur le bouton commencer pour creer votre compte afin   d'enregistrer vos tâche et y accéder n'importe
            où.

        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
        source={Gaming}
        style={{width: 200, height: 200 , resizeMode:'contain' , transform : [{rotate : '10deg'}]}}
        />
        
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.themeColor,
          padding: 20,
          borderRadius: 10,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
            Commencer 
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
      </>
    )
}

export default OnboardingScreen
