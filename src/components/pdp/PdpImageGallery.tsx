import COLORS from '@/constants/colors';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import type {PdpGalleryImage} from '@/data/pdpFeed';
import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpImageGalleryProps = {
  images: ReadonlyArray<PdpGalleryImage>;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
};

const PdpImageGallery: React.FC<PdpImageGalleryProps> = ({
  images,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const {width} = useWindowDimensions();
  const [selectedImageId, setSelectedImageId] = useState(images[0]?.id);

  const selectedImage = useMemo(
    () => images.find(image => image.id === selectedImageId) ?? images[0],
    [images, selectedImageId],
  );

  const heroHeight = Math.round(width * 1.05);

  return (
    <View style={styles.container}>
      <View style={styles.heroWrap}>
        {selectedImage ? (
          <Image
            source={selectedImage.image}
            resizeMode="cover"
            style={[styles.heroImage, {height: heroHeight}]}
          />
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onPress={onToggleWishlist}
          style={({pressed}) => [styles.wishlistBtn, pressed && styles.pressed]}>
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={22}
            color={isWishlisted ? '#DC2626' : COLORS.black}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbRow}>
        {images.map(image => {
          const isSelected = image.id === selectedImage?.id;
          return (
            <Pressable
              key={image.id}
              accessibilityRole="button"
              accessibilityLabel="Select product image"
              onPress={() => setSelectedImageId(image.id)}
              style={({pressed}) => [
                styles.thumbWrap,
                isSelected && styles.thumbWrapSelected,
                pressed && styles.pressed,
              ]}>
              <Image source={image.image} resizeMode="cover" style={styles.thumbImage} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  heroWrap: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    backgroundColor: COLORS.extraLightGray,
  },
  wishlistBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbRow: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  thumbWrap: {
    width: 52,
    height: 64,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    overflow: 'hidden',
  },
  thumbWrapSelected: {
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpImageGallery);
