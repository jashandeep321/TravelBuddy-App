import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../Loader';
import Entypo from 'react-native-vector-icons/Entypo';

const DestinationSec = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLimitedDestinations = async () => {
      try {
        const response = await fetch(
          'https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations',
        );
        const data = await response.json();
        setDestinations(data.slice(0, 4));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLimitedDestinations();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Popular Destinations</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {destinations.map(destination => (
          <TouchableOpacity
            key={destination._id}
            style={styles.card}
            onPress={() => navigation.navigate('Slug', { destination })}>
            <Image
              source={{ uri: destination.baseImages[0] }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>{destination.name}</Text>
            <Text style={styles.subtitle}><Entypo name="location-pin" size={18} color="#555" />{destination.location}</Text>
          </TouchableOpacity>
        ))}
         <TouchableOpacity
          style={styles.arrowCard}
          onPress={() => navigation.navigate('AllDestinations')}
        >
          <Entypo name="chevron-thin-right" size={40} color="#204040ff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DestinationSec;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  arrowCard:{
    padding:30,
    top: '30%', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom:10,
    marginBottom: 10,
    color:'#204040ff',
  },
  card: {
    width: 200,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    //  backgroundColor: '#f9f8ec',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
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
});
