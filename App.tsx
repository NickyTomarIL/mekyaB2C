/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { MekyaLogo } from './src/assets/icons';
import { fontFamilies } from '@/constants/fonts';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
      {/* Example: Display some text components with different font families */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontFamily: fontFamilies.bold, fontSize: 18 }}>
          System Font (default)
        </Text>
        <Text style={{ fontFamily: fontFamilies.regular, fontSize: 18 }}> Regular Font </Text>
        <Text style={{ fontFamily: fontFamilies.medium, fontSize: 18 }}> Medium Font </Text>
        <Text style={{ fontFamily: fontFamilies.semiBold, fontSize: 18 }}> Semi Bold Font </Text>
        <Text style={{ fontFamily: fontFamilies.light, fontSize: 18 }}> Light Font </Text>
      </View>

    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
