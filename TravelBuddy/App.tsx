import React, { useState } from 'react';
import { View,Text,Switch, StyleSheet,SafeAreaView,TextInput, StatusBar, Image , Button,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback} from "react-native";
import { useColorScheme } from "react-native";
import StackWrapper from './Components/StackWrapper';
import { Auth0Provider } from 'react-native-auth0';

const App=()=>{
// const [switchState,setSwitchState]=useState(true);
return(
  
  <Auth0Provider
      domain={'dev-o63qrewp2pkenlpm.us.auth0.com'}
      clientId={'OwFuoyoUleiBAbScnFRLEy4955gVPs5h'}>
      <StackWrapper />
    </Auth0Provider>
);
}

export default App;