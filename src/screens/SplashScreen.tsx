import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import {MekyaLogo} from '@/assets/icons';
import COLORS from '@/constants/colors';
import type {RootStackParamList} from '@/navigation/types';

const LOGO_SIZE = 160;
const SPLASH_DELAY_MS = 3000;

type SplashNav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNav>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('Login');
    }, SPLASH_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.splash} />
      <MekyaLogo
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        accessible
        accessibilityLabel="Mekya"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.splash,
  },
});

export default SplashScreen;
