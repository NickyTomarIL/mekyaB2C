import {MekyaLogoAuth} from '@/assets/icons';
import COLORS from '@/constants/colors';
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface AuthSignupModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

const AuthSignupModal: React.FC<AuthSignupModalProps> = ({
  visible,
  onClose,
  children,
  contentContainerStyle,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <MekyaLogoAuth width={120} height={20} />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close signup"
            onPress={onClose}
            style={({pressed}) => [styles.closeButton, {opacity: pressed ? 0.7 : 1}]}>
            <Ionicons name="close" size={20} color={COLORS.darkGray} />
          </Pressable>
        </View>

        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderInput,
    paddingHorizontal: 16,
  },
  titleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});

export default AuthSignupModal;
