import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './user/Login';
import AllDestinations from './AllDestinations';
import Nav from './Tabbar/Nav';
import Itinerary from './Itinerary';
import Auth0Login from './user/Auth0Login';
import Packages from './Packages'; // <-- add this at the top
import Home from './Home';

const Stack = createStackNavigator();

const StackWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth0Login" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
        <Stack.Screen name="Auth0Login" component={Auth0Login} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="AllDestinations" component={AllDestinations} />
        <Stack.Screen name="Itinerary" component={Itinerary} />
        <Stack.Screen name="Packages" component={Packages} />
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackWrapper;