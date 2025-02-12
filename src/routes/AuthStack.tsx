import * as React from 'react';

import { createStaticNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignInScreen} from '../screens/SignIn';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'SignIn',
    screens: {
      SignIn: SignInScreen,
      //Details: DetailsScreen,
    },
  });

  const NavigationStack = createStaticNavigation(RootStack);

export function AuthStack() {
  return (
    <NavigationStack />
  );
}
