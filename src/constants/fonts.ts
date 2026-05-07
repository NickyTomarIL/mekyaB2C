import { isIOS } from "@/utils/helpers";

export const fontFamilies = {
  light: isIOS() ? 'Poppins-Light' : 'PoppinsLight',
  regular: isIOS() ? 'Poppins-Regular' : 'PoppinsRegular',
  medium: isIOS() ? 'Poppins-Medium' : 'PoppinsMedium',
  semiBold: isIOS() ? 'Poppins-SemiBold' : 'PoppinsSemiBold',
  bold: isIOS() ? 'Poppins-Bold' : 'PoppinsBold',
} as const;

export type FontFamilyKey = keyof typeof fontFamilies;