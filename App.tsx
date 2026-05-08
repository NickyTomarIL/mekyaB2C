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
import { CommandActionableButton } from '@/components/buttons';
import { CommonBoldHeading } from '@/components/common';
import { CommandInputField } from '@/components/inputs';
import { useState } from 'react';
import SplashScreen from '@/screens/SplashScreen';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');

  return (
    <SplashScreen/>
    // <SafeAreaProvider>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <View style={{
    //     padding: 16,
    //     height: '100%'
    //     , marginTop: 20
    //   }}>

    //     <CommonBoldHeading>
    //       System Font (default)
    //     </CommonBoldHeading>
    //     <CommonBoldHeading>
    //       System Font (default)
    //     </CommonBoldHeading>
    //     <CommonBoldHeading>
    //       System Font (default)
    //     </CommonBoldHeading>
    //     <Text style={{ fontFamily: fontFamilies.regular, fontSize: 18 }}> Regular Font </Text>
    //     <Text style={{ fontFamily: fontFamilies.medium, fontSize: 18 }}> Medium Font </Text>
    //     <Text style={{ fontFamily: fontFamilies.semiBold, fontSize: 18 }}> Semi Bold Font </Text>
    //     <Text style={{ fontFamily: fontFamilies.light, fontSize: 18 }}> Light Font </Text>
    //     <CommandActionableButton
    //       label="Add to Cart"
    //       handleClick={() => console.log('clicked')}
    //       icon={<MekyaLogo width={16} height={16} />}
    //       disabled={true}
    //     />
    //     <CommandInputField
    //       title="Email address"
    //       value={email}
    //       onChangeText={setEmail}
    //       placeholder="Enter your email id"
    //     />

    //   </View>

    // </SafeAreaProvider>
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
