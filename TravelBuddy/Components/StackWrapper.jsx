// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import AllDestinations from './AllDestinations'
// import Welcome from './Welcome'
// import Login from './user/Login'
// import Home from './Home';
// import Nav from './Tabbar/Nav'

// const StackWrapper = () => {
//     const Stack = createStackNavigator();
//   return (
//     <NavigationContainer>
//         <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//         <Stack.Screen component={Welcome} name='Welcome'/>
//         <Stack.Screen component={Home} name='Home'/>
//             <Stack.Screen component={Login} name='Login'/>
//             <Stack.Screen component={AllDestinations} name='AllDestinations'/>
            
//         </Stack.Navigator>
//     </NavigationContainer>
    
//   )
// }

// export default StackWrapper

// const styles = StyleSheet.create({})



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './user/Login';
import AllDestinations from './AllDestinations';
import Nav from './Tabbar/Nav'; // ← Tab navigator (used as Home)

const Stack = createStackNavigator();

const StackWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Nav} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="AllDestrinations" component={AllDestinations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackWrapper;
