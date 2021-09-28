import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useHistory } from 'react-router-native';
import { useQuery } from '@apollo/client';

import { CHECK_AUTH } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 32,
    paddingBottom: 32,
    backgroundColor: theme.colors.secondaryDark,
  },
});

const AppBar = () => {
  const history = useHistory();

  const { data } = useQuery(CHECK_AUTH);
  const signOut = useSignOut();

  const showLogin = data != undefined && data.authorizedUser != null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab onPress={() => history.push('/')} text="Repositories" />

        { showLogin
        ? <AppBarTab onPress={() => signOut()} text="Sign out" />
        : <AppBarTab onPress={() => history.push('/signin')} text="Sign in" />
        }
        
      </ScrollView>
    </View>
  );
};

export default AppBar;
