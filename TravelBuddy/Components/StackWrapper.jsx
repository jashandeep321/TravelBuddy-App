import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AllDestinations from './AllDestinations'
import Login from './user/Login'

const StackWrapper = () => {
  return (
    // <NavigationContainer>

    //     <Stack.Navigator>
    //         <Stack.Screen component={Login} name='Login'/>
    //         <Stack.Screen component={AllDestinations} name='Destinations'/>
    //     </Stack.Navigator>

    //   <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Welcome" component={Welcome} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Home" component={Nav} screenOptions={{ headerShown: false }} />
    //     <Stack.Screen name="AllDestrinations" component={AllDestinations} />
    //   </Stack.Navigator>

    // </NavigationContainer>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen component={Login} name='Login'/>
            <Stack.Screen component={AllDestinations} name='Destinations'/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackWrapper;
