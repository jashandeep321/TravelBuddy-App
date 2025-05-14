import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'
<<<<<<< HEAD
import { Button } from 'react-native';


=======
import HeroSec from "./homesegments/HeroSec";
import DestinationSec from "./homesegments/DestinationSec";
import CatagorySec from "./homesegments/CatagorySec";
>>>>>>> de0154fee9b24ee606a1c10ea4b3313b894e034c
const Home = () => {

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Button title="Go to Wishlist" onPress={() => navigation.navigate('Wishlist')} />
      <Text>Home</Text>
         <Button title="Go to Packages" onPress={() => navigation.navigate('Packages')} />
    </View>
=======
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeroSec />
      <DestinationSec />
      <CatagorySec/>
      <Text style={styles.footerText}>Home</Text>
    </ScrollView>
>>>>>>> de0154fee9b24ee606a1c10ea4b3313b894e034c
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {

    backgroundColor:"white"
  },
});