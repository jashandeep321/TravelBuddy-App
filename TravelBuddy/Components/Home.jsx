// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import LoaderKit from "react-native-loader-kit";
// import Login from './user/Login'
// import AllDestinations from "./AllDestinations";
// import { TouchableOpacity, Text as RNText } from 'react-native';
// import { useNavigation } from '@react-navigation/native'

// const Home = () => {

//     const navigation = useNavigation();

//   return (
//     <View style={styles.container}>

//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 600, 
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={{ uri: 'https://cdn.pixabay.com/video/2020/08/14/47213-451041047_tiny.mp4' }} // Replace with actual travel HD video URL
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Packages')}
        >
          <Text style={styles.buttonText}>Packages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 60 : 30, // Adjust for notch
    paddingRight: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
});
