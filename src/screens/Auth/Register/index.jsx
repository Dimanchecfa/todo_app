import { Text } from '@react-native-material/core'
import React from 'react'
import { Image } from 'react-native'
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import COLORS from '../../../theme/color'
import useApp from '../../../utilities/hook/useApp'
import GoogleSVG from '../../../../assets/gg.png'
import FacebookSVG from '../../../../assets/facebook.png'
import GithubSVG from '../../../../assets/github.png'
import { auth } from '../../../utilities/firebase/firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HEIGHT = Dimensions.get('window').height
const Register = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    nom: '',
    email: '',
    password: '',
  })

  const [loading, setloading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }))
  }

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }))
  }
  const validate = async () => {
    const { nom, email, password } = inputs

    let error = {}
    if (!nom || !email || !password) {
      error = {
        nom: !nom ? 'Votre nom est requis' : '',
        email: !email ? 'Votre email est requis' : '',
        password: !password ? 'Votre mot de passe est requis' : '',
      }
      return setErrors(error)
    } else {
      if (!email.includes('@') || !email.includes('.') || password.length < 6) {
        error = {
          email: 'Votre email est invalide',
          password: 'Votre mot de passe doit contenir au moins 6 caractères',
        }
        return setErrors(error)
      }
    }

    const user = {
      nom,
      email,
      password,
    }
    setloading(true)

    try {
    await  auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then( (userAuth) => {
         userAuth.user.updateProfile({
            displayName: user.nom,
          })
          const userData = {
            nom: userAuth.user.displayName,
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          }
          AsyncStorage.setItem('user', JSON.stringify(userData))
         
        })
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Input
              onChangeText={(text) => handleOnchange(text, 'nom')}
              onFocus={() => handleError(null, 'nom')}
              iconName="account-outline"
              label="Nom complet"
              placeholder="Enter votre nom complet"
              error={errors.nom}
              value={inputs.nom}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              placeholder="Entrer votre adresse email"
              error={errors.email}
              value={inputs.email}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              error={errors.password}
              password
              value={inputs.password}
            />
            <Button title="S'inscrire" onPress={validate} />
            <Text>
              J'ai deja un compte!{' '}
              <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                  color: COLORS.themeColor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Se connecter
              </Text>
            </Text>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
            Ou inscrivez-vous avec
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              marginTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Image source={GoogleSVG} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Image source={FacebookSVG} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#ddd',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Image source={GithubSVG} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        <Loader visible={loading} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    height: HEIGHT,
    width: '100%',
  },
  header: {
    marginTop: 80,
    width: '100%',
    paddingHorizontal: 30,
  },
  area: {
    backgroundColor: '#ffffff',
    height: HEIGHT / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  area_text: {
    fontSize: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
})

export default Register
