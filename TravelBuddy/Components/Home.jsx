import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'
import HeroSec from "./homesegments/HeroSec";
import DestinationSec from "./homesegments/DestinationSec";
import CatagorySec from "./homesegments/CatagorySec";
const Home = () => {

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeroSec />
      <DestinationSec />
      <CatagorySec/>
      <Text style={styles.footerText}>Home</Text>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {

    backgroundColor:"white"
  },
});