import { AsyncStorage } from 'react-native';
const USER_TOKEN = 'USER_TOKEN'
const AUTO_LOGIN = 'CHECK_AUTO_LOGIN'
export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_TOKEN}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearToken = async () => saveToken('');

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_TOKEN}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};


export const setDataJson = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getDataJson = async (key) => {
  try {
    const value =  await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return false;
  }
};


export const getAutoLogin = async () => {
  try {
    const value =  await AsyncStorage.getItem(AUTO_LOGIN);
    console.log("Value", value)
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const setAutoLogin = async (value) => {
  try {
    await AsyncStorage.setItem(AUTO_LOGIN, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};