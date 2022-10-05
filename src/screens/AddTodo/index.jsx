import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import Input from '../../components/Input'
import COLORS from '../../theme/color'
import { HEIGHT } from 'react-native-toast-message/lib/src/components/BaseToast.styles'
import Button from '../../components/Button'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { auth, db } from '../../utilities/firebase/firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import Loader from '../../components/Loader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DissmissKeyBoard from '../../components/KeyBoardDismiss'
import DateInput from '../../components/DateInput'
import Carde from '../../components/Carde'
import { formatDate } from '../../services'

const AddTodo = () => {
  const [date, setDate] = useState(formatDate(new Date()))
  const [loading, setLoading] = React.useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [error, setError] = React.useState({})
  const [inputs, setInputs] = React.useState({
    title: '',
    description: '',
    date: '',
    isCompleted: false,
    isFavorite: false,
  })
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (dates) => {
    hideDatePicker()
    setDate(formatDate(dates))
    console.log(date)
  }
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }))
  }
  const handleErrors = (error, input) => {
    setError((prevState) => ({ ...prevState, [input]: error }))
  }
  const validate = async () => {
    setLoading(true)
    Keyboard.dismiss()
    const { title, isCompleted, isFavorite, description } = inputs
    let error = {}
    if (!title) {
      error = {
        title: !title ? 'Le titre est requis' : '',
      }
      return setError(error);
    }
    const todo = {
      title,
      description,
      isCompleted: false,
      isFavorite: false,
      time: date,
      dates: new Date().toISOString(),
    }

    console.log(todo)
    try {
      await addDoc(collection(db, 'todo'), todo)
      setLoading(false)
      setInputs(
        (inputs.title = ''),
        (inputs.description = ''),
        (inputs.date = ''),
      )
      
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <>
      <DissmissKeyBoard>
        <View style={styles.container}>
          <Text style={styles.text}>Ajouter une tâche</Text>
          <View style={styles.view}>
            <Input
              placeholder="Ajouter un titre"
              value={inputs.title}
              label={'Titre'}
              onChangeText={(text) => handleOnchange(text, 'title')}
              error={error.title}
              onBlur={() => handleErrors('', 'title')}
            />

            <Input
              placeholder="Prendre des notes"
              iconName="text"
              label="Description"
              value={inputs.description}
              onChangeText={(text) => handleOnchange(text, 'description')}
              onBlur={() => handleErrors('', 'description')}
              error={error.description}
              isMultiline={true}
            />
            <Text style={styles.label}>Date</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>{date}</Text>
              <TouchableOpacity style={styles.icon} onPress={showDatePicker}>
                <Icon
                  name="calendar"
                  size={25}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }} 
                />
              </TouchableOpacity>
            </View>

            <Button title={'Ajouter'} onPress={validate} />
          </View>
          <Loader visible={loading} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </DissmissKeyBoard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    height: HEIGHT,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  view: {
    marginTop: 20,

    flex: 1,

    width: '100%',
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    borderRadius: 10,
    height: 50,
  },
  textInput: {
    fontSize: 18,
    width: '80%',
    marginLeft: 20,
  },

  label: {
    fontSize: 14,
    color: COLORS.greyish,
  },
})

export default AddTodo
