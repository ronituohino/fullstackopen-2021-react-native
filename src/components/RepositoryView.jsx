import React from 'react';
import { RepositoryItem } from './RepositoryItemPressable';
import { useParams } from 'react-router';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import Text from './Text';
import { format } from 'date-fns';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';

import * as WebBrowser from 'expo-web-browser';
import useRepositoryReviews from '../hooks/useRepositoryReviews';

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
    width: '100%',
  },

  reviewSeperator: {
    padding: 2,
    backgroundColor: theme.colors.textWhite,
  },
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
  const { reviews, fetchMore } = useRepositoryReviews({ id, first: 6 });

  const openInGitHub = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  const mapReviews = reviews ? reviews.map(review => {
    return {review, showUser: true};
  }) : null;

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
          data={mapReviews}
          ItemSeparatorComponent={ReviewSeperator}
          renderItem={ReviewItem}
          keyExtractor={(item) => item.review.id}
          onEndReached={fetchMore()}
          onEndReachedThreshold={0.5}
        />
      </View>
    </>
  );
};

export const ReviewSeperator = () => {
  return <View style={styles.reviewSeperator} />;
};

// Used at 'My reviews' tab
export const ReviewItem = ({ item }) => {
  const dateParts = item.review.createdAt.substring(0, 10).split('-');

  return (
    <>
      <View style={styles.review}>
        <View style={styles.reviewScoreContainer}>
          <Text size='subheading' weight='bold' style={styles.reviewScore}>
            {item.review.rating}
          </Text>
        </View>

        <View style={styles.reviewInfo}>
          {item.showUser ? (
            <Text weight='bold'>{item.review.user.username}</Text>
          ) : (
            <Text weight='bold'>{item.review.repository.fullName}</Text>
          )}

          <Text color='gray'>
            {format(
              new Date(dateParts[0], dateParts[1], dateParts[2]),
              'dd.MM.yyyy'
            )}
          </Text>
        </View>

        <View style={styles.reviewText}>
          <Text>{item.review.text}</Text>
        </View>
      </View>
    </>
  );
};

export default RepositoryView;
