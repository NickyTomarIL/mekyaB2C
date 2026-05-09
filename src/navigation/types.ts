import type { NavigatorScreenParams } from '@react-navigation/native';

import type { ProfileAddress } from '@/screens/Profile/profileAddressTypes';
import type {ProfileOrder} from '@/screens/Profile/profileOrderTypes';

/**
 * Profile tab — stack of menu + detail placeholders.
 */
export type ProfileStackParamList = {
  ProfileMenu: undefined;
  MyProfile: undefined;
  OrderHistory: undefined;
  OrderDetails: {order: ProfileOrder};
  Wishlist: undefined;
  MyAddresses: { upsertAddress?: ProfileAddress } | undefined;
  AddEditAddress: { address?: ProfileAddress } | undefined;
  Security: undefined;
  SavedReels: undefined;
};

/**
 * Bottom tab routes — keep keys aligned with `MainTabNavigator` screen `name` props.
 */
export type MainTabParamList = {
  Home: undefined;
  Category: undefined;
  Reels: undefined;
  Cart: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

/**
 * Root native stack — splash → auth → main app.
 */
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPasswordEmail: undefined;
  LoginWithPhone: undefined;
  PhoneOTPVerification: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
