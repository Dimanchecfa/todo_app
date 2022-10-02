import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
} from 'react-native'
import { IconButton, Switch } from '@react-native-material/core'
import COLORS from '../../theme/color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HEIGHT = Dimensions.get('window').height
const Card = ({
  onPress,
  title,
  onDelete,
  onEdit,
  date,
  checked,
  onChange,
  description,
  handleLiked,
  isFavorite,
}) => {
 
  const dateFormat = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24))

    if (days === 0) {
      return "Aujourd'hui"
    } else if (days === 1) {
      return 'Il y a 1 jour'
    } else if (days > 1) {
      return `Il y a ${days} jours`
    }
  }
  const textFormat = (text) => {
    if (text.length > 50) {
      return text.slice(0, 50) + '...' 
    } else {
      return text
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 8,
      }}
    >
      <View style={styles.card}>
        <View style={styles.card_header}>
          <Switch value={checked} onValueChange={onChange}
            style={{ marginLeft: 10 , marginBottom: 10}}
          />
          <Pressable
            onPress={handleLiked}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 27,
              marginLeft: 10,
            }}
          >
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={32}
              color={isFavorite ? COLORS.red : COLORS.grey}
              
            />
          </Pressable>
        </View>
        <View style={styles.card_header2}>
          <View style={styles.card_header_header}>
            <Text style={styles.card_title}>{title}</Text>
            <Text style={styles.card_header_text}>{textFormat(description)}</Text>
          </View>
          <View style={styles.card_header2_footer}>
            <Text style={styles.card_header_text}>{dateFormat(date)}</Text>
          </View>
        </View>
        <View style={styles.card_left}>
          <TouchableOpacity onPress={onDelete}>
            <MaterialCommunityIcons
              name={'pencil'}
              size={24}
              color={COLORS.green}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onEdit}>
            <MaterialCommunityIcons
              name={'delete'}
              size={24}
              color={COLORS.green}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginHorizontal: '5%',
    height: HEIGHT * 0.16,
    backgroundColor: 'white',
    borderRadius: 5,

    display: 'flex',
    flexDirection: 'row',
  },
  card_header: {
    width: '15%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card_header2: {
    marginTop: 15,
    marginLeft: 5,
    width: '65%',
    height: '100%',
  },

  card_header2_footer: {
    width: '65%',
    height: '25%',

    marginTop: 12,

    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderColor: COLORS.green,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_left: {
    width: '12%',
    height: '100%',
    marginLeft: 20,
    justifyContent: 'space-around',
  },

  card_header_header: {
    width: '100%',
    height: '50%',
    
  },
  card_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card_header_text: {
    fontSize: 17,
  }
})

export default Card
