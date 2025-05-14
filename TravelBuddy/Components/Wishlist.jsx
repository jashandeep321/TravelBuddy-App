import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await AsyncStorage.getItem('wishlist');
      if (data) {
        setWishlist(JSON.parse(data));
      }
    };
    fetchWishlist();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Your wishlist is empty.</Text>
      ) : (
        wishlist.map((item) => {
          console.log(item.image);  // Log the image URL for debugging
          return (
            <View key={item.id} style={styles.viewStyle}>
              <Image
                source={{
                  uri: item.image || 'https://via.placeholder.com/300', // Fallback image
                }}
                style={styles.image}
              />
              <Text style={styles.font}>{item.name}</Text>
              <Text>{item.country}</Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  viewStyle: {
    backgroundColor: 'ivory',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // spacing between boxes
    padding: 10, // inner spacing
    borderRadius: 0, // rounded corners
    alignSelf: 'center', // center each box horizontally
    shadowColor: '#000', // shadow effect
  },
  image: { width: 300, height: 300, borderRadius: 0 }, // image styling
  font: {
    fontWeight: '900',
    fontSize: 30,
    fontFamily: 'cursive',
    margin: 10,
  },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18 },
});
