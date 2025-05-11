import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Animated, Image } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';
import LoaderKit from "react-native-loader-kit";
const backgroundImage = require('../Assets/bg.jpg');
const logoImage = require('../Assets/logo.png');

const captionsList = [
  "Discover new destinations ✈️",
  "Plan your perfect trip 🗺️",
  "Find hidden gems 🌟",
  "Adventure awaits 🚀",
];

const Home = () => {
  const { authorize, clearSession, user } = useAuth0();
  const [currentCaption, setCurrentCaption] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {
    animateCaption();
    const interval = setInterval(() => {
      setCurrentCaption((prev) => {
        const next = (prev + 1) % captionsList.length;
        animateCaption();
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigation.replace("Nav");
    }
  }, [loggedIn]);

  const animateCaption = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const onLogin = async () => {
    try {
      await authorize(); // After this, `user` will be set, triggering the useEffect above
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      {!loggedIn && (
        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        </View>
      )}

      {loggedIn && (
        <View >
        <LoaderKit
          style={{ width: 80, height: 80 }}
          name={"BallSpinFadeLoader"}
          color={"#024F55"}
        />
      </View>
      )}

      {!loggedIn && (
        <View style={styles.welcomeContainer}>
          <Animated.Text style={[styles.caption, { opacity: fadeAnim }]}>
            {captionsList[currentCaption]}
          </Animated.Text>
          <TouchableOpacity style={styles.welcomeButton} onPress={onLogin}>
            <Text style={styles.buttonText}>Welcome</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const Auth0Login = () => {
  return (
    <Auth0Provider
      domain={'dev-o63qrewp2pkenlpm.us.auth0.com'}
      clientId={'OwFuoyoUleiBAbScnFRLEy4955gVPs5h'}
    >
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  welcomeContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  caption: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  welcomeButton: {
    backgroundColor: '#204040ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '70%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderColor: '#335C58ff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#28bf6f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
  },
});

export default Auth0Login;