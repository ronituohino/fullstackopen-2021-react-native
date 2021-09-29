import { useQuery } from '@apollo/client';
import { CHECK_AUTH } from '../graphql/queries';

const useIsLoggedIn = () => {
    const { data, loading } = useQuery(CHECK_AUTH, {
        fetchPolicy: 'cache-and-network',
    });

    const loggedIn = data != undefined && data.authorizedUser != null;
    return [loggedIn, loading];
};

export default useIsLoggedIn;