import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/home/home';
import Contact from './screens/contact/contact';
import About from './screens/about/about';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Contact" component={Contact} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Home"
  //         component={Home}
  //         options={{title: 'University'}}
  //       />
  //       <Stack.Screen name="Contact" component={Contact} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
