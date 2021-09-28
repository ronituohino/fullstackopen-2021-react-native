import React from 'react';
import { RepositoryItem } from './RepositoryItemPressable';
import { useParams } from 'react-router';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import Text from './Text';
import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';

import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  openGitHubBox: {
    flex: 1,
    width: "100%",
    padding: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textWhite,
    borderStyle: 'solid',
    backgroundColor: theme.colors.primaryPurple,
  },
  openGitHubText: {
    textAlign: 'center',
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
  });

  if (!loading) {
    console.log(data);
  }

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <RepositoryDetails item={data.repository} />
      )}
    </>
  );
};

const RepositoryDetails = ({ item }) => {
  const openInGitHub = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  return (
    <>
      <RepositoryItem item={item}>
        <Pressable onPress={openInGitHub} style={styles.openGitHubBox}>
          <Text color="white" style={styles.openGitHubText}>
            Open in GitHub
          </Text>
        </Pressable>
      </RepositoryItem>
    </>
  );
};

export default RepositoryView;
