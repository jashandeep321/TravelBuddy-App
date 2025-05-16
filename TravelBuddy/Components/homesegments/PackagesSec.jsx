import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Loader from '../Loader';
import Entypo from 'react-native-vector-icons/Entypo';

const PackagesSec = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          'https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages',
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setPackages(data.slice(0, 4));
        } else {
          console.error('Data is not an array:', data);
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <Loader />;

  // Return empty container if no packages
  if (!packages || packages.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Featured Travel Packages</Text>
        <Text style={{padding: 15, textAlign: 'center', color: 'gray'}}>
          No packages available at the moment
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Travel Packages</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {packages.map(packageItem => (
          <TouchableOpacity
            key={packageItem._id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('PackageDetails', {
                slug: packageItem.slug || packageItem._id,
              })
            }>
            <Image
              source={{
                uri:
                  packageItem.image ||
                  'https://via.placeholder.com/200x200.png?text=No+Image',
              }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>
              {packageItem.title || 'Package'}
            </Text>
            <Text style={styles.subtitle}>
              <Entypo name="location-pin" size={18} color="#555" />
              {typeof packageItem.destination === 'string'
                ? packageItem.destination
                : 'Various Locations'}
            </Text>
            <Text style={styles.transport}>
              {packageItem.transportation === 'air'
                ? 'By Air'
                : packageItem.transportation === 'rail'
                ? 'By Rail'
                : packageItem.transportation === 'airrail'
                ? 'By Air & Rail'
                : 'By Road'}
            </Text>
            <View style={styles.priceContainer}>
              {packageItem.originalPrice && (
                <Text style={styles.originalPrice}>
                  ₹{packageItem.originalPrice}
                </Text>
              )}
              <Text style={styles.price}>₹{packageItem.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.arrowCard}
          onPress={() => navigation.navigate('Packages')}>
          <Entypo name="chevron-thin-right" size={40} color="#204040ff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  arrowCard: {
    padding: 30,
    top: '30%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10,
    color: '#204040ff',
  },  card: {
    width: 400,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 400,
    height: 250,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  transport: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#204040ff',
  },
});

export default PackagesSec;
