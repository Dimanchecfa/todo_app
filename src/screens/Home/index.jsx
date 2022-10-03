import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../theme/color";
import ActiveTodo from "../ActiveTodo";
import AddTodo from "../AddTodo";
import AllTodo from "../AllTodo";
import CompletedTodo from "../CompletedTodo";
import FavoriteTodo from "../FavoriteTodo";
import useApp from "../../utilities/hook/useApp";
import { formatDate } from "../../services";

const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get("window").height;
const Home = ({navigation}) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const app = useApp();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
   
    app.setDate(date);
    console.log(formatDate(date));
    hideDatePicker();
  };

  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header_left}>
          <IconButton
            icon={() => <Icon name="calendar" size={24} color={COLORS.black} />}
            onPress={showDatePicker}
          />
        </View>
        <View style={styles.header_center}>
          <Image
            source={require("../../../assets/sph.png")}
            style={{
              width: 15,
              height: 30,
              resizeMode: "contain",
              borderRadius: 25,
            }}
          />
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Todo List
          </Text>
        </View>
        <View>
          <IconButton
            icon={() => <Icon name="account" size={24} color={COLORS.black} />}
            onPress={() => {}}
          />
        </View>
      </SafeAreaView>
      <View style={styles.body}>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      </View>






      <Tab.Navigator

        initialRouteName={"Add"}
        screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
         tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "account" : "account-outline";
            } else if (route.name === "AllTodo") {
              iconName = focused
                ? "format-list-bulleted"
                : "format-list-bulleted";
            } else if (route.name === "ActiveTodo") {
              iconName = focused
                ? "format-list-bulleted"
                : "format-list-bulleted";
            } else if (route.name === "CompletedTodo") {
              iconName = focused ? "check" : "check";
            } else if (route.name === "FavoriteTodo") {
              iconName = focused ? "heart" : "heart-outline";
            }
            return <Icon name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: COLORS.blue,
          tabBarInactiveTintColor: COLORS.black,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            elevation: 0,
            marginHorizontal: 15,
            right: 20,

            borderRadius: 15,
            maxHeight: 100,
            height: 70,
            ...styles.shadow,
          },
        })}
      >
        <Tab.Screen
          name="AllTodo"
          component={AllTodo}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ActiveTodo"
          component={ActiveTodo}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={"Add"}
          component={AddTodo}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={"plus"}
                size={45}
                color={focused ? COLORS.white : COLORS.white}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} onPress={() => {
                navigation.navigate("Add")
            }} />,
          }}
        />
        <Tab.Screen
          name="CompletedTodo"
          component={CompletedTodo}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="FavoriteTodo"
          component={FavoriteTodo}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    display: "flex",
    height: HEIGHT * 0.14,
    flexDirection: "row",
    boxShadow: "10px 10px 10px #000",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  header_center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    marginTop: 80,
    paddingHorizontal: 10,
  },
  body_text: {
    fontSize: 15,
    color: COLORS.black,
    justifyContent: "center",
    alignContent: "center",
  },
  body_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.white,
    height: HEIGHT * 0.18,
    borderRadius: 10,
    boxShadow: "10px 10px 10px #000",
  },
  header: {
    width: "60%",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.58,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
const CustomTabBarButton = ({ children , onPress}) => (
    <TouchableOpacity
        style={{
          top: -30,
          justifyContent: "center",
          alignItems: "center",
          ...styles.shadow,
        }}
        onPress={onPress}
    >
      <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: COLORS.green
          }}
      >
        {children}
      </View>
    </TouchableOpacity>
);
