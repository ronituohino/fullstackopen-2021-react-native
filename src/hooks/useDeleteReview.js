import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ reviewId }) => {
    return await mutate({
      variables: {
        id: reviewId,
      },
    });
  };

  return { deleteReview, success: result };
};

export default useDeleteReview;
