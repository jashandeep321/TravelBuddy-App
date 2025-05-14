// // // // ../user/Profile.js
// // // import React from 'react';
// // // import { View, Text } from 'react-native';

// // // const Profile = () => {
// // //   return (
// // //     <View>
// // //       <Text>User Profile</Text>
// // //     </View>
// // //   );
// // // };

// // // export default Profile;


// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useAuth0 } from 'react-native-auth0';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//   const { clearSession, user } = useAuth0();
//   const navigation = useNavigation();
  

//   const onLogout = async () => {
//     try {
//       await clearSession();
//       navigation.replace('Auth0Login'); // or navigate to another screen as needed
//     } catch (e) {
//       console.log('Log out cancelled');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.userInfo}>Welcome, {user?.name}</Text> You can display user data here */}
      
//       <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
//         <Text style={styles.buttonText}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   userInfo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   logoutButton: {
//     backgroundColor: '#28bf6f',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;




import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { clearSession, user: auth0User } = useAuth0(); // Renamed to avoid conflict
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Simulating a delay; replace with your own fetch logic if needed
        setUser(auth0User);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [auth0User]);

  const onLogout = async () => {
    try {
      await clearSession();
      navigation.replace('Auth0Login');
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>Welcome, {user?.name || 'Guest'}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#204040ff', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '40%',
    marginBottom: 15,  
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    borderColor:'#335C58ff',
    borderWidth: 1,
  },
  buttonText:{
    fontSize:20,
    color:'beige'
  },
});

export default ProfileScreen;
