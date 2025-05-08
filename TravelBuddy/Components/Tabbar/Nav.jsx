import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';

import AllDestinations from '../AllDestinations';

const Tab = createBottomTabNavigator();

function Nav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Destinations" component={AllDestinations} />
      
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
export default Nav;