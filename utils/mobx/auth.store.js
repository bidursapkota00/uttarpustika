import React from 'react';
import {runInAction, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async (device, pass) => {
  try {
    await AsyncStorage.multiSet([
      ['device', device],
      ['pass', pass],
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.multiGet(['device', 'pass']);
    if (user)
      return {
        device: user[0][1],
        pass: user[1][1],
      };
    return {};
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async () => {
  const keys = ['device', 'pass'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(error);
  }
  console.log('User Removed');
};

class LoginStore {
  isLoggedIn = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  checkIfLoggedIn = async () => {
    const {device, pass} = await getUser();
    if (device && pass) {
      setTimeout(
        () =>
          runInAction(() => {
            this.loading = false;
            this.isLoggedIn = true;
          }),
        1000,
      );
    } else {
      setTimeout(
        () =>
          runInAction(() => {
            this.loading = false;
          }),
        1000,
      );
    }
  };

  login = async (device, pass) => {
    storeUser(device, pass);
    runInAction(() => {
      this.isLoggedIn = true;
    });
  };

  logout = async () => {
    await removeUser();
    runInAction(() => {
      this.isLoggedIn = false;
    });
  };
}

const loginStore = new LoginStore();
export const LoginStoreContext = React.createContext(loginStore);
export const useLoginStore = () => React.useContext(LoginStoreContext);
