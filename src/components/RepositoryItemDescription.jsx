import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingLeft: 8,
    maxWidth: 300,
    width: '100%'
  },

  descriptionPackageName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },

  descriptionText: {
    color: theme.colors.textGray,
    paddingTop: 4,
    paddingBottom: 4,
  },

  descriptionLanguage: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.secondary,
    margin: 4,
    padding: 4,
    borderRadius: 12,
  },
});

const RepositoryItemDescription = ({ item }) => {
  return (
    <>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionPackageName}>{item.fullName}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <Text style={styles.descriptionLanguage}>{item.language}</Text>
    </>
  );
};

export default RepositoryItemDescription;
