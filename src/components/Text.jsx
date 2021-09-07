import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textBlack,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },

  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorTextGray: {
    color: theme.colors.textGray,
  },
  colorTextError: {
    color: theme.colors.error,
  },

  fontSizeHeader: {
    fontSize: theme.fontSizes.header
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },

  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize: size, fontWeight: weight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'white' && styles.colorTextWhite,
    color === 'gray' && styles.colorTextGray,
    color === 'error' && styles.colorTextError,

    size === 'header' && styles.fontSizeHeader,
    size === 'subheading' && styles.fontSizeSubheading,

    weight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;