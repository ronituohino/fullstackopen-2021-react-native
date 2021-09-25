import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    return AsyncStorage.getItem('auth');
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem('auth', accessToken);
  }

  removeAccessToken() {
    AsyncStorage.removeItem('auth');
  }
}

export default AuthStorage;
