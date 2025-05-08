// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import AllDestinations from './AllDestinations'
// import Login from './user/Login'

// const StackWrapper = () => {
//   return (
//     // <NavigationContainer>

//     //     <Stack.Navigator>
//     //         <Stack.Screen component={Login} name='Login'/>
//     //         <Stack.Screen component={AllDestinations} name='Destinations'/>
//     //     </Stack.Navigator>

//     //   <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//     //     <Stack.Screen name="Welcome" component={Welcome} />
//     //     <Stack.Screen name="Login" component={Login} />
//     //     <Stack.Screen name="Home" component={Nav} screenOptions={{ headerShown: false }} />
//     //     <Stack.Screen name="AllDestrinations" component={AllDestinations} />
//     //   </Stack.Navigator>

//     // </NavigationContainer>
//     <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen component={Login} name='Login'/>
//             <Stack.Screen component={AllDestinations} name='Destinations'/>
//         </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default StackWrapper;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './user/Login';
import AllDestinations from './AllDestinations';
import Nav from './Tabbar/Nav';
import Itinerary from './Itinerary';

const Stack = createStackNavigator();

const StackWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Nav} />
        <Stack.Screen name="AllDestinations" component={AllDestinations} />
        <Stack.Screen name="Itinerary" component={Itinerary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackWrapper;

