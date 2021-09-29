import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return signOut;
};

export default useSignOut;
