import React from 'react';
import { Pressable } from 'react-native';

const AppBarTab = (props) => {
  return ( 
    <>
      <Pressable onPress={props.onPress}>
        {props.children}
      </Pressable>
    </>
  );
};

export default AppBarTab;
