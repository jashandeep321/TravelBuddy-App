import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet, ImageBackground ,Image} from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Components/Assets/bg.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
      
      <Image style={styles.ImageDimention}
    source={require('../Components/Assets/logo.png')}/>

        <Text style={styles.title}>Welcome</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Nav')}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  ImageDimention:{
    width:"100%",
    height :250,
    resizeMode:'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Added padding to prevent text from touching the edges
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    textShadowColor: ' #204040ff',  // Adds text shadow for better visibility
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#204040ff', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '70%',
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
  spacer: {
    height: 30,
  }
});
