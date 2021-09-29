import { useQuery } from '@apollo/client';
import { GET_REPO_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = ({ id, first }) => {
  const variables = { id, first };

  const { data, loading, fetchMore } = useQuery(GET_REPO_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data && data.repository
      ? data.repository.reviews.edges.map((e) => e.node)
      : null,
    fetchMore: handleFetchMore,
  };
};

export default useRepositoryReviews;
