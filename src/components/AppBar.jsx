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
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.textWhite,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.header,
    paddingLeft: 16,
    paddingRight: 16,
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
