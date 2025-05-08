import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Alert,
} from 'react-native';

import { useEffect ,useState } from 'react'
import { ActivityIndicator } from 'react-native'
// import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'



import { TouchableOpacity, Text as RNText } from 'react-native';
import {SafeAreaView } from 'react-native';
import Auth0Login from './Auth0Login';

// const image = {uri: 'https://res.cloudinary.com/dzyb93kms/image/upload/v1746185447/WhatsApp_Image_2025-05-02_at_4.59.44_PM_qx7iei.jpg'};

const image = {
  uri: 'https://i.pinimg.com/736x/9e/d9/2b/9ed92bb01e9e323528386304eb5dc9a0.jpg',
};




const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  console.log('Navigation object:', navigation);  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="enter your email"
            placeholderTextColor="#ccc"
            required
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="password"
            placeholderTextColor="#ccc"
            secureTextEntry
            required
          />
          {/* <View style={styles.buttonContainer}>
            <Button
              title="Login"
              color="#024F55"
              onPress={() => Alert.alert('Login Successful.')}
            />
          </View> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('Destinations')}
            style={styles.loginButton}
            //  onPress={() => Alert.alert('Login Successful.')}
          >
            <RNText style={styles.loginButtonText}>Login</RNText>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleBottom}>OR</Text>
        <Auth0Login/>
        {/* <TouchableOpacity
        
        >

        </TouchableOpacity> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dim effect
  },
  loginBox: {
    width: '90%',
    // height:'50%',
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    zIndex: 1,
  },
  titleBottom: {
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#000000aa',
    borderRadius: 12,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 15,
    fontSize: 16,
    color: '#fff',
  },
  // buttonContainer: {
  //   marginTop: 50,
  //   width: '100%',
  //   borderRadius: 15,
  //   height: 60,
  //   // overflow: 'hidden',
  // },

  loginButton: {
    backgroundColor: '#024F55',
    height: 55, // Increased height
    borderRadius: 12, // More rounded
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginTop: 25,
  },

  loginButtonText: {
    color: '#EFECCD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

// import React, { useState } from 'react';
// import {
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Alert,
//   SafeAreaView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Text as RNText,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';  // Import Firebase Auth
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { firebase } from '@react-native-firebase/auth';

// const image = {
//   uri: 'https://res.cloudinary.com/dzyb93kms/image/upload/v1746185447/WhatsApp_Image_2025-05-02_at_4.59.44_PM_qx7iei.jpg',
// };

// const Login = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await auth().signInWithEmailAndPassword(email, password);
//       Alert.alert('Success', 'Logged in successfully!');
//       navigation.navigate('Destinations'); // Navigate to your destinations screen
//     } catch (error) {
//       if (error.code === 'auth/user-not-found') {
//         Alert.alert('Error', 'No user found with this email.');
//       } else if (error.code === 'auth/wrong-password') {
//         Alert.alert('Error', 'Incorrect password.');
//       } else {
//         Alert.alert('Login Error', error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//         <View style={styles.loginBox}>
//           <Text style={styles.title}>Login</Text>

//           <TextInput
//             style={styles.input}
//             onChangeText={setEmail}
//             value={email}
//             placeholder="JohnDoe@gmail.com"
//             placeholderTextColor="#ccc"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <TextInput
//             style={styles.input}
//             onChangeText={setPassword}
//             value={password}
//             placeholder="Password"
//             placeholderTextColor="#ccc"
//             secureTextEntry
//           />

//           {loading ? (
//             <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
//           ) : (
//             <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
//               <RNText style={styles.loginButtonText}>Login</RNText>
//             </TouchableOpacity>
//           )}
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// // Styles remain unchanged
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginBox: {
//     width: '90%',
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: 16,
//     padding: 30,
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 42,
//     fontWeight: 'bold',
//     marginBottom: 50,
//   },
//   input: {
//     backgroundColor: '#000000aa',
//     borderRadius: 8,
//     width: '100%',
//     height: 50,
//     paddingHorizontal: 15,
//     marginVertical: 20,
//     fontSize: 18,
//     color: '#fff',
//   },
//   loginButton: {
//     backgroundColor: '#024F55',
//     height: 55,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 30,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Login;
