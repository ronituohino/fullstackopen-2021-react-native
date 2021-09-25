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
    await AsyncStorage.setItem('auth', accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem('auth');
  }
}

export default AuthStorage;
