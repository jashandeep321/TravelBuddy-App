// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   Image,
//   Dimensions
// } from 'react-native';
// import LoaderKit from 'react-native-loader-kit';

// const { width } = Dimensions.get('window');

// const Packages = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages')
//       .then(res => res.json())
//       .then(data => {
//         setPackages(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching packages:', err);
//         setLoading(false);
//       });
//   }, []);

//   const renderItem = ({ item }) => {
//     const firstImage =
//       item.images?.sightseeing?.[0] ||
//       item.images?.hotel?.[0] ||
//       item.images?.restaurant?.[0] ||
//       'https://via.placeholder.com/300x200.png?text=No+Image';

//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: firstImage }} style={styles.image} />
//         <Text style={styles.title}>{item.title || 'Untitled Package'}</Text>
//         <Text style={styles.description}>{item.description || 'No description available'}</Text>
//         <Text style={styles.info}>Duration: {item.duration || 'N/A'}</Text>
//         <Text style={styles.info}>Price: ₹{item.price || 'N/A'}</Text>
//         <Text style={styles.category}>Category: {item.category || 'N/A'}</Text>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <LoaderKit
//           style={{ width: 80, height: 80 }}
//           name={'BallSpinFadeLoader'}
//           color={'#80ffff'}
//         />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       <Text style={styles.header}>Available Packages</Text>
//       <FlatList
//         data={packages}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         scrollEnabled={false}
//       />
//     </ScrollView>
//   );
// };

// export default Packages;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#204040ff',
//     paddingTop: 40,
//     paddingHorizontal: 10,
//   },
//   scrollContent: {
//     paddingBottom: 60,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#ffffff',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#3b6f6f',
//     borderRadius: 12,
//     marginBottom: 16,
//     padding: 14,
//     elevation: 4,
//   },
//   image: {
//     width: '100%',
//     height: 180,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 6,
//   },
//   description: {
//     color: '#d0e0e0',
//     marginBottom: 8,
//   },
//   info: {
//     color: '#f0f8ff',
//     marginBottom: 4,
//     fontWeight: '500',
//   },
//   category: {
//     fontStyle: 'italic',
//     color: '#80ffff',
//     marginTop: 4,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#204040ff',
//   },
// });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://travelbuddy-1-4ja0.onrender.com/TravelBuddy/packages')
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching packages:', err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const firstImage =
      item.images?.sightseeing?.[0] ||
      item.images?.hotel?.[0] ||
      item.images?.restaurant?.[0] ||
      item.image || // fallback to "image" field if others not found
      'https://via.placeholder.com/300x200.png?text=No+Image';

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        delay={index * 150}
        useNativeDriver
        style={styles.card}
      >
        <Image source={{ uri: firstImage }} style={styles.image} />
        <Text style={styles.title}>{item.title || 'Untitled Package'}</Text>
        <Text style={styles.description}>{item.description || 'No description available'}</Text>
        <Text style={styles.info}>Duration: {item.duration || 'N/A'}</Text>
        <Text style={styles.info}>Price: ₹{item.price || 'N/A'}</Text>
       
      </Animatable.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LoaderKit
          style={{ width: 80, height: 80 }}
          name={'BallSpinFadeLoader'}
          color={'#80ffff'}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Tour Packages</Text>
      <FlatList
        data={packages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#204040ff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 14,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b6f6f',
    marginBottom: 6,
  },
  description: {
    color: 'grey',
    marginBottom: 8,
  },
  info: {
    color: 'grey',
    marginBottom: 4,
    fontWeight: '500',
  },
  category: {
    fontStyle: 'italic',
    color: '#80ffff',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#204040ff',
  },
});
