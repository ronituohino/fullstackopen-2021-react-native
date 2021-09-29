import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const history = useHistory();

  const signUp = async ({ username, password }) => {
    await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    history.push('/signin');
  };

  return [signUp, result];
};

export default useSignUp;
