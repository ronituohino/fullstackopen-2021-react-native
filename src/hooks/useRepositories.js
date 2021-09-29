import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorting) => {
  const searchVars = {
    'latest': {orderBy: 'CREATED_AT', orderDirection: 'DESC'},
    'rated-highest': {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'},
    'rated-lowest': {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
  };

  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: searchVars[sorting] 
  });

  return { repositories: data ? data.repositories : undefined, loading, refetch };
};

export default useRepositories;