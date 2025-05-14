import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Slug from './Slug';

const Card = ({destination}) => {
  const navigation = useNavigation();

  //   console.log(destination);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Slug', {destination})}>
      {/* pass data to Slug.jsx */}
      <Image source={{uri: destination.baseImages[0]}} style={styles.image} />
      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.subtitle}>{destination.location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
     marginLeft: 5,
     marginTop: 3,
  },
});

export default Card;
