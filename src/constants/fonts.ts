import { isIOS } from "@/utils/helpers";

export const fontFamilies = {
  light: isIOS() ? 'Poppins-Light' : 'Poppins-Light',
  regular: isIOS() ? 'Poppins-Regular' : 'Poppins-Regular',
  medium: isIOS() ? 'Poppins-Medium' : 'Poppins-Medium',
  semiBold: isIOS() ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
  bold: isIOS() ? 'Poppins-Bold' : 'Poppins-Bold',
  heading: isIOS()
    ? 'NunitoSans-VariableFont_YTLC,opsz,wdth,wght'
    : 'NunitoSans-VariableFont_YTLC,opsz,wdth,wght',
} as const;

export type FontFamilyKey = keyof typeof fontFamilies;