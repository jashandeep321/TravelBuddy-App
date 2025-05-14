import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

const Slug = ({route}) => {
  const {destination} = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}>
      {/* Banner Image */}
      <Image
        source={{uri: destination.bannerImage}}
        style={styles.bannerImage}
      />

      {/* Title */}
      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.subtitle}>{destination.location}</Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.description}>{destination.description}</Text>

      {/* Best Time to Visit */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Best Time to Visit:</Text>
        <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>When Not to Visit:</Text>
        <Text style={styles.infoText}>{destination.whenNotToVisit}</Text>
      </View>

      {/* Places to Visit */}
      <Text style={styles.sectionTitle}>Popular Places to Visit</Text>
      <FlatList
        data={destination.placesToVisit}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.listItem}>• {item}</Text>}
      />

      {/* Food to Try */}
      <Text style={styles.sectionTitle}>Must-Try Local Foods</Text>
      <FlatList
        data={destination.foodToTry}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.listItem}>• {item}</Text>}
      />

      {/* Images */}
      <Text style={styles.sectionTitle}>Gallery</Text>
      <FlatList
        data={destination.baseImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.galleryImage} />
        )}
      />

      {/* Transportation */}
      <Text style={styles.sectionTitle}>Transportation</Text>
      <FlatList
        data={destination.transportation}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.listItem}>• {item}</Text>}
      />

      {/* Ratings */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Average Price Range:</Text>
        <Text style={styles.infoText}>{destination.price}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Ratings:</Text>
        <Text style={styles.infoText}>{destination.stars} ★</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default Slug;
