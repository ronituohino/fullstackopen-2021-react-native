import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 32,
    paddingBottom: 32,
    backgroundColor: theme.colors.primaryPurple,
  },
});

const AppBar = () => {
  const history = useHistory();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab onPress={() => history.push('/')} text="Repositories" />
        <AppBarTab onPress={() => history.push('/signin')} text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
