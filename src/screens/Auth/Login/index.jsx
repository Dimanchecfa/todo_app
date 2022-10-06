import React from 'react'
import {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import COLORS from '../../../theme/color'
import { auth } from '../../../utilities/firebase/firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native'
import GoogleSVG from '../../../../assets/gg.png'
import FacebookSVG from '../../../../assets/facebook.png'
import GithubSVG from '../../../../assets/github.png'
import { Image } from 'react-native'
import useApp from '../../../utilities/hook/useApp'

const HEIGHT = Dimensions.get('window').height
const Login = ({ navigation }) => {
  const app = useApp()
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  })
  const { login, setUser, user } = useApp()
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }))
  }

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }))
  }
  const validate = async (e) => {
    setLoading(true)
    const { email, password } = inputs
    console.log(inputs)
    let error = {}
    if (!email || !password) {
      error = {
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : '',
      }
      return setErrors(error)
    }
    const user = {
      email,
      password,
    }

    try {
      login(user)
      console.log('ok')
      setTimeout(() => {
        setLoading(false)
      }
      , 2000)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.themeColor} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Input
              onChangeText={(text) => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              value={inputs.email}
              placeholder="Entrer votre adresse email"
              error={errors.email}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              error={errors.password}
              value={inputs.password}
              password
            />
            <Button title="Se connecter" onPress={validate} />
            <Text>
              Je n'ai pas de compte !{' '}
              <Text
                onPress={() => navigation.navigate('Register')}
                style={{
                  color: COLORS.themeColor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                S'inscrire
              </Text>
            </Text>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>
            Ou connectez-vous avec
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
              onPress={() => handleGoogleLogin()}
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
      </ScrollView>
      <Loader visible={loading} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
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

export default Login
