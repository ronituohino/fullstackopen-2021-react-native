import { useQuery } from '@apollo/client';
import { GET_USER_REVIEWS } from '../graphql/queries';

const useUserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_USER_REVIEWS);

  const validData =
    !loading && data && data.authorizedUser && data.authorizedUser.id;

  return {
    reviews: validData
      ? data.authorizedUser.reviews.edges.map((e) => e.node)
      : null,
    validData,
    refetch
  };
};

export default useUserReviews;
