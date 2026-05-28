import type {MainTabParamList, RootStackParamList} from '@/navigation/types';
import {useNavigation} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback} from 'react';

type ProductNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type ProductDetailSource = NonNullable<
  RootStackParamList['ProductDetail']
>['source'];

export function useNavigateToProductDetail() {
  const navigation = useNavigation<ProductNavigationProp>();

  return useCallback(
    (productId: string, source?: ProductDetailSource) => {
      navigation.navigate('ProductDetail', {productId, source});
    },
    [navigation],
  );
}
