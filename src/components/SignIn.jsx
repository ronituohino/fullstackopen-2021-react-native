import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
  signInBox: {
    padding: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textGray,
    borderStyle: 'solid',
    backgroundColor: theme.colors.secondaryDark,
  },
  loginText: {
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable testID='signInButton' onPress={onSubmit} style={styles.signInBox}>
        <Text color="white" style={styles.loginText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit}/>
  );
};

export default SignIn;
