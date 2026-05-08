import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainTabNavigator} from '@/navigation/MainTabNavigator';
import type {RootStackParamList} from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack: host for tabs and future flows (auth, splash handoff, modals).
 */
export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
