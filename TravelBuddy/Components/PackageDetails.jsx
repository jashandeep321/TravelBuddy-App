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
  Dimensions
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');

function PackageDetailsScreen({ route }) {
  const { slug } = route.params;
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchPackage = async () => {
    try {
      // Try fetching by slug first
      let res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/slug/${slug}`);
      
      // If not found by slug, try fetching by ID
      if (!res.data) {
        res = await axios.get(`https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages/${slug}`);
      }
      
      setPkg(res.data);
    } catch (err) {
      console.error('Error fetching package:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchPackage();
}, [slug]);

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

      {/* Image Carousel */}
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

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.wishlistButton]}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.bookButton]}>
          <Text style={styles.buttonText}>Book Package</Text>
        </TouchableOpacity>
      </View>

      {/* Inclusions & Exclusions */}
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

      {/* Hotel/Restaurant Images */}
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

      {/* Itinerary */}
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