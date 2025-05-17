// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   Image, 
//   ScrollView, 
//   ActivityIndicator, 
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const { width: screenWidth } = Dimensions.get('window');

// function PackageDetailsScreen({ route }) {
//   const { slug } = route.params;
//   const [pkg, setPkg] = useState(null);
//   const [loading, setLoading] = useState(true);

  

//  useEffect(() => {
//   const fetchPackage = async () => {
//     try {
//       // Try fetching by slug first
//       let res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/slug/${slug}`);
      
//       // If not found by slug, try fetching by ID
//       if (!res.data) {
//         res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/${slug}`);
//       }
      
//       setPkg(res.data);
//     } catch (err) {
//       console.error('Error fetching package:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchPackage();
// }, [slug]); 

//   const getTravelIcon = (mode) => {
//     const m = mode?.toLowerCase();
//     if (m?.includes('by air')) return <Icon name="plane" size={16} color="#333" />;
//     if (m?.includes('by train')) return <Icon name="train" size={16} color="#333" />;
//     return <Icon name="bus" size={16} color="#333" />;
//   };

//   const renderImageItem = ({ item }) => (
//     <Image source={{ uri: item }} style={styles.carouselImage} />
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   if (!pkg) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Package not found.</Text>
//       </View>
//     );
//   }

//   const originalPrice = (pkg.price * 1.1).toFixed(0);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{pkg.title}</Text>

//       {/* Image Carousel */}
//       {pkg.images?.sightseeing?.length > 0 && (
//         <FlatList
//           data={pkg.images.sightseeing}
//           renderItem={renderImageItem}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           style={styles.carouselContainer}
//         />
//       )}

//       <Text style={styles.description}>{pkg.description}</Text>
      
//       <View style={styles.infoContainer}>
//         <Text style={styles.info}>
//           <Text style={styles.bold}>Duration: </Text>
//           {pkg.duration}
//         </Text>
//         <Text style={styles.info}>
//           <Text style={styles.bold}>Travel Mode: </Text>
//           {getTravelIcon(pkg.travelMode)} {pkg.travelMode}
//         </Text>
//       </View>

//       <Text style={styles.price}>
//         <Text style={styles.strike}>₹{originalPrice}</Text>
//         <Text style={styles.currentPrice}>  ₹{pkg.price}</Text>
//         <Text style={styles.perPerson}> /person</Text>
//       </Text>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={[styles.button, styles.wishlistButton]}>
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.bookButton]}>
//           <Text style={styles.buttonText}>Book Package</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Inclusions & Exclusions */}
//       <View style={styles.sectionContainer}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>What's Included</Text>
//           {pkg.inclusions.map((item, idx) => (
//             <Text key={idx} style={styles.listItem}>• {item}</Text>
//           ))}
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>What's Not Included</Text>
//           {pkg.exclusions.map((item, idx) => (
//             <Text key={idx} style={styles.listItem}>• {item}</Text>
//           ))}
//         </View>
//       </View>

//       {/* Hotel/Restaurant Images */}
//       {(pkg.images?.hotel?.length > 0 || pkg.images?.restaurant?.length > 0) && (
//         <View style={styles.imageGrid}>
//           {pkg.images?.hotel?.length > 0 && (
//             <View style={styles.imageCategory}>
//               <Text style={styles.imageCategoryTitle}>Hotel</Text>
//               <Image 
//                 source={{ uri: pkg.images.hotel[0] }} 
//                 style={styles.gridImage} 
//               />
//             </View>
//           )}
//           {pkg.images?.restaurant?.length > 0 && (
//             <View style={styles.imageCategory}>
//               <Text style={styles.imageCategoryTitle}>Restaurant</Text>
//               <Image 
//                 source={{ uri: pkg.images.restaurant[0] }} 
//                 style={styles.gridImage} 
//               />
//             </View>
//           )}
//         </View>
//       )}

