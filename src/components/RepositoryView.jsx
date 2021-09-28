import React from 'react';
import { RepositoryItem } from './RepositoryItemPressable';
import { useParams } from 'react-router';
import { GET_REPO_REVIEWS, GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import Text from './Text';
import { format } from 'date-fns';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';

import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  openGitHubBox: {
    flex: 1,
    width: '100%',
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

  reviewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: 150,
  },

  review: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    padding: 8,
  },

  reviewScoreContainer: {
    padding: 8,
    paddingTop: 10,
    borderColor: theme.colors.primaryPurple,
    borderWidth: 3,
    width: 50,
    height: 50,
    borderRadius: 25, 
  },

  reviewScore: {
    textAlign: 'center',
    color: theme.colors.primaryPurple,
  },

  reviewInfo: {
    padding: 8,
  },

  reviewText: {
    padding: 8,
  },

  reviewSeperator: {
    padding: 2,
    backgroundColor: theme.colors.textWhite,
  }
});

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
  });

  return <>{loading ? <></> : <RepositoryDetails item={data.repository} />}</>;
};

const RepositoryDetails = ({ item }) => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPO_REVIEWS, {
    variables: { id },
  });

  const openInGitHub = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  const reviewNodes = loading
  ? undefined
  : data.repository.reviews.edges.map(e => e.node);
  
  return (
    <>
      <RepositoryItem item={item}>
        <Pressable onPress={openInGitHub} style={styles.openGitHubBox}>
          <Text color='white' style={styles.openGitHubText}>
            Open in GitHub
          </Text>
        </Pressable>
      </RepositoryItem>

      <ReviewSeperator />

      <View style={styles.reviewContainer}>
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ReviewSeperator}
          renderItem={ReviewItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const ReviewSeperator = () => {
  return (
    <View style={styles.reviewSeperator}/>
  );
};

const ReviewItem = ({item}) => {
  const dateParts = item.createdAt.substring(0, 10).split('-');

  return (
    <>
      <View style={styles.review}>
        <View style={styles.reviewScoreContainer}>
          <Text size='subheading' weight='bold' style={styles.reviewScore}>{item.rating}</Text>
        </View>

        <View style={styles.reviewInfo}>  
          <Text weight='bold'>{item.user.username}</Text>
          <Text color='gray'>{format(new Date(dateParts[0], dateParts[1], dateParts[2]), 'dd.MM.yyyy')}</Text>
        </View>
        
        <View style={styles.reviewText}>
          <Text>{item.text}</Text>
        </View>
      </View> 
    </>
  );
};

export default RepositoryView;
