import React from 'react';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Cart as CartTabSvg,
  Home as HomeTabSvg,
  Reels as ReelsTabSvg,
} from '@/assets/icons';
import COLORS from '@/constants/colors';
import type {MainTabParamList} from '@/navigation/types';
import {ProfileStackNavigator} from '@/navigation/ProfileStackNavigator';
import CartScreen from '@/screens/Cart/CartScreen';
import CategoryScreen from '@/screens/Category/CategoryScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import ReelsScreen from '@/screens/Reels/ReelsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

type IonTabRoute = Exclude<keyof MainTabParamList, 'Home' | 'Reels' | 'Cart'>;

const ION_TAB_ICON: Record<
  IonTabRoute,
  {focused: TabIconName; inactive: TabIconName}
> = {
  Category: {focused: 'grid', inactive: 'grid-outline'},
  Profile: {focused: 'person', inactive: 'person-outline'},
};

function makeIonTabBarIcon(
  routeName: IonTabRoute,
): NonNullable<BottomTabNavigationOptions['tabBarIcon']> {
  return function TabBarIcon({color, size, focused}) {
    const icons = ION_TAB_ICON[routeName];
    const name = focused ? icons.focused : icons.inactive;
    return <Ionicons name={name} size={size} color={color} />;
  };
}

type SvgTabIconComponent = React.ComponentType<{
  width: number;
  height: number;
  color?: string;
}>;

function makeSvgTabBarIcon(
  Icon: SvgTabIconComponent,
): NonNullable<BottomTabNavigationOptions['tabBarIcon']> {
  return function SvgTabBarIcon({color, size}) {
    return <Icon width={size} height={size} color={color} />;
  };
}

const tabBarIconByRoute: Record<
  keyof MainTabParamList,
  NonNullable<BottomTabNavigationOptions['tabBarIcon']>
> = {
  Home: makeSvgTabBarIcon(HomeTabSvg),
  Category: makeIonTabBarIcon('Category'),
  Reels: makeSvgTabBarIcon(ReelsTabSvg),
  Cart: makeSvgTabBarIcon(CartTabSvg),
  Profile: makeIonTabBarIcon('Profile'),
};

const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: COLORS.splash,
  tabBarInactiveTintColor: COLORS.black,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
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
