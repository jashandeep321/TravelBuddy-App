// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// const Slug = ({route}) => {
//   const {destination} = route.params;

//   // Function to render array items as simple list
//   const renderList = items => {
//     return items.map((item, index) => (
//       <Text key={index.toString()} style={styles.listItem}>
//         • {item}
//       </Text>
//     ));
//   };

//   // Function to render image gallery horizontally
//   const renderGallery = images => {
//     return (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{maxHeight: 200}}>
//         {images.map((item, index) => (
//           <Image
//             key={index.toString()}
//             source={{uri: item}}
//             style={styles.galleryImage}
//           />
//         ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <ScrollView style={styles.outerContainer}>
//       <View style={styles.container}>
//         {/* Banner Image */}
//         <Image
//           source={{uri: destination.bannerImage}}
//           style={styles.bannerImage}
//         />
//         {/* Title */}
//         <Text style={styles.title}>{destination.name}</Text>
//         <Text style={styles.subtitle}>{destination.location}</Text>
//         <View style={styles.infoContainer}>
//           <Text style={styles.infoLabel}>
//             Rated {destination.stars || 'N/A'} ★
//           </Text>
//         </View>
//         {/* Description */}
//         <Text style={styles.sectionTitle}>About</Text>
//         <Text style={styles.description}>{destination.description}</Text>
//         {/* Best Time to Visit */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.infoLabel}>Best Time to Visit:</Text>
//         </View>
//         <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
//         <View style={styles.infoContainer}>
//           <Text style={styles.infoLabel}>When Not to Visit:</Text>
//         </View>
//         <Text style={styles.infoText}>{destination.whenNotToVisit}</Text>
//         {/* Places to Visit */}
//         <Text style={styles.sectionTitle}>Popular Places to Visit</Text>
//         {renderList(destination.placesToVisit)}
//         {/* Food to Try */}
//         <Text style={styles.sectionTitle}>Must-Try Local Foods</Text>
//         {renderList(destination.foodToTry)}
//         {/* Images */}
//         <Text style={styles.sectionTitle}>Gallery</Text>
//         {renderGallery(destination.baseImages)}
//         {/* Transportation */}
//         <Text style={styles.sectionTitle}>Transportation</Text>
//         {renderList(destination.transportation)}
//         {/* Ratings */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.infoLabel}>Average Price Range:</Text>
//           <Text style={styles.infoText}>{destination.price}</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   container: {
//     marginTop: StatusBar.currentHeight,
//     paddingHorizontal: 15,
//     paddingBottom: 20,
//     backgroundColor: 'white',
//   },
//   bannerImage: {
//     width: '100%',
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: 'gray',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#333',
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   listItem: {
//     fontSize: 16,
//     color: '#333',
//     marginVertical: 5,
//   },
//   galleryImage: {
//     width: 300,
//     height: 200,
//     borderRadius: 8,
//     marginRight: 10,
//   },
// });

// export default Slug;


import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

const Slug = ({ route }) => {
  const { destination } = route.params || {};

  useEffect(() => {
    console.log('Received params:', route.params);
  }, [route.params]);

  // Safe fallbacks
  const safeBaseImages = destination?.baseImages || [];
  const safeDescription = destination?.description || "No description available";
  const safeBannerImage = destination?.bannerImage || null;
  const safePlacesToVisit = Array.isArray(destination?.placesToVisit) ? destination.placesToVisit : [];
  const safeFoodToTry = Array.isArray(destination?.foodToTry) ? destination.foodToTry : [];
  const safeTransportation = Array.isArray(destination?.transportation) ? destination.transportation : [];

  const renderList = items =>
    items.map((item, index) => (
      <Text key={index.toString()} style={styles.listItem}>
        • {item}
      </Text>
    ));

  const renderGallery = images => {
    if (!Array.isArray(images) || images.length === 0) return null;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 200 }}>
        {images.map((item, index) => (
          <Image
            key={index.toString()}
            source={{ uri: item }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Banner Image */}
        {safeBannerImage && (
          <Image
            source={{ uri: safeBannerImage }}
            style={styles.bannerImage}
          />
        )}

        {/* Title */}
        <Text style={styles.title}>{destination?.name || 'No Name'}</Text>
        <Text style={styles.subtitle}>{destination?.location || 'No Location'}</Text>

        {/* Rating */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>
            Rated {destination?.stars || 'N/A'} ★
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{safeDescription}</Text>

        {/* Best Time to Visit */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Best Time to Visit:</Text>
        </View>
        <Text style={styles.infoText}>
          {destination?.bestTimeToVisit || 'N/A'}
        </Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>When Not to Visit:</Text>
        </View>
        <Text style={styles.infoText}>
          {destination?.whenNotToVisit || 'N/A'}
        </Text>

        {/* Places to Visit */}
        <Text style={styles.sectionTitle}>Popular Places to Visit</Text>
        {renderList(safePlacesToVisit)}

        {/* Food to Try */}
        <Text style={styles.sectionTitle}>Must-Try Local Foods</Text>
        {renderList(safeFoodToTry)}

        {/* Gallery */}
        <Text style={styles.sectionTitle}>Gallery</Text>
        {renderGallery(safeBaseImages)}

        {/* Transportation */}
        <Text style={styles.sectionTitle}>Transportation</Text>
        {renderList(safeTransportation)}

        {/* Price */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Average Price Range:</Text>
          <Text style={styles.infoText}>
            {destination?.price || 'Not Available'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  bannerImage: {
    width: '100%',
    height: 300,
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
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default Slug;
