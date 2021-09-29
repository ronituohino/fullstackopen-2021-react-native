import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItemPressable from './RepositoryItemPressable';

import { List, RadioButton } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.textWhite
  },

  offset: {
    top: -7.5
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = (props) => {
  const history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = props.repositories
    ? props.repositories.edges.map((edge) => {
        return { node: edge.node, history };
      })
    : [];

  return (
    <>
      <View>
        <FlatList
          ListHeaderComponent={
            <SortingSelector setSorting={props.setSorting} />
          }
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={RepositoryItemPressable}
          keyExtractor={(item) => item.node.id}
        />
      </View>
    </>
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState('latest');
  const { repositories } = useRepositories(sorting);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSorting={setSorting}
    />
  );
};

const SortingSelector = (props) => {
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState('latest');

  const handlePress = () => setExpanded(!expanded);

  const onSortingPress = (value) => {
    setValue(value);
    props.setSorting(value);
  };

  return (
    <>
      <List.Section style={styles.offset}>
        <List.Accordion
          title='Sort By'
          left={(props) => <List.Icon {...props} icon='equal' />}
          expanded={expanded}
          onPress={handlePress}
        >
          <RadioButton.Group
            onValueChange={(newValue) => onSortingPress(newValue)}
            value={value}
          >
            <RadioButton.Item label="Latest" value="latest" />
            <RadioButton.Item label="Highest Rated" value="rated-highest" />
            <RadioButton.Item label="Lowest Rated" value="rated-lowest" />
          </RadioButton.Group>
        </List.Accordion>
      </List.Section>
    </>
  );
};

export default RepositoryList;
