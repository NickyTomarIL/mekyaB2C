import React from 'react';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import {
  Cart as CartTabSvg,
  CartFilled as CartTabFilledSvg,
  Category as CategoryTabSvg,
  CategoryFilled as CategoryTabFilledSvg,
  Home as HomeTabSvg,
  HomeFilled as HomeTabFilledSvg,
  Profile as ProfileTabSvg,
  ProfileFilled as ProfileTabFilledSvg,
  ReelFilled as ReelsTabFilledSvg,
  Reels as ReelsTabSvg,
} from '@/assets/icons';
import COLORS from '@/constants/colors';
import type {MainTabParamList} from '@/navigation/types';
import {ProfileStackNavigator} from '@/navigation/ProfileStackNavigator';
import CartScreen from '@/screens/Cart/CartScreen';
import CategoryScreen from '@/screens/Category/CategoryScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ReelsScreen from '@/screens/Reels/ReelsScreen';
import {SPACING} from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

type SvgTabIconComponent = React.ComponentType<{
  width: number;
  height: number;
  color?: string;
}>;

function makeSvgTabBarIcon(
  outlineIcon: SvgTabIconComponent,
  filledIcon: SvgTabIconComponent,
): NonNullable<BottomTabNavigationOptions['tabBarIcon']> {
  return function SvgTabBarIcon({color, size, focused}) {
    const Icon = focused ? filledIcon : outlineIcon;
    return <Icon width={size} height={size} color={color} />;
  };
}

type VisibleTabRoute = Exclude<
  keyof MainTabParamList,
  'Search' | 'ProductListing'
>;

const tabBarIconByRoute: Record<
  VisibleTabRoute,
  NonNullable<BottomTabNavigationOptions['tabBarIcon']>
> = {
  Home: makeSvgTabBarIcon(HomeTabSvg, HomeTabFilledSvg),
  Category: makeSvgTabBarIcon(CategoryTabSvg, CategoryTabFilledSvg),
  Reels: makeSvgTabBarIcon(ReelsTabSvg, ReelsTabFilledSvg),
  Cart: makeSvgTabBarIcon(CartTabSvg, CartTabFilledSvg),
  Profile: makeSvgTabBarIcon(ProfileTabSvg, ProfileTabFilledSvg),
};

const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: COLORS.splash,
  tabBarInactiveTintColor: COLORS.black,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.extraLightGray,
    paddingVertical: SPACING.sm,
  },

  tabBarLabelStyle: {
    fontSize: 12,
  },
};

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: tabBarIconByRoute.Home}}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{tabBarIcon: tabBarIconByRoute.Category}}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{tabBarIcon: tabBarIconByRoute.Reels}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarIcon: tabBarIconByRoute.Cart}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{tabBarIcon: tabBarIconByRoute.Profile}}
      />
    </Tab.Navigator>
  );
}
