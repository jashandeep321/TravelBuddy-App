import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoaderKit from "react-native-loader-kit";
import Login from './user/Login'
import AllDestinations from "./AllDestinations";
import { TouchableOpacity, Text as RNText } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600, 
    justifyContent: "center",
    alignItems: "center",
  },
});
