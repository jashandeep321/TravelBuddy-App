// import React, {useState, useEffect} from 'react';
// import {ScrollView, StyleSheet} from 'react-native';
// import Card from './Card';
// import Loader from './Loader';

// const AllDestinations = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch data from the provided API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations',
//         );
//         const data = await response.json();
//         setDestinations(data); // Pass data
//       } catch (error) {
//         console.error('Error fetching destinations:', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetch is complete
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <Loader />; // Show Loader while data is being fetched
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {destinations.map(destination => (
//         <Card key={destination._id} destination={destination} />
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
// });

// export default AllDestinations;


import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './Card'; // Import the Card component

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations'
        );
        const data = await response.json();
        setDestinations(data); // Set the destination data
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false); // Stop the loader after data is fetched
      }
    };

    fetchData();

    // Load the wishlist from AsyncStorage
    const loadWishlist = async () => {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    };
    loadWishlist();
  }, []);

 const addToWishlist = async (destination) => {
  try {
    const savedWishlist = await AsyncStorage.getItem('wishlist');
    const wishlistArray = savedWishlist ? JSON.parse(savedWishlist) : [];

    const itemId = destination._id || destination.id;

    if (!itemId) {
      console.warn('Trying to add to wishlist without an ID:', destination);
      return; // skip adding item without an ID
    }

    // Check if item already exists
    const alreadyExists = wishlistArray.some(item => item.id === itemId);

    if (!alreadyExists) {
      const newWishlist = [
        ...wishlistArray,
        {
          id: itemId,
          name: destination.name,
          image: destination.bannerImage || destination.image,
          location: destination.location,
          // other fields if needed
        },
      ];

      await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlist(newWishlist);
    }
  } catch (error) {
    console.error('Failed to add to wishlist', error);
  }
};


  return (
    <ScrollView style={styles.container}>
      {destinations.map((destination) => (
        <Card
          key={destination._id}
          destination={destination}
          addToWishlist={addToWishlist} // Pass the addToWishlist function to Card
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AllDestinations;
