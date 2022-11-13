import React from 'react';
import {runInAction, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../const';

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

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

class LoginStore {
  isLoggedIn = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  checkIfLoggedIn = async () => {
    const {device, pass} = await getUser();
    if (device && pass) {
      const res = await postData(base_url + '/api/apk/login', {
        device,
        pass,
      });
      if (res.message === true)
        runInAction(() => {
          this.loading = false;
          this.isLoggedIn = true;
        });
    } else {
      runInAction(() => {
        this.loading = false;
      });
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
