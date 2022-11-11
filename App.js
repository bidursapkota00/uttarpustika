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
  Button,
} from 'react-native-paper';
import merge from 'deepmerge';
import {observer} from 'mobx-react-lite';
import {useLoginStore} from './utils/mobx/auth.store';

import Register from './screens/register/register';
import Loading from './screens/loading/loading';
import Home from './screens/home/home';
import Login from './screens/login/login';
import RegisterSuccess from './screens/register/requested';
import Retry from './screens/retry/retry';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default observer(() => {
  const {isLoggedIn, loading, logout} = useLoginStore();

  function Screen() {
    if (loading) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Retry"
            component={Retry}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    if (!isLoggedIn) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register Success"
            component={RegisterSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Drawer.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#1b8bb9',
              },
              headerTintColor: '#abdbe3',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <Button mode="elevated" color="#abdbe3" onPress={logout}>
                  Logout
                </Button>
              ),
            }}
          />
        </Drawer.Navigator>
      );
    }
  }

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer>{Screen()}</NavigationContainer>
    </PaperProvider>
  );
});
