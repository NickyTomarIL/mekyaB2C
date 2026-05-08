import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ForgotPasswordMethodScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Method Screen</Text>
      <Text style={styles.subtitle}>
        Dummy text for ForgotPasswordMethodScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default ForgotPasswordMethodScreen;
