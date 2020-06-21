import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

// export const removeValue = async (key) => {
//   try {
//     await AsyncStorage.removeItem('@' + key);
//   } catch (e) {
//     console.log(e);
//   }
// };
