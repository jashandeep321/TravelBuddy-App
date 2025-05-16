// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Wishlist = ({ navigation }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [imageError, setImageError] = useState({});
//   const [loadingImages, setLoadingImages] = useState({});

//   useEffect(() => {
//     const loadWishlist = async () => {
//       try {
//         const savedWishlist = await AsyncStorage.getItem('wishlist');
//         if (savedWishlist) {
//           const parsedWishlist = JSON.parse(savedWishlist);
//           console.log("Wishlist Data:", parsedWishlist);
//           setWishlist(parsedWishlist);
//           console.log('Raw AsyncStorage data:', savedWishlist);
//         }
//       } catch (error) {
//         console.error('Error loading wishlist:', error);
//       }
//     };
//     loadWishlist();
//   }, []);

//   const removeFromWishlist = async (itemKey) => {
//     try {
//       const updatedWishlist = wishlist.filter(item => (item.id || item._id) !== itemKey);
//       setWishlist(updatedWishlist);
//       await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//     } catch (error) {
//       console.error('Failed to remove item', error);
//     }
//   };

//   // In Wishlist.js, modify navigateToSlug:
// const navigateToSlug = async (item) => {
//   const itemId = item.id || item._id;

//   if (!itemId) {
//     console.warn('Cannot navigate - item missing ID:', item);
//     return;
//   }

//   try {
//     // Fetch fresh data from API
//     const response = await fetch(
//       `https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations/${itemId}`
//     );

//     if (!response.ok) throw new Error('Failed to fetch');

//     const freshData = await response.json();
//     navigation.navigate('Slug', { destination: freshData });

//   } catch (error) {
//     console.error('Using fallback data due to:', error);
//     // Fallback to minimal stored data if API fails
//     navigation.navigate('Slug', { 
//       destination: {
//         ...item,
//         bannerImage: item.image,
//         baseImages: [item.image],
//         description: "Description not available (offline mode)",
//         // Add other required fields with fallbacks
//       }
//     });
//   }
// };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Wishlist</Text>

//       {wishlist.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Icon name="heart-o" size={50} color="#ccc" />
//           <Text style={styles.emptyText}>Your wishlist is empty</Text>
//           <Text style={styles.emptySubtext}>Tap the heart icon on items to save them here</Text>
//         </View>
//       ) : (
//         wishlist.filter(item => item.image && !imageError[item.id || item._id]).map((item) => {
//           const itemKey = item.id || item._id || `item-${item.name}-${item.image.split('/').pop()}`;
//           return (
//             <TouchableOpacity
//               key={itemKey}
//               onPress={() => navigateToSlug(item)}
//               style={styles.itemContainer}
//               activeOpacity={0.8}
//             >
//               <View>
//                 <Image
//                   source={{ uri: item.image }}
//                   style={styles.itemImage}
//                   onError={() => setImageError(prev => ({ ...prev, [itemKey]: true }))}
//                   onLoadStart={() => setLoadingImages(prev => ({ ...prev, [itemKey]: true }))}
//                   onLoadEnd={() => setLoadingImages(prev => ({ ...prev, [itemKey]: false }))}
//                 />
//                 {loadingImages[itemKey] && (
//                   <ActivityIndicator style={[styles.itemImage, styles.loadingIndicator]} />
//                 )}
//               </View>

//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>{item.name || 'Unnamed Item'}</Text>
//                 {item.location && (
//                   <Text style={styles.itemLocation}>{item.location}</Text>
//                 )}
//               </View>

//               <TouchableOpacity
//                 style={styles.heartButton}
//                 onPress={(e) => {
//                   e.stopPropagation();
//                   removeFromWishlist(item.id || item._id);
//                 }}
//               >
//                 <Icon name="heart" size={24} color="red" />
//               </TouchableOpacity>
//             </TouchableOpacity>
//           );
//         })
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 10,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 15,
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     resizeMode: 'cover',
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: 25,
//     left: 25,
//   },
//   itemDetails: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   itemLocation: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//     textDecorationLine: 'underline',
//   },
//   heartButton: {
//     padding: 10,
//   },
// });

// export default Wishlist;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wishlist = ({ navigation, destinations }) => { // destinations prop needed
  const [wishlist, setWishlist] = useState([]);
  const [imageError, setImageError] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          console.log("Wishlist Data:", parsedWishlist);
          setWishlist(parsedWishlist);
          console.log('Raw AsyncStorage data:', savedWishlist);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    loadWishlist();
  }, []);

  const removeFromWishlist = async (itemKey) => {
    try {
      const updatedWishlist = wishlist.filter(item => (item.id || item._id) !== itemKey);
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  };

  // Only this function used now for navigation
  const navigateToDestinationByNameLocation = async (item) => {
    try {
      const response = await fetch('https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations list');
      const destinations = await response.json();

      const found = destinations.find(
        d =>
          d.name?.toLowerCase() === item.name?.toLowerCase() &&
          d.location?.toLowerCase() === item.location?.toLowerCase()
      );

      if (found) {
        navigation.navigate('Slug', { destination: found });
      } else {
        console.warn('Destination not found by name and location:', item);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };


  // On item press, navigate by name + location only
  const navigateToSlug = async (item) => {
    try {
      // Fetch all destinations from API
      const response = await fetch('https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations');
      const allDestinations = await response.json();

      // Find destination matching name + location
      const matchedDestination = allDestinations.find(
        dest =>
          dest.name.toLowerCase() === item.name.toLowerCase() &&
          dest.location.toLowerCase() === item.location.toLowerCase()
      );

      if (!matchedDestination) {
        console.warn('Destination not found for:', item);
        return;
      }

      navigation.navigate('Slug', { destination: matchedDestination });
    } catch (error) {
      console.error('Error navigating to destination:', error);
      // Optional fallback: navigate with stored item data (partial)
      navigation.navigate('Slug', {
        destination: {
          ...item,
          bannerImage: item.image,
          baseImages: [item.image],
          description: "Description not available (offline mode)",
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Wishlist</Text>

      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="heart-o" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on items to save them here</Text>
        </View>
      ) : (
        wishlist
          .filter(item => item.image && !imageError[item.id || item._id])
          .map((item) => {
            const itemKey = item.id || item._id || `item-${item.name}-${item.image.split('/').pop()}`;
            return (
              <View key={itemKey} style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => navigateToSlug(item)}
                  style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                  activeOpacity={0.8}
                >
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      onError={() => setImageError(prev => ({ ...prev, [itemKey]: true }))}
                      onLoadStart={() => setLoadingImages(prev => ({ ...prev, [itemKey]: true }))}
                      onLoadEnd={() => setLoadingImages(prev => ({ ...prev, [itemKey]: false }))}
                    />
                    {loadingImages[itemKey] && (
                      <ActivityIndicator style={[styles.itemImage, styles.loadingIndicator]} />
                    )}
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name || 'Unnamed Item'}</Text>
                    {item.location && (
                      <Text style={styles.itemLocation}>{item.location}</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={(e) => {
                    e.stopPropagation(); // prevent navigation when tapping heart
                    removeFromWishlist(item.id || item._id);
                  }}
                >
                  <Icon name="heart" size={24} color="red" />
                </TouchableOpacity>
              </View>
            );
          })

      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  heartButton: {
    padding: 10,
  },
});

export default Wishlist;
