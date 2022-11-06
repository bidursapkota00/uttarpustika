import React from 'react';
import {runInAction, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async () => {
  try {
    await AsyncStorage.multiSet([
      ['user', 'abcd'],
      ['pass', 'password1'],
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.multiGet(['user', 'pass']);
    if (user)
      return {
        user: user[0][1],
        pass: user[1][1],
      };
    return {};
  } catch (error) {
    console.log(error);
  }
};

class LoginStore {
  isLoggedIn = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  checkIfLoggedIn = async () => {
    const {user, pass} = await getUser();
    if (user && pass) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  login = async () => {};

  logout = async () => {};
}

// Instantiate the counter store.
const loginStore = new LoginStore();
// Create a React Context with the counter store instance.
export const LoginStoreContext = React.createContext(loginStore);
export const useLoginStore = () => React.useContext(LoginStoreContext);
