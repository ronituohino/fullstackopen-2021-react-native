import React from 'react';
import { FlatList } from 'react-native';
import useUserReviews from '../hooks/useUserReviews';
import { ReviewSeperator } from './RepositoryView';
import { ReviewItem } from './RepositoryView';

const MyReviews = () => {
  const { reviews, validData } = useUserReviews();

  const mapReviews = validData
    ? reviews.map((review) => {
        return { review, showUser: false };
      })
    : null;

  return (
    <>
      {validData ? (
        <FlatList
          data={mapReviews}
          ItemSeparatorComponent={ReviewSeperator}
          renderItem={ReviewItem}
          keyExtractor={(item) => item.review.id}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default MyReviews;
