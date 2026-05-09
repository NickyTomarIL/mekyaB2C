import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OrderHistoryEmptyState from '@/components/profile/OrderHistoryEmptyState';
import OrderHistoryCard from '@/components/profile/OrderHistoryCard';
import COLORS from '@/constants/colors';
import type {ProfileStackParamList} from '@/navigation/types';
import type {ProfileOrder} from '@/screens/Profile/profileOrderTypes';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

type OrderHistoryNavigation = NativeStackNavigationProp<
  ProfileStackParamList,
  'OrderHistory'
>;

const MOCK_ORDERS: ProfileOrder[] = [];

const OrderHistoryScreen: React.FC = () => {
  const navigation = useNavigation<OrderHistoryNavigation>();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <OrderHistoryCard
            order={item}
            onViewDetails={() => navigation.navigate('OrderDetails', {order: item})}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <OrderHistoryEmptyState onExploreProducts={() => navigation.navigate('ProfileMenu')} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  listContent: {
    paddingBottom: SPACING.xxxl,
  },
  separator: {
    height: SPACING.lg,
  },
});

export default OrderHistoryScreen;
