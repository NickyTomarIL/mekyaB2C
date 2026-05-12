import { EditIcon } from '@/assets/icons';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CommonInputField from '@/components/inputs/CommonInputField';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const INPUT_HEIGHT = 52;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  form: {
    alignSelf: 'stretch',
  },
  fieldGap: {
    height: SPACING.lg,
  },
  fieldLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  /** Read-only / view mode value color. */
  fieldValue: {
    color: COLORS.textMuted,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
  },
  /** Editable mode — stronger contrast while typing. */
  fieldValueEditing: {
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
  },
  editButton: {
    borderRadius: 4,
    marginTop: SPACING.xxl,
  },
});

const MyProfileScreen: React.FC = () => {
  const [fullName, setFullName] = useState('Jatin pant');
  const [email, setEmail] = useState('jatinpant4@gmail.com');
  const [mobile, setMobile] = useState('8920851547');
  const [isEditing, setIsEditing] = useState(false);

  const onPrimaryAction = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    Keyboard.dismiss();
    // Persist profile when API is wired.
    setIsEditing(false);
  }, [isEditing]);

  const fieldInputStyle = isEditing ? styles.fieldValueEditing : styles.fieldValue;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CommonInputField
            title="Full Name*"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            height={INPUT_HEIGHT}
            labelStyle={styles.fieldLabel}
            inputStyle={fieldInputStyle}
            textContentType="name"
            editable={isEditing}
          />
          <View style={styles.fieldGap} />
          <CommonInputField
            title="Email*"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            height={INPUT_HEIGHT}
            labelStyle={styles.fieldLabel}
            inputStyle={fieldInputStyle}
            textContentType="emailAddress"
            editable={isEditing}
          />
          <View style={styles.fieldGap} />
          <CommonInputField
            title="Mobile Number*"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            height={INPUT_HEIGHT}
            labelStyle={styles.fieldLabel}
            inputStyle={fieldInputStyle}
            textContentType="telephoneNumber"
            editable={isEditing}
          />
          <CommonActionableButton
            label={isEditing ? 'Save Details' : 'Edit Details'}
            handleClick={onPrimaryAction}
            height={52}
            icon={
              !isEditing ? 
                <EditIcon width={20} height={20} color={COLORS.white} />
               : 
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={COLORS.white}
                />
            }
            containerStyle={styles.editButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyProfileScreen;
