import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

import Home from './screens/home/home';
import Register from './screens/register/register';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackBar() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Register" component={Register} />
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
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
