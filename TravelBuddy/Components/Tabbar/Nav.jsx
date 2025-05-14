import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Itinerary from '../Itinerary';
import AllDestinations from '../AllDestinations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../user/Profile';

const Tab = createBottomTabNavigator();

function Nav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Destinations') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Itinerary') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#335C58ff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Destinations" component={AllDestinations} />
      <Tab.Screen name="Itinerary" component={Itinerary} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default Nav;