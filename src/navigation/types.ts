import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Bottom tab routes — keep keys aligned with `MainTabNavigator` screen `name` props.
 */
export type MainTabParamList = {
  Home: undefined;
  Category: undefined;
  Reels: undefined;
  Cart: undefined;
  Profile: undefined;
};

/**
 * Root native stack — add auth, modals, or onboarding screens here later.
 */
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
