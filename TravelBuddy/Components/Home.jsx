import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import HeroSec from './homesegments/HeroSec';
import DestinationSec from './homesegments/DestinationSec';
import CatagorySec from './homesegments/CatagorySec';
import Packages from './Packages';
import PackageDetailsScreen from './PackageDetails';
import PackagesSec from './homesegments/PackagesSec';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeroSec />
      <DestinationSec />
      <CatagorySec />
      <PackagesSec />
      <View style={styles.buttonContainer}>
        <Button
          title="View All Packages"
          onPress={() => navigation.navigate('Packages')}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  buttonContainer: {
    margin: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
