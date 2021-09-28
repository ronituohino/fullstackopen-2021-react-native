import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingLeft: 8,
    maxWidth: 300,
    width: '100%',
  },

  descriptionText: {
    paddingTop: 4,
    paddingBottom: 4,
  },

  descriptionLanguage: {
    backgroundColor: theme.colors.secondaryDark,
    margin: 4,
    padding: 4,
    borderRadius: 12,
  },
});

const RepositoryItemDescription = ({ item }) => {
  return (
    <>
      <View style={styles.descriptionContainer}>
        <Text testID='fullname' size='subheading' weight='bold'>
          {item.fullName}
        </Text>
        <Text testID='description' color='gray' style={styles.descriptionText}>
          {item.description}
        </Text>
      </View>
      <Text testID='language' color='white' style={styles.descriptionLanguage}>
        {item.language}
      </Text>
    </>
  );
};

export default RepositoryItemDescription;
