import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../../theme/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const colors = {
  themeColor: '#4263ec',
  white: '#fff',
  background: '#f4f6fc',
  greyish: '#a4a4a4',
  tint: '#2b49c3',
}
const Input = ({
  label,
  iconName,
  error,
  password,
  isMultiline,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? COLORS.red : isFocused ? colors.tint : colors.greyish,
            alignItems: isMultiline ? 'flex-start' : 'center',
            height: isMultiline ? 100 : 50,
            borderRadius : isMultiline ? 10 : 10,
            borderWidth : 1,
            width : '100%',
          },
        ]}>
        {
          !isMultiline && (
            <Icon
          name={iconName}
          style={{color: COLORS.black, fontSize: 22, marginRight: 10}}
        />
          )
        }
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(!isFocused)}
          secureTextEntry={hidePassword}
          multiline={isMultiline}
          numberOfLines={isMultiline ? 5 : 1}

         
          style={{color: COLORS.black, fontSize: 18, width: '100%'}}

          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.black, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
   
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 0.5,
  },
});

export default Input;

