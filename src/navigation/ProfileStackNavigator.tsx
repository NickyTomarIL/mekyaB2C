import React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileStackParamList} from '@/navigation/types';
import AddEditAddressScreen from '../screens/Profile/AddEditAddressScreen';
import MyAddressesScreen from '../screens/Profile/MyAddressesScreen';
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import OrderDetailsScreen from '../screens/Profile/OrderDetailsScreen';
import OrderHistoryScreen from '../screens/Profile/OrderHistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SavedReelsScreen from '../screens/Profile/SavedReelsScreen';
import SecurityScreen from '../screens/Profile/SecurityScreen';
import WishlistScreen from '../screens/Profile/WishlistScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const stackScreenOptions = {
  headerShown: true,
  /** Avoid large title + inline title showing the same label on iOS (esp. with ScrollView). */
  headerLargeTitleEnabled: false,
  headerTintColor: COLORS.splash,
  headerStyle: {backgroundColor: COLORS.white},
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  contentStyle: {backgroundColor: COLORS.white},
  /** iOS 18+ can show the previous screen title next to the chevron; that reads like a duplicate title row. */
  ...(Platform.OS === 'ios'
    ? {
        headerBackButtonDisplayMode: 'minimal' as const,
        headerBackTitle: '',
      }
    : {}),
} as const;

export function ProfileStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: 'My Profile',
          headerTintColor: COLORS.profileMenuIcon,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{title: 'Order History'}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{title: 'Order Details'}}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{title: 'Wishlist'}}
      />
      <Stack.Screen
        name="MyAddresses"
        component={MyAddressesScreen}
        options={{
          title: 'My Address',
          headerTintColor: COLORS.profileMenuIcon,
        }}
      />
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({route}) => ({
          title: route.params?.address ? 'Edit Address' : 'Add New Address',
          headerTintColor: COLORS.profileMenuIcon,
        })}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          title: 'Security',
          headerTintColor: COLORS.profileMenuIcon,
        }}
      />
      <Stack.Screen
        name="SavedReels"
        component={SavedReelsScreen}
        options={{title: 'Saved Reel'}}
      />
    </Stack.Navigator>
  );
}
