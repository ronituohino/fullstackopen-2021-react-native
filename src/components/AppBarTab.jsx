import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  text: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  button: {
    alignSelf: 'stretch',
  },
});

const AppBarTab = (props) => {
  return (
    <>
      <Pressable style={styles.button} onPress={props.onPress}>
        <Text color="white" weight="bold" size="header" style={styles.text}>
          {props.text}
        </Text>
      </Pressable>
    </>
  );
};

export default AppBarTab;