//       {/* Itinerary */}
//       <Text style={styles.sectionTitle}>Itinerary</Text>
//       {pkg.itinerary.map((day, idx) => (
//         <View key={idx} style={styles.itineraryCard}>
//           <Text style={styles.itineraryDay}>Day {day.day}: {day.title}</Text>
//           <Text style={styles.itineraryActivities}>{day.activities}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
//   carouselContainer: {
//     marginBottom: 16,
//   },
//   carouselImage: {
//     width: screenWidth - 32,
//     height: 200,
//     borderRadius: 10,
//     marginRight: 16,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 16,
//     lineHeight: 24,
//     color: '#555',
//   },
//   infoContainer: {
//     marginBottom: 16,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#333',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   price: {
//     fontSize: 20,
//     marginVertical: 16,
//     textAlign: 'center',
//   },
//   strike: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//     marginRight: 8,
//   },
//   currentPrice: {
//     color: '#2ecc71',
//     fontWeight: 'bold',
//   },
//   perPerson: {
//     color: '#7f8c8d',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     width: '48%',
//     alignItems: 'center',
//   },
//   wishlistButton: {
//     backgroundColor: '#f1c40f',
//   },
//   bookButton: {
//     backgroundColor: '#3498db',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   sectionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   section: {
//     width: '48%',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#2c3e50',
//   },
//   listItem: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: '#555',
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   imageCategory: {
//     width: '48%',
//   },
//   imageCategoryTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   gridImage: {
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//   },
//   itineraryCard: {
//     backgroundColor: '#f8f9fa',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   itineraryDay: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#2c3e50',
//   },
//   itineraryActivities: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 20,
//   },
// });

// export default PackageDetailsScreen;

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

function PackageDetailsScreen({ route, navigation }) {
  const { slug } = route.params;
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        let res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/slug/${slug}`);
        
        if (!res.data) {
          res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/${slug}`);
        }
        
        setPkg(res.data);
        checkCartStatus(res.data._id);
      } catch (err) {
        console.error('Error fetching package:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]); 

  const checkCartStatus = async (packageId) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setInCart(parsedCart.some(item => item.id === packageId));
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
    }
  };

  const addToCart = async () => {
    try {
      const cartItem = {
        id: pkg._id,
        slug: pkg.slug,
        title: pkg.title,
        price: pkg.price,
        duration: pkg.duration,
        image: pkg.images?.sightseeing?.[0] || pkg.images?.hotel?.[0] || pkg.images?.restaurant?.[0],
        travelMode: pkg.travelMode
      };

      const currentCart = await AsyncStorage.getItem('cart');
      const cart = currentCart ? JSON.parse(currentCart) : [];
      
      if (!cart.some(item => item.id === cartItem.id)) {
        const updatedCart = [...cart, cartItem];
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        setInCart(true);
        //Alert.alert('Success', 'Package added to cart!');
      } else {
        Alert.alert('Info', 'This package is already in your cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add to cart');
    }
  };

  const bookPackage = () => {
    navigation.navigate('Checkout', { package: pkg });
  };

  const getTravelIcon = (mode) => {
    const m = mode?.toLowerCase();
    if (m?.includes('by air')) return <Icon name="plane" size={16} color="#333" />;
    if (m?.includes('by train')) return <Icon name="train" size={16} color="#333" />;
    return <Icon name="bus" size={16} color="#333" />;
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!pkg) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Package not found.</Text>
      </View>
    );
  }

  const originalPrice = (pkg.price * 1.1).toFixed(0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pkg.title}</Text>

      {pkg.images?.sightseeing?.length > 0 && (
        <FlatList
          data={pkg.images.sightseeing}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        />
      )}

      <Text style={styles.description}>{pkg.description}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          <Text style={styles.bold}>Duration: </Text>
          {pkg.duration}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.bold}>Travel Mode: </Text>
          {getTravelIcon(pkg.travelMode)} {pkg.travelMode}
        </Text>
      </View>

      <Text style={styles.price}>
        <Text style={styles.strike}>₹{originalPrice}</Text>
        <Text style={styles.currentPrice}>  ₹{pkg.price}</Text>
        <Text style={styles.perPerson}> /person</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, inCart ? styles.inCartButton : styles.wishlistButton]}
          onPress={addToCart}
          disabled={inCart}
        >
          <Text style={styles.buttonText}>
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.bookButton]}
          onPress={bookPackage}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {pkg.inclusions.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Not Included</Text>
          {pkg.exclusions.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </View>

      {(pkg.images?.hotel?.length > 0 || pkg.images?.restaurant?.length > 0) && (
        <View style={styles.imageGrid}>
          {pkg.images?.hotel?.length > 0 && (
            <View style={styles.imageCategory}>
              <Text style={styles.imageCategoryTitle}>Hotel</Text>
              <Image 
                source={{ uri: pkg.images.hotel[0] }} 
                style={styles.gridImage} 
              />
            </View>
          )}
          {pkg.images?.restaurant?.length > 0 && (
            <View style={styles.imageCategory}>
              <Text style={styles.imageCategoryTitle}>Restaurant</Text>
              <Image 
                source={{ uri: pkg.images.restaurant[0] }} 
                style={styles.gridImage} 
              />
            </View>
          )}
        </View>
      )}

      <Text style={styles.sectionTitle}>Itinerary</Text>
      {pkg.itinerary.map((day, idx) => (
        <View key={idx} style={styles.itineraryCard}>
          <Text style={styles.itineraryDay}>Day {day.day}: {day.title}</Text>
          <Text style={styles.itineraryActivities}>{day.activities}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 16,
  },
  carouselImage: {
    width: screenWidth - 32,
    height: 200,
    borderRadius: 10,
    marginRight: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
    color: '#555',
  },
  infoContainer: {
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 8,
  },
  currentPrice: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  perPerson: {
    color: '#7f8c8d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  wishlistButton: {
    backgroundColor: '#f1c40f',
  },
  inCartButton: {
    backgroundColor: '#2ecc71',
  },
  bookButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  section: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  listItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageCategory: {
    width: '48%',
  },
  imageCategoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  itineraryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itineraryDay: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
  },
  itineraryActivities: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default PackageDetailsScreen;