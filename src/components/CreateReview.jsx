import React from 'react';
import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

import { themeObjects } from '../theme';

import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router';

const ReviewSchema = Yup.object().shape({
  repositoryOwner: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .typeError('Rating must be a number between 0 and 100')
    .integer('An integer please...')
    .required('Rating is required')
    .min(0, 'More than or equal to 0')
    .max(100, 'Less than or equal to 100'),
  review: Yup.string(),
});

const styles = StyleSheet.create({
  loginText: {
    textAlign: 'center',
  },
});

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async (values) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            repositoryName: values.repositoryName,
            ownerName: values.repositoryOwner,
            rating: parseInt(values.rating),
            text: values.review
          }
        }
      });

      history.push(`/repository/${data.createReview.repository.id}`);
    } catch(e) {
      console.log(e.message);
    } 
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ReviewSchema}
        onSubmit={(values) => createReview(values)}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name='repositoryOwner'
        placeholder='Repository owner name'
      />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput name='review' placeholder='Review' />

      <Pressable onPress={onSubmit} style={themeObjects.button}>
        <Text color='white' style={styles.loginText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
