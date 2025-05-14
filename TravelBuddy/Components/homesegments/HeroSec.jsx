// import { StyleSheet, Text, View, ImageBackground } from "react-native";
// import React from "react";
// const banner = require('../Assets/banner.jpg');

// const HeroSec = () => {

//     // const navigation = useNavigation();

//     return (
//          <ImageBackground source={banner} style={styles.background} resizeMode="cover">
//       <View style={styles.overlay}>
//         <Text>Discover Your Dream Destination</Text>
//       </View>
//     </ImageBackground>
//     );
// };

// export default HeroSec;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: 600,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });


import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const banner = require('../Assets/banner.jpg');

const HeroSec = () => {
  return (
    <ImageBackground source={banner} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.heroText}>Discover Your Dream Destination</Text>
         <Text style={styles.text}>Explore the world's most beautiful places and create unforgettable memories.</Text>
      </View>
     </ImageBackground>
  );
};

export default HeroSec;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderRadius: 10,
  },
  heroText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
});
