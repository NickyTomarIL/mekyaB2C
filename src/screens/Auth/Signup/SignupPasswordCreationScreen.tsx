import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface SignupPasswordCreationScreenProps {
  onBack?: () => void;
}

const SignupPasswordCreationScreen: React.FC<SignupPasswordCreationScreenProps> = ({
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Password Creation Screen</Text>
      <Text style={styles.subtitle}>
        Dummy text for SignupPasswordCreationScreen
      </Text>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : null}
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
  backButton: {
    marginTop: 16,
  },
  backText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignupPasswordCreationScreen;
