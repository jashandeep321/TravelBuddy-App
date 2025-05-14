import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Card from './Card';
import Loader from './Loader';

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the provided API
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations',
        );
        const data = await response.json();
        setDestinations(data); // Pass data
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />; // Show Loader while data is being fetched
  }

  return (
    <ScrollView style={styles.container}>
      {destinations.map(destination => (
        <Card key={destination._id} destination={destination} />
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
