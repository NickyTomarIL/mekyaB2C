import {HeaderBackButton} from '@react-navigation/elements';
import {
  createNativeStackNavigator,
  type NativeStackHeaderBackProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

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
  /** Android: keep title beside back when not using a custom left row. */
  headerTitleAlign: 'left' as const,
  /** iOS 18+ can show the previous screen title next to the chevron; that reads like a duplicate title row. */
  ...(Platform.OS === 'ios'
    ? {
        headerBackButtonDisplayMode: 'minimal' as const,
        headerBackTitle: '',
      }
    : {}),
} as const;

type HeaderLeftProps = {
  heading: string;
  tintColor?: string;
  canGoBack: boolean;
  onGoBack: () => void;
};

function ProfileHeaderLeftWithTitle({
  heading,
  tintColor,
  canGoBack,
  onGoBack,
}: HeaderLeftProps): React.JSX.Element {
  if (!canGoBack) {
    return (
      <View style={headerLeftStyles.root}>
        <Text style={headerLeftStyles.title} numberOfLines={1}>
          {heading}
        </Text>
      </View>
    );
  }
  return (
    <View style={headerLeftStyles.root}>
      <HeaderBackButton
        tintColor={tintColor}
        onPress={onGoBack}
        displayMode="minimal"
      />
      <Text style={headerLeftStyles.title} numberOfLines={1}>
        {heading}
      </Text>
    </View>
  );
}

const headerLeftStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
    ...Platform.select({
      ios: {marginLeft: -4},
      default: {},
    }),
  },
  title: {
    flexShrink: 1,
    marginLeft: 4,
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
});

/** iOS always centers `title`; use empty native title and draw title next to back. */
function inlineHeaderWithTitle(
  heading: string,
  navigation: {goBack: () => void},
  backTint?: string,
): {
  title: string;
  headerBackVisible: false;
  headerLeft: (props: NativeStackHeaderBackProps) => React.ReactNode;
} {
  return {
    title: '',
    headerBackVisible: false,
    headerLeft: (props: NativeStackHeaderBackProps) => (
      <ProfileHeaderLeftWithTitle
        heading={heading}
        tintColor={backTint ?? props.tintColor}
        canGoBack={props.canGoBack ?? false}
        onGoBack={() => navigation.goBack()}
      />
    ),
  };
}

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
        options={({navigation}) => ({
          ...stackScreenOptions,
          headerTintColor: COLORS.profileMenuIcon,
          ...inlineHeaderWithTitle('My Profile', navigation, COLORS.profileMenuIcon),
        })}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          ...inlineHeaderWithTitle('Order History', navigation),
        })}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          ...inlineHeaderWithTitle('Order Details', navigation),
        })}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          ...inlineHeaderWithTitle('Wishlist', navigation),
        })}
      />
      <Stack.Screen
        name="MyAddresses"
        component={MyAddressesScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          headerTintColor: COLORS.profileMenuIcon,
          ...inlineHeaderWithTitle('My Address', navigation, COLORS.profileMenuIcon),
        })}
      />
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({navigation, route}) => {
          const heading = route.params?.address ? 'Edit Address' : 'Add New Address';
          return {
            ...stackScreenOptions,
            headerTintColor: COLORS.profileMenuIcon,
            ...inlineHeaderWithTitle(heading, navigation, COLORS.profileMenuIcon),
          };
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          headerTintColor: COLORS.profileMenuIcon,
          ...inlineHeaderWithTitle('Security', navigation, COLORS.profileMenuIcon),
        })}
      />
      <Stack.Screen
        name="SavedReels"
        component={SavedReelsScreen}
        options={({navigation}) => ({
          ...stackScreenOptions,
          ...inlineHeaderWithTitle('Saved Reel', navigation),
        })}
      />
    </Stack.Navigator>
  );
}
