import React from "react";
import {View, StyleSheet, TouchableOpacity, Text, Dimensions, Pressable} from "react-native";
import {IconButton, Switch} from "@react-native-material/core";
import COLORS from "../../theme/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HEIGHT = Dimensions.get("window").height;
const Card = ({
    onPress , title , onDelete , onEdit , date , checked , onChange
}) => {

    const [liked , setLiked] = React.useState(false);
    const dateFormat = (date) => {
        let days = Math.floor((new Date() - new Date(date)) /(1000 *3600 *24));


    if (days === 0) {
        return "Aujourd'hui";
    }
    else if (days === 1) {
        return "Il y a 1 jour";
    }
    else if (days > 1) {
        return `Il y a ${days} jours`;
    }
    }

  return (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={{
          width: "100%",
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <View style={styles.card}>
          <View style={styles.card_header}>
            <Switch

              value={checked}
              onValueChange={onChange}
            />
              <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={{flexDirection: "row", alignItems: "center" , marginTop:15}}>
                  <MaterialCommunityIcons
                      name={liked ? "heart" : "heart-outline"}
                      size={32}
                      color={liked ? "green" : "black"}
                  />
              </Pressable>
          </View>
          <View style={styles.card_header2}>
            <Text style={styles.card_header_text}>
              {title}
            </Text>
            <View style={styles.card_header2_footer}>
              <Text style={styles.card_header_text}>
                {dateFormat(date)}
              </Text>
            </View>
          </View>
          <View style={styles.card_left}>
            <IconButton
              icon={(props) => <MaterialCommunityIcons name={"pencil"} {...props} />}
              color={COLORS.black}
              onPress={onDelete}
            />
            <IconButton
              icon={(props) =><MaterialCommunityIcons name={"delete"} {...props} />}
              color={COLORS.black}
                onPress={onEdit}
            />
          </View>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
        width: "90%",
        marginHorizontal: "5%",
        height: HEIGHT * 0.15,
        backgroundColor: "white",
        borderRadius: 5,

    
        display: "flex",
        flexDirection: "row",
      },
      card_header: {
        width: "15%",
        height: "100%",
      },
      card_header2: {
        marginTop: 15,
        marginLeft: 5,
        width: "68%",
        height: "100%",
      },
      card_header_text: {
        fontSize: 15,
        height: "50%",
      },
      card_header2_footer: {
        width: "78%",
        height: "30%",
        backgroundColor: COLORS.gray,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      },
      card_left: {
        width: "12%",
        height: "100%",
      },
});

export default Card;
