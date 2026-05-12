import CategorySidebarItem from '@/components/category/CategorySidebarItem';
import CategorySubcategoryTile from '@/components/category/CategorySubcategoryTile';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {
  MAIN_CATEGORIES,
  SUBCATEGORIES_BY_MAIN,
} from '@/screens/Category/categoryScreenData';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CategoryScreen: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('womens');

  const sections = useMemo(
    () => SUBCATEGORIES_BY_MAIN[selectedId] ?? SUBCATEGORIES_BY_MAIN.womens,
    [selectedId],
  );

  const onSelectMain = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>Category</CustomText>
      </View>
      <View style={styles.headerDivider} />

      <View style={styles.body}>
        <View style={styles.sidebar}>
          <FlatList
            style={styles.sidebarFlatList}
            data={MAIN_CATEGORIES}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sidebarList}
            renderItem={({item}) => (
              <CategorySidebarItem
                label={item.label}
                selected={item.id === selectedId}
                onPress={() => onSelectMain(item.id)}
              />
            )}
          />
        </View>

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}>
          {sections.map(section => (
            <View key={section.id} style={styles.section}>
              <CustomText style={styles.sectionTitle}>{section.title}</CustomText>
              <View style={styles.grid}>
                {section.items.map(sub => (
                  <CategorySubcategoryTile
                    key={sub.id}
                    label={sub.label}
                    onPress={() => undefined}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const SIDEBAR_WIDTH = 112;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: COLORS.black,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#F7F7F7',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  sidebarFlatList: {
    flex: 1,
  },
  sidebarList: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxxl,
  },
  contentScroll: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentInner: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
});

export default CategoryScreen;
