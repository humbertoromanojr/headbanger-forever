import * as React from 'react';

import { createStaticNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/Home';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
      Home: HomeScreen,
      //Details: DetailsScreen,
    },
  });

  const NavigationStack = createStaticNavigation(RootStack);

export function AppStack() {
  return (
    <NavigationStack />
  );
}
