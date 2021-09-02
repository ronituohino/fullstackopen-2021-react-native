import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import RepositoryItemDescription from './RepositoryItemDescription';
import RepositoryItemStatistics from './RepositoryItemStatistics';

//import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 32,
    padding: 8
  },

  break: {
    width: '100%'
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      
      <RepositoryItemDescription item={item}/>

      <View style={styles.break} />

      <RepositoryItemStatistics item={item}/>
    </View>
  );
};



export default RepositoryItem;
