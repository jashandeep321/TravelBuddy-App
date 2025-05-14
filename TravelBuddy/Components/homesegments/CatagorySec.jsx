import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

export default function CatagorySec() {
  const [destinations, setDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('beach');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchCategoryData = () => {
    setLoading(true);
    axios.get('https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/destinations')
      .then((res) => {
        setDestinations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const filteredData = destinations.filter(item => item.category === selectedCategory);

  return (
    <View style={{ flex: 1, paddingVertical: 20, backgroundColor: "white" }}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {['beach', 'mountain', 'city', 'nature'].map((category) => (
          <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
            <Text style={[
              styles.tabText,
              selectedCategory === category && styles.activeTab
            ]}>
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {filteredData.map(destination => (
            <TouchableOpacity
              key={destination._id}
              style={styles.card}
              onPress={() => navigation.navigate('Slug', { destination })}
            >
              <Image
                source={{ uri: destination.baseImages?.[0] }}
                style={styles.image}
              />
              <Text style={styles.cardTitle}>{destination.name}</Text>
              <Text style={styles.subtitle}>{destination.description.split(' ').slice(0, 8).join(' ')}...
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.arrowCard}
            onPress={() => navigation.navigate('AllDestinations')}
          >
            <Entypo name="chevron-thin-right" size={36} color="#204040ff" />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#B2D1B4ff',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#204040ff',
  },
  scrollView: {
    paddingHorizontal: 20,
     paddingVertical: 20,
  },
  card: {
    width: 220,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#204040ff',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  arrowCard: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
        marginLeft: 5,
    // backgroundColor: '#eef5f5',
    // borderRadius: 15,

    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 2 },
    // elevation: 3,
  },
});
