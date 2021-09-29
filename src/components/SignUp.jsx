import React from 'react';
import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

import * as Yup from 'yup';
import { themeObjects } from '../theme';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
  loginText: {
    textAlign: 'center',
  },
});

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username must not be empty?')
    .max(30, 'Username must be less than 31 characters long'),

  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be less than 51 characters long'),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();

  const submitSignUp = (values) => {
    signUp({username: values.username, password: values.password});
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => submitSignUp(values)}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        name='passwordConfirm'
        placeholder='Password confirmation'
        secureTextEntry
      />

      <Pressable onPress={onSubmit} style={themeObjects.button}>
        <Text color='white' style={styles.loginText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
