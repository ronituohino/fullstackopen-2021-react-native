import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router-native';

import useSignOut from '../hooks/useSignOut';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 32,
    paddingBottom: 32,
    backgroundColor: theme.colors.secondaryDark,
  },
});

const AppBar = () => {
  const history = useHistory();
  const [loggedIn, loading] = useIsLoggedIn();

  const signOut = useSignOut();

  const openReviewForm = () => {
    history.push('/createReview');
  };

  const myReviews = () => {
    history.push('/myreviews');
  };

  const signUp = () => {
    history.push('/signup');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab onPress={() => history.push('/')} text='Repositories' />

        {loggedIn && !loading 
        ? <AppBarTab onPress={openReviewForm} text='Create a review'/>
        : <></>
        }


        { loggedIn && !loading
        ? <AppBarTab onPress={myReviews} text='My reviews'/>
        : <></>
        }

        {loggedIn && !loading ? (
          <AppBarTab onPress={signOut} text='Sign out' />
        ) : (
          <AppBarTab onPress={() => history.push('/signin')} text='Sign in' />
        )}

        {!loggedIn && !loading ? (
          <AppBarTab onPress={signUp} text='Sign up'/>
        ) : (<></>)}
      </ScrollView>
    </View>
  );
};

export default AppBar;
