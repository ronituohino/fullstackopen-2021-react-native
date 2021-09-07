import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

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
      <Pressable onPress={onSubmit} style={styles.signInBox}>
        <Text color="white" style={styles.loginText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const signInSubmit = (e) => {
    console.log(e);
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={signInSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
