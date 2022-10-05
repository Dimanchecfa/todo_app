import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from '../../services';
import COLORS from '../../theme/color';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const DateInput = ({
  label,
  iconName,
  error,
  date,
  dates,
  
  
  onFocus = () => {},
  ...props
}) => {
 
  const [isFocused, setIsFocused] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dates) => {
   
    
    hideDatePicker();
    console.log(dates);

  };
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.tint
              : COLORS.greyish,
            alignItems: 'center',
          },
        ]}>
        
        <Text
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          value={date}
          onBlur={() => setIsFocused(false)}
          style={{color: COLORS.darkBlue, flex: 1}}
          {...props}
        >
          
        </Text>
       
            <Icon
            onPress={showDatePicker}
            name={ 'calendar'}
            style={{color: COLORS.black, fontSize: 22}}

          />
       
      
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
     <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default DateInput;