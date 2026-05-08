import CustomText from '@/components/common/CustomText';
import ProfileMenuItem from '@/components/profile/ProfileMenuItem';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ProfileMenuNavigation = NativeStackNavigationProp<
  ProfileStackParamList,
  'ProfileMenu'
>;

const ICON_SIZE = 22;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileMenuNavigation>();

  const onLogout = useCallback(() => {
    Alert.alert('Logout', 'You will be signed out.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => undefined,
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>Profile</CustomText>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ProfileMenuItem
          icon={
            <Ionicons
              name="person-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="My Profile"
          onPress={() => navigation.navigate('MyProfile')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="document-text-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="Order History"
          onPress={() => navigation.navigate('OrderHistory')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="document-text-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="Wishlist"
          onPress={() => navigation.navigate('Wishlist')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="location-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="My Addresses"
          onPress={() => navigation.navigate('MyAddresses')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="Security"
          onPress={() => navigation.navigate('Security')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="videocam-outline"
              size={ICON_SIZE}
              color={COLORS.black}
            />
          }
          label="Saved Reels"
          onPress={() => navigation.navigate('SavedReels')}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="power-outline"
              size={ICON_SIZE}
              color={COLORS.red}
            />
          }
          label="Logout"
          destructive
          onPress={onLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 20,
    color: COLORS.black,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
});

export default ProfileScreen;
