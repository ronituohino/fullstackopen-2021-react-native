import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ search, sorting, first}) => {
  const sortingDict = {
    'latest': {orderBy: 'CREATED_AT', orderDirection: 'DESC'},
    'rated-highest': {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'},
    'rated-lowest': {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
  };

  const variables = { ...sortingDict[sorting], first };

  if (search != '') {
    variables['searchKeyword'] = search;
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data?.repositories, 
    fetchMore: handleFetchMore,
    loading, 
    ...result
  };
};

export default useRepositories;