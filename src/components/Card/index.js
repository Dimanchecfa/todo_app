import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({
    onPress , title , onDelete , onEdit
}) => {
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
              onValueChange={() => setChecked(!checked)}
            />
          </View>
          <View style={styles.card_header2}>
            <Text style={styles.card_header_text}>
              {title}
            </Text>
            <View style={styles.card_header2_footer}>
              <Text style={styles.card_header_text}>
                {date}
              </Text>
            </View>
          </View>
          <View style={styles.card_left}>
            <IconButton
              icon={(props) => <Icon name="delete" {...props} />}
              color="red"
              onPress={onDelete}
            />
            <IconButton
              icon={(props) => <Icon name="pencil" {...props} />}
              color="red"
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
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        marginTop: 50,
    
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
        backgroundColor: COLORS.white,
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
