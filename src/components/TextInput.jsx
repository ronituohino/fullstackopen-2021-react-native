import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  inputBox: {
    padding: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textGray,
  },
  errorBox: {
    padding: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ error, ...props }) => {
  const textStyle = error ? styles.errorBox : styles.inputBox;

  return <NativeTextInput style={textStyle} {...props} />;
};

export default TextInput;
