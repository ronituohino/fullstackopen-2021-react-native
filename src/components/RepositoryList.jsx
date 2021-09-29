import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItemPressable from './RepositoryItemPressable';

import { List, RadioButton, TextInput } from 'react-native-paper';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.textWhite,
  },

  offset: {
    top: -8,
  },

  searchBoxBackground: {
    backgroundColor: theme.colors.textWhite
  },

  searchBoxSorting: {
    backgroundColor: theme.colors.textWhite
  },

  searchBox: {
    padding: 8,
    paddingTop: 2,
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
            <>
              <SearchBar setSearch={props.setSearch}/>
              <SortingSelector setSorting={props.setSorting} />
            </>
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
  const [search, setSearch] = useState('');

  const { repositories } = useRepositories(search, sorting);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSearch={setSearch}
      setSorting={setSorting}
    />
  );
};

const SearchBar = (props) => {
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 500);

  useEffect(() => {
    props.setSearch(debouncedText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  return (
    <View style={styles.searchBoxBackground}>
      <TextInput
        style={styles.searchBox}
        placeholder='Search'
        mode='outlined'
        value={text}
        onChangeText={value => setText(value)}
        left={<TextInput.Icon name='magnify' />}
        right={<TextInput.Icon name='close' onPress={() => setText('')} />}
      />
    </View>
  );
};

const SortingSelector = (props) => {
  const [expanded, setExpanded] = useState(false);
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
          style={styles.searchBoxSorting}
          title='Sort by'
          left={(props) => <List.Icon {...props} icon='format-list-bulleted' />}
          expanded={expanded}
          onPress={handlePress}
        >
          <RadioButton.Group
            onValueChange={(newValue) => onSortingPress(newValue)}
            value={value}
          >
            <RadioButton.Item label='Latest' value='latest' />
            <RadioButton.Item label='Highest Rated' value='rated-highest' />
            <RadioButton.Item label='Lowest Rated' value='rated-lowest' />
          </RadioButton.Group>
        </List.Accordion>
      </List.Section>
    </>
  );
};

export default RepositoryList;
