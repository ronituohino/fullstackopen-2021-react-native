import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import RepositoryItemDescription from './RepositoryItemDescription';
import RepositoryItemStatistics from './RepositoryItemStatistics';

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

const RepositoryItemPressable = (props) => {
  // For some reason useHistory() cannot be used here?

  const onPress = () => {
    props.item.history.push(`/repository/${props.item.node.id}`);
  };

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={props.item.node} />
    </Pressable>
  );
};

export const RepositoryItem = (props) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
      <Image style={styles.image} source={{ uri: props.item.ownerAvatarUrl }} />
      
      <RepositoryItemDescription item={props.item}/>

      <View style={styles.break} />

      <RepositoryItemStatistics item={props.item}/>

      {props.children}
    </View>
  );
};

export default RepositoryItemPressable;