import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainTabNavigator} from '@/navigation/MainTabNavigator';
import type {RootStackParamList} from '@/navigation/types';
import ForgotPasswordEmailScreen from '@/screens/Auth/ForgotPassword/ForgotPasswordEmailScreen';
import LoginWithEmailScreen from '@/screens/Auth/Login/LoginWithEmailScreen';
import LoginWithPhoneScreen from '@/screens/Auth/Login/LoginWithPhoneScreen';
import PhoneOTPVerificationScreen from '@/screens/Auth/Login/PhoneOTPVerificationScreen';
import PDPScreen from '@/screens/PDP/PDPScreen';
import PLPScreen from '@/screens/PLP/PLPScreen';
import SearchScreen from '@/screens/Search/SearchScreen';
import SplashScreen from '@/screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack: splash → login (then navigate to Main after successful auth when you add it).
 */
export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginWithEmailScreen} />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmailScreen}
      />
      <Stack.Screen name="LoginWithPhone" component={LoginWithPhoneScreen} />
      <Stack.Screen
        name="PhoneOTPVerification"
        component={PhoneOTPVerificationScreen}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="ProductListing" component={PLPScreen} />
      <Stack.Screen name="ProductDetail" component={PDPScreen} />
    </Stack.Navigator>
  );
}
