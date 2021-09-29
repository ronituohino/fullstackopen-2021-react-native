import React from 'react';
import { FlatList } from 'react-native';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import { ReviewSeperator } from './RepositoryView';
import { ReviewItem } from './RepositoryView';
import { themeObjects } from '../theme';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: -12,
    padding: 4,
  },

  buttonText: {
    textAlign: 'center',
  },
});

const MyReviews = () => {
  const history = useHistory();
  const { reviews, validData } = useUserReviews();

  const mapReviews = validData
    ? reviews.map((review) => {
        return { review, showUser: false, history };
      })
    : null;

  return (
    <>
      {validData ? (
        <FlatList
          data={mapReviews}
          ItemSeparatorComponent={ReviewSeperator}
          renderItem={ExpandedReviewItem}
          keyExtractor={(item) => item.review.id}
        />
      ) : (
        <></>
      )}
    </>
  );
};

// Expanded with 2 buttons
const ExpandedReviewItem = ({item}) => {
  
  const viewRepo = () => {
    item.history.push(`/repository/${item.review.repository.id}`);
  };

  const deleteReview = () => {
    console.log('del');
  };

  return (
    <>
      <ReviewItem item={item}/>

      <View style={styles.buttonContainer}>
      <Pressable onPress={viewRepo} style={themeObjects.button}>
        <Text color="white" style={styles.buttonText}>
          View repository
        </Text>
      </Pressable>

      <Pressable onPress={deleteReview} style={themeObjects.dangerButton}>
        <Text color="white" style={styles.buttonText}>
          Delete review
        </Text>
      </Pressable>
      </View>
    </>
  );
};

export default MyReviews;
