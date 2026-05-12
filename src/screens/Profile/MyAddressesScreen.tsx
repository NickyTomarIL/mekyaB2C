import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import AddressCard from '@/components/profile/AddressCard';
import COLORS from '@/constants/colors';
import type {ProfileStackParamList} from '@/navigation/types';
import type {ProfileAddress} from '@/screens/Profile/profileAddressTypes';
import {SPACING} from '@/theme/spacing';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SEED_ADDRESSES: ProfileAddress[] = [
  {
    id: 'seed-1',
    fullName: 'Hardik Tiwari',
    mobile: '9876543210',
    line1: 'Shop 12, 2nd Floor',
    line2: 'Green Valley Complex',
    landmark: 'Opposite Trinity Metro Station',
    townCity: 'Gurugram',
    state: 'Haryana',
    pinCode: '122001',
    saveAs: 'Home',
  },
  {
    id: 'seed-2',
    fullName: 'Shrey',
    mobile: '9123456780',
    line1: 'Plot 45, Industrial Area',
    line2: 'Phase 2',
    landmark: '',
    townCity: 'New Delhi',
    state: 'Delhi',
    pinCode: '110020',
    saveAs: 'Shop',
  },
];

type MyAddressesNav = NativeStackNavigationProp<
  ProfileStackParamList,
  'MyAddresses'
>;
type MyAddressesRoute = RouteProp<ProfileStackParamList, 'MyAddresses'>;

const MyAddressesScreen: React.FC = () => {
  const navigation = useNavigation<MyAddressesNav>();
  const route = useRoute<MyAddressesRoute>();
  const [addresses, setAddresses] = useState<ProfileAddress[]>(SEED_ADDRESSES);
  const [selectedId, setSelectedId] = useState<string>(
    SEED_ADDRESSES[0]?.id ?? '',
  );

  useEffect(() => {
    setSelectedId(current => {
      if (addresses.some(a => a.id === current)) {
        return current;
      }
      return addresses[0]?.id ?? '';
    });
  }, [addresses]);

  useFocusEffect(
    useCallback(() => {
      const upsert = route.params?.upsertAddress;
      if (!upsert) {
        return;
      }
      setAddresses(prev => {
        const index = prev.findIndex(a => a.id === upsert.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = upsert;
          return next;
        }
        return [...prev, upsert];
      });
      setSelectedId(upsert.id);
      navigation.setParams({upsertAddress: undefined});
    }, [navigation, route.params?.upsertAddress]),
  );

  const onAddPress = useCallback(() => {
    navigation.navigate('AddEditAddress', {});
  }, [navigation]);

  const onEdit = useCallback(
    (address: ProfileAddress) => {
      navigation.navigate('AddEditAddress', {address});
    },
    [navigation],
  );

  const onRemove = useCallback((address: ProfileAddress) => {
    Alert.alert(
      'Remove address',
      `Remove ${address.fullName} from saved addresses?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(a => a.id !== address.id));
          },
        },
      ],
    );
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {addresses.map(addr => (
            <AddressCard
              key={addr.id}
              address={addr}
              selected={selectedId === addr.id}
              onSelect={() => setSelectedId(addr.id)}
              onEdit={() => onEdit(addr)}
              onRemove={() => onRemove(addr)}
            />
          ))}
        </View>
        <CommonActionableButton
          label="Add New address"
          handleClick={onAddPress}
          height={52}
          containerStyle={styles.addButton}
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
  scroll: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  list: {
    alignSelf: 'stretch',
  },
  addButton: {
    borderRadius: 4,
    marginTop: SPACING.sm,
  },
});

export default MyAddressesScreen;
