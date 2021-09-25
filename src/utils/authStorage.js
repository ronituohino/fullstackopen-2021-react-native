import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem('auth');

    if (token != null) {
      return token;
    } else {
      throw Error("Token not found");
    }
  }

  async setAccessToken(accessToken) {
    const token = await AsyncStorage.setItem('auth', accessToken);
    AsyncStorage.getAllKeys().then(r => console.log(r));
    
    return token;
  }

  async removeAccessToken() {
    console.log("uhh uh");
    await AsyncStorage.removeItem('auth');

    AsyncStorage.getAllKeys().then(r => r.forEach(i => console.log(i)));

  }
}

export default AuthStorage;
