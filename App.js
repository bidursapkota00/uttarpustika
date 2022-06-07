import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/home/home';
import Contact from './screens/contact/contact';
import About from './screens/about/about';
import Sub from './screens/sub/sub';
import Board from './screens/boards/boards';
import Sem from './screens/sem/sem';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

function StackBar() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Subject" component={Sub} />
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="Semester" component={Sem} />
    </Stack.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Contact" component={Contact} />
          <Drawer.Screen
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
                height: 70,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="Main"
            component={StackBar}
          />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
