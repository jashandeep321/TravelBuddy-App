import React, { useState } from 'react';
import { View,Text,Switch, StyleSheet,SafeAreaView,TextInput, StatusBar, Image , Button,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback} from "react-native";
import { useColorScheme } from "react-native";
import StackWrapper from './Components/StackWrapper';
import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Nav from './Components/Tabbar/Nav'
import Welcome from './Components/Welcome';

const App=()=>{
// const [switchState,setSwitchState]=useState(true);
return(
   <StackWrapper/>
//   <>
// <NavigationContainer>
//   <Welcome/>
//       {/* <Nav /> */}
//     </NavigationContainer>
//   <>
//   {/* <StackWrapper/> */}
//    {/* <Text>hi</Text> */}
   
//    {/* <AllDestinations/> */}
//   </>
//   </>
);
}

export default App;


// //cd android     ./gradlew clean
// // ./gradlew assemblerelease



