import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 32,
    backgroundColor: theme.colors.primary,
    padding: 16,
  },
  text: {
    color: theme.colors.textWhite,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.header
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab onPress={() => console.log("hello")}>
        <Text style={styles.text}>Repositories</Text>
      </AppBarTab>
    </View>
  );
};

export default AppBar;
