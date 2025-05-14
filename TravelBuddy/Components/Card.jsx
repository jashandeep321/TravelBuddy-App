// import React from 'react';
// import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Slug from './Slug';

// const Card = ({destination}) => {
//   const navigation = useNavigation();

//   //   console.log(destination);

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('Slug', {destination})}>
//       {/* pass data to Slug.jsx */}
//       <Image source={{uri: destination.baseImages[0]}} style={styles.image} />
//       <Text style={styles.title}>{destination.name}</Text>
//       <Text style={styles.subtitle}>{destination.location}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     marginBottom: 15,
//     borderRadius: 10,
//     backgroundColor: '#f9f9f9',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     padding: 10,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginLeft: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: 'gray',
//      marginLeft: 5,
//      marginTop: 3,
//   },
// });

// export default Card;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon for the wishlist button
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slug from './Slug';
const Card = ({ destination }) => {
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState([]);

  // Load the wishlist from AsyncStorage when the component mounts
  useEffect(() => {
    const loadWishlist = async () => {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    };
    loadWishlist();
  }, []);

  const addToWishlist = async (destination) => {
    // Check if destination is already in the wishlist
    if (wishlist.find((item) => item.id === destination.id)) {
      Alert.alert('Already in Wishlist', 'This destination is already in your wishlist.');
      return;
    }

    const updatedWishlist = [...wishlist, destination];
    setWishlist(updatedWishlist);

    // Save updated wishlist to AsyncStorage
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    Alert.alert('Added to Wishlist', 'This destination has been added to your wishlist!');
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Slug', { destination })}>
      {/* pass data to Slug.jsx */}
      <Image source={{ uri: destination.baseImages[0] }} style={styles.image} />
      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.subtitle}>{destination.location}</Text>

      {/* Wishlist Icon */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => addToWishlist(destination)}>
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
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
    position: 'relative', // Needed to position the icon inside the card
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
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    elevation: 5, // Shadow for the icon
    borderWidth: 1, // Light border around the icon for visibility
    borderColor: '#ddd', // Border color
  },
});

export default Card;
