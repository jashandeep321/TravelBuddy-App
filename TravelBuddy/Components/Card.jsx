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


// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Icon for the wishlist button
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Slug from './Slug';
// const Card = ({ destination }) => {
//   const navigation = useNavigation();
//   const [wishlist, setWishlist] = useState([]);

//   // Load the wishlist from AsyncStorage when the component mounts
//   useEffect(() => {
//     const loadWishlist = async () => {
//       const savedWishlist = await AsyncStorage.getItem('wishlist');
//       if (savedWishlist) {
//         setWishlist(JSON.parse(savedWishlist));
//       }
//     };
//     loadWishlist();
//   }, []);

//   const addToWishlist = async (destination) => {
//   try {
//     const item = {
//       id: destination._id, // Make sure this is unique
//       name: destination.name,
//       image: destination.baseImages[0],
//       location: destination.location
//     };
    
//     const currentWishlist = await AsyncStorage.getItem('wishlist');
//     const parsedWishlist = currentWishlist ? JSON.parse(currentWishlist) : [];
    
//     if (!parsedWishlist.some(i => i.id === item.id)) {
//       const updatedWishlist = [...parsedWishlist, item];
//       await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       Alert.alert('Added to wishlist!');
//     }
//   } catch (error) {
//     console.error('Error saving to wishlist', error);
//   }
// };

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('Slug', { destination })}>
//       {/* pass data to Slug.jsx */}
//       <Image source={{ uri: destination.baseImages[0] }} style={styles.image} />
//       <Text style={styles.title}>{destination.name}</Text>
//       <Text style={styles.subtitle}>{destination.location}</Text>

//       {/* Wishlist Icon */}
//       <TouchableOpacity
//         style={styles.iconContainer}
//         onPress={() => addToWishlist(destination)}>
//         <Icon name="heart" size={30} color="red" />
//       </TouchableOpacity>
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
//     position: 'relative', // Needed to position the icon inside the card
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
//     marginLeft: 5,
//     marginTop: 3,
//   },
//   iconContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 30,
//     elevation: 5, // Shadow for the icon
//     borderWidth: 1, // Light border around the icon for visibility
//     borderColor: '#ddd', // Border color
//   },
// });

// export default Card;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ destination }) => {
  const navigation = useNavigation();
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if item is in wishlist on load
  useEffect(() => {
    const checkWishlist = async () => {
      const wishlist = await AsyncStorage.getItem('wishlist');
      if (wishlist) {
        const parsedWishlist = JSON.parse(wishlist);
        setIsInWishlist(parsedWishlist.some(item => item.id === destination.id));
      }
    };
    checkWishlist();
  }, [destination.id]);

  const toggleWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlist');
      let updatedWishlist = wishlist ? JSON.parse(wishlist) : [];
      
      if (isInWishlist) {
        updatedWishlist = updatedWishlist.filter(item => item.id !== destination.id);
      } else {
        updatedWishlist.push({
          id: destination.id,
          name: destination.name,
          image: destination.baseImages[0],
          location: destination.location
        });
      }
      
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Slug', { destination })}
    >
      <Image source={{ uri: destination.baseImages[0] }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.subtitle}>{destination.location}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.heartButton}
        onPress={(e) => {
          e.stopPropagation(); // Prevent card navigation
          toggleWishlist();
        }}
      >
        <Icon 
          name="heart" 
          size={24} 
          color={isInWishlist ? 'red' : '#ccc'} 
          style={styles.heartIcon}
        />
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
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 3,
  },
  heartButton: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default Card;