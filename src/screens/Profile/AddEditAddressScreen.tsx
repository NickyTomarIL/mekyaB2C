import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CommonInputField from '@/components/inputs/CommonInputField';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileStackParamList} from '@/navigation/types';
import {
  createAddressId,
  type ProfileAddress,
} from '@/screens/Profile/profileAddressTypes';
import {SPACING} from '@/theme/spacing';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const INPUT_HEIGHT = 52;

const labelTitleStyle = {
  fontFamily: fontFamilies.semiBold,
  fontSize: 14,
  color: COLORS.black,
};

const fieldValueStyle = {
  color: COLORS.black,
  fontFamily: fontFamilies.regular,
  fontSize: 14,
};

type AddEditNav = NativeStackNavigationProp<
  ProfileStackParamList,
  'AddEditAddress'
>;
type AddEditRoute = RouteProp<ProfileStackParamList, 'AddEditAddress'>;

const emptyForm = {
  fullName: '',
  mobile: '',
  line1: '',
  line2: '',
  landmark: '',
  townCity: '',
  state: '',
  pinCode: '',
  saveAs: '',
};

const AddEditAddressScreen: React.FC = () => {
  const navigation = useNavigation<AddEditNav>();
  const route = useRoute<AddEditRoute>();
  const existing = route.params?.address;

  const initial = useMemo(
    () =>
      existing
        ? {
            fullName: existing.fullName,
            mobile: existing.mobile,
            line1: existing.line1,
            line2: existing.line2,
            landmark: existing.landmark,
            townCity: existing.townCity,
            state: existing.state,
            pinCode: existing.pinCode,
            saveAs: existing.saveAs,
          }
        : emptyForm,
    [existing],
  );

  const [fullName, setFullName] = useState(initial.fullName);
  const [mobile, setMobile] = useState(initial.mobile);
  const [line1, setLine1] = useState(initial.line1);
  const [line2, setLine2] = useState(initial.line2);
  const [landmark, setLandmark] = useState(initial.landmark);
  const [townCity, setTownCity] = useState(initial.townCity);
  const [state, setStateField] = useState(initial.state);
  const [pinCode, setPinCode] = useState(initial.pinCode);
  const [saveAs, setSaveAs] = useState(initial.saveAs);

  const onSave = useCallback(() => {
    const required = [
      fullName.trim(),
      mobile.trim(),
      line1.trim(),
      line2.trim(),
      townCity.trim(),
      state.trim(),
      pinCode.trim(),
      saveAs.trim(),
    ];
    if (required.some(v => !v)) {
      Alert.alert('Required fields', 'Please fill all required fields.');
      return;
    }
    Keyboard.dismiss();
    const payload: ProfileAddress = {
      id: existing?.id ?? createAddressId(),
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      line1: line1.trim(),
      line2: line2.trim(),
      landmark: landmark.trim(),
      townCity: townCity.trim(),
      state: state.trim(),
      pinCode: pinCode.trim(),
      saveAs: saveAs.trim(),
    };
    navigation.navigate({
      name: 'MyAddresses',
      params: {upsertAddress: payload},
      merge: true,
    });
  }, [
    existing?.id,
    fullName,
    line1,
    line2,
    landmark,
    mobile,
    navigation,
    pinCode,
    saveAs,
    state,
    townCity,
  ]);

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
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
            textContentType="name"
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Mobile Number*"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
            textContentType="telephoneNumber"
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Address Line 1*"
            value={line1}
            onChangeText={setLine1}
            placeholder="Add address line 1"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Address Line 2*"
            value={line2}
            onChangeText={setLine2}
            placeholder="Add address line 2"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="e.g. near metro station"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Town/City*"
            value={townCity}
            onChangeText={setTownCity}
            placeholder="Enter town/city"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
            textContentType="addressCity"
          />
          <View style={styles.gap} />
          <CommonInputField
            title="State*"
            value={state}
            onChangeText={setStateField}
            placeholder="Enter state"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
            textContentType="addressState"
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Pin Code*"
            value={pinCode}
            onChangeText={setPinCode}
            placeholder="Enter pin code"
            keyboardType="number-pad"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
            textContentType="postalCode"
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Save as*"
            value={saveAs}
            onChangeText={setSaveAs}
            placeholder="Home, shop, warehouse...etc."
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={fieldValueStyle}
          />
          <CommonActionableButton
            label="Save"
            handleClick={onSave}
            height={52}
            containerStyle={styles.saveButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  gap: {
    height: SPACING.lg,
  },
  saveButton: {
    borderRadius: 4,
    marginTop: SPACING.xxl,
    backgroundColor: COLORS.addressFormSave,
  },
});

export default AddEditAddressScreen;
