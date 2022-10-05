import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
} from 'react-native'
import { Switch } from '@react-native-material/core';
import COLORS from '../../theme/color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDescription, formatdescription, formatTitle} from "../../services";
const HEIGHT = Dimensions.get('window').height;
const Card = ({
  title,
  onDelete,
  date,
  onEdit,
  checked,
  onChange,
  description,
}) => {
 
  const dateFormat = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24))
    if(days == 0){
      return 'il reste 1 jour'
    }else if(days == 0){
      return days * 24 + ' heures'
    }
    else if(days < 0){
      return 'dépassé'
    }
  }


  return (
    <TouchableOpacity
      onPress={onEdit}
      activeOpacity={0.6}
      style={{
        width: '100%',
        marginTop: 8,
        alignItems: 'center',
        borderRadius: 8,
      }}
    >
      <View style={styles.container}>
            <View style={styles.card1}>
                <Text style={styles.title}>
                  {formatTitle(title)}
                </Text>
                <Text style={styles.description}>
                  {formatDescription(description)}
                </Text>
                <Text style={styles.date}>
                  {date}
                </Text>
            </View>
            <View style={styles.card2}>
                <Switch value={checked} onValueChange={onChange} style={{marginLeft: 10, marginBottom: 10}} />
                <TouchableOpacity onPress={onDelete} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialCommunityIcons name={'delete'} size={30} color={COLORS.tint} />
                </TouchableOpacity>
            </View>

            
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor : '#fff',
      flexDirection : 'row',
      marginHorizontal : 20,
      marginVertical : 10,
      borderRadius : 10,
      paddingVertical : 7,
      paddingHorizontal : 10,
      justifyContent : 'space-between',
      elevation : 5,

  },
  title : {
      fontSize : 20,
      fontWeight : 'bold',
     
  },
  description : {
      fontSize : 15,
      color : '#000',
  },
  date : {
      fontSize : 15,
      color : COLORS.greyish,
      marginTop : 20,
      textDecorationLine : 'underline',
  },
  card1 : {
      flexDirection : 'column',
      width : '80%',
      marginLeft : 10,
  },
  card2 : {
      flexDirection : 'column',
      justifyContent : 'space-between',
      alignItems : 'center',
      flex : 1,
  },
  
      


})


export default Card
