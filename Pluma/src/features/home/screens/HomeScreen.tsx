/**
 * HomeScreen - Landing and grounding space
 *
 * Design Philosophy:
 * - Minimal interaction
 * - Minimal decision-making
 * - Focused on presence rather than action
 * - A calm entry point, not a dashboard
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { ScrollView } from '../../../shared/components/layout/ScrollView';
import { ScrollIndicatorContainer } from '../../../shared/components/ui';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import { SlidingDrillCards, CategoryBox, Accordion } from '../components';
import { featuredDrills } from '../data/featuredDrills';
import { faqData } from '../data/faqData';
import type { HomeScreenProps } from '../../../app/navigation/types';

// Daily inspiration quotes for badminton players
const INSPIRATIONS = [
  { quote: 'Every shot is a chance to improve.', focus: 'Consistency' },
  { quote: 'Footwork is the foundation of every great player.', focus: 'Movement' },
  { quote: 'The shuttle waits for no one. Be ready.', focus: 'Reaction' },
  { quote: 'Practice with purpose, play with passion.', focus: 'Mindset' },
  { quote: 'Small improvements lead to big results.', focus: 'Progress' },
];

// Get today's inspiration based on date
function getTodayInspiration() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return INSPIRATIONS[dayOfYear % INSPIRATIONS.length];
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const inspiration = getTodayInspiration();
  const currentHour = new Date().getHours();

  // Time-based greeting
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleDrillPress = (drill: any) => {
    // Navigate to specific drill detail page
    navigation.navigate('DrillsTab', { 
      screen: 'DrillDetail',
      params: { drillId: drill.id }
    });
  };

  const handleFavoritePress = (drill: any) => {
    console.log('Favorite toggled:', drill.title);
    // TODO: Toggle favorite in state/storage
  };

  const handleCategoryPress = (category: string) => {
    if (category === 'Footwork') {
      // Navigate to drills with footwork tag filter
      navigation.navigate('DrillsTab', {
        screen: 'DrillsList',
        params: { tagFilter: 'tag-footwork' }
      });
    } else if (category === 'Accuracy') {
      // Navigate to drills with accuracy tag filter
      navigation.navigate('DrillsTab', {
        screen: 'DrillsList',
        params: { tagFilter: 'tag-accuracy' }
      });
    } else if (category === 'Control') {
      // Navigate to drills with control tag filter
      navigation.navigate('DrillsTab', {
        screen: 'DrillsList',
        params: { tagFilter: 'tag-control' }
      });
    } else if (category === 'Power') {
      // Navigate to drills with power tag filter
      navigation.navigate('DrillsTab', {
        screen: 'DrillsList',
        params: { tagFilter: 'tag-power' }
      });
    } else {
      console.log('Category pressed:', category);
      // TODO: Navigate to other category screens
    }
  };

  return (
    <Screen edges={['top']}>
      <ScrollIndicatorContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with personalized greeting */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{getGreeting()}, Player</Text>
            <Text style={styles.welcome}>Welcome to Pluma</Text>
          </View>

          {/* Featured Drills - Sliding Cards */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionLabel}>FEATURED DRILLS</Text>
            <SlidingDrillCards
              drills={featuredDrills}
              onPressCard={handleDrillPress}
              onPressFavorite={handleFavoritePress}
            />
          </View>

          {/* Category Boxes */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionLabel}>EXPLORE DRILLS</Text>
            <View style={styles.categoryGrid}>
              <CategoryBox
                title="Footwork"
                backgroundColor="#FFFFFF"
                onPress={() => handleCategoryPress('Footwork')}
              />
              <CategoryBox
                title="Accuracy"
                backgroundColor="#FFFFFF"
                onPress={() => handleCategoryPress('Accuracy')}
              />
              <CategoryBox
                title="Control"
                backgroundColor="#FFFFFF"
                onPress={() => handleCategoryPress('Control')}
              />
              <CategoryBox
                title="Power"
                backgroundColor="#FFFFFF"
                onPress={() => handleCategoryPress('Power')}
              />
            </View>
          </View>

          {/* Common Questions (FAQ) */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionLabel}>COMMON QUESTIONS</Text>
            <Accordion items={faqData} />
          </View>

          {/* Bottom spacer for tab bar */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </ScrollIndicatorContainer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  greeting: {
    ...typography.greeting,
    color: colors.primaryText,
  },
  welcome: {
    ...typography.welcomeSubtitle,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },

  // Featured Section
  featuredSection: {
    marginBottom: spacing['2xl'],
  },

  // Categories Section
  categoriesSection: {
    marginBottom: spacing['2xl'],
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // FAQ Section
  faqSection: {
    marginBottom: spacing['2xl'],
  },

  // Hero Card
  heroCard: {
    backgroundColor: colors.accentDark,
    borderRadius: borderRadius.card,
    padding: spacing['2xl'],
    minHeight: 280,
    marginBottom: spacing['2xl'],
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Decorative shuttlecock icon
  iconContainer: {
    alignItems: 'center',
    opacity: 0.9,
  },
  shuttleCork: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  shuttleFeathers: {
    flexDirection: 'row',
    marginTop: -4,
  },
  feather: {
    width: 16,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  feather1: {
    transform: [{ rotate: '-15deg' }],
  },
  feather2: {
    height: 44,
  },
  feather3: {
    transform: [{ rotate: '15deg' }],
  },

  // Daily Inspiration
  inspirationSection: {
    marginBottom: spacing['2xl'],
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.secondaryText,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  inspirationCard: {
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.card,
    padding: spacing.xl,
  },
  focusTag: {
    ...typography.caption,
    color: colors.accentDark,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  quoteText: {
    ...typography.body,
    color: colors.primaryText,
    fontStyle: 'italic',
    lineHeight: 26,
  },

  // Bottom spacer for tab bar
  bottomSpacer: {
    height: 100,
  },
});
