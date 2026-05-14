import type {ImageSourcePropType} from 'react-native';

/** Circular “logo” placeholders for the Reels style strip (replace with brand assets when available). */
export const STYLE_STORY_BRANDS: ReadonlyArray<{
  id: string;
  name: string;
  logo: ImageSourcePropType;
}> = [
  {id: 'b1', name: 'Adidas', logo: require('@/assets/images/brandLogo1.png')},
  {id: 'b2', name: 'Dior', logo: require('@/assets/images/brandLogo2.png')},
  {id: 'b3', name: 'Puma', logo: require('@/assets/images/brandLogo3.png')},
  {id: 'b4', name: 'Louis Vuitton', logo: require('@/assets/images/brandLogo4.png')},
  {id: 'b5', name: 'Louis Vuitton', logo: require('@/assets/images/brandLogo4.png')},
];
