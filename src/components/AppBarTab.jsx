import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textWhite,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.header,
    paddingLeft: 16,
    paddingRight: 16,
  },

  button: {
    alignSelf: 'stretch'
  }
});

const AppBarTab = (props) => {
  return ( 
    <>
      <Pressable style={styles.button} onPress={props.onPress}>
          <Text style={styles.text}>{props.text}</Text>
      </Pressable>
    </>
  );
};

export default AppBarTab;
