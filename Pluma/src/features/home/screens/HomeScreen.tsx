/**
 * HomeScreen - Landing and grounding space
 *
 * Design Philosophy:
 * - Minimal interaction
 * - Minimal decision-making
 * - Focused on presence rather than action
 * - A calm entry point, not a dashboard
 * - Shows favorited drills for quick access
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../../shared/components/layout/Screen';
import { ScrollView } from '../../../shared/components/layout/ScrollView';
import { Card } from '../../../shared/components/ui/Card';
import { Pill } from '../../../shared/components/ui/Pill';
import { useFavorites } from '../../../app/providers/FavoritesProvider';
import { useDrills } from '../../drills/hooks/useDrills';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

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

export function HomeScreen() {
  const navigation = useNavigation();
  const inspiration = getTodayInspiration();
  const currentHour = new Date().getHours();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { data: drillsData } = useDrills();

  // Filter drills to get only favorites
  const favoriteDrills = React.useMemo(() => {
    if (!drillsData?.drills) return [];
    return drillsData.drills.filter((drill) => favorites.includes(drill.id));
  }, [drillsData?.drills, favorites]);

  // Time-based greeting
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleDrillPress = (drillId: string) => {
    // Navigate to drills tab and then to detail
    (navigation as any).navigate('DrillsTab', {
      screen: 'DrillDetail',
      params: { drillId },
    });
  };

  return (
    <Screen edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with personalized greeting */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, Player</Text>
          <Text style={styles.welcome}>Welcome to Pluma</Text>
        </View>

        {/* Favorite Drills Section */}
        

        {/* Hero card - inspiring visual element */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            {/* Decorative shuttlecock icon */}
            <View style={styles.iconContainer}>
              <View style={styles.shuttleCork} />
              <View style={styles.shuttleFeathers}>
                <View style={[styles.feather, styles.feather1]} />
                <View style={[styles.feather, styles.feather2]} />
                <View style={[styles.feather, styles.feather3]} />
              </View>
            </View>

            <Text style={styles.heroTitle}>Your Journey</Text>
            <Text style={styles.heroSubtitle}>
              Every great player started with the basics.{'\n'}
              Take your time. Enjoy the process.
            </Text>
          </View>
        </View>

        {/* Daily inspiration section */}
        <View style={styles.inspirationSection}>
          <Text style={styles.sectionLabel}>{"TODAY'S FOCUS"}</Text>
          <View style={styles.inspirationCard}>
            <Text style={styles.focusTag}>{inspiration.focus}</Text>
            <Text style={styles.quoteText}>{`"${inspiration.quote}"`}</Text>
          </View>
        </View>

        {favoriteDrills.length > 0 && (
          <View style={styles.favoritesSection}>
            <Text style={styles.sectionLabel}>YOUR FAVORITE DRILLS</Text>
            <View style={styles.favoritesContainer}>
              {favoriteDrills.map((drill) => (
                <Card
                  key={drill.id}
                  onPress={() => handleDrillPress(drill.id)}
                  style={styles.favoriteCard}
                >
                  <View style={styles.favoriteCardInner}>
                    <View style={styles.favoriteCardContent}>
                      <Text style={styles.favoriteCardTitle} numberOfLines={1}>
                        {drill.title}
                      </Text>
                      <View style={styles.favoriteCardTags}>
                        <Pill label={drill.difficulty} />
                      </View>
                    </View>
                    <Card.Favorite
                      isFavorited={isFavorite(drill.id)}
                      onPress={() => toggleFavorite(drill.id)}
                      style={styles.favoriteButton}
                    />
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {/* Bottom spacer for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing['3xl'],
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

  // Favorites Section
  favoritesSection: {
    marginBottom: spacing['2xl'],
  },
  favoritesContainer: {
    gap: spacing.md,
  },
  favoriteCard: {
    backgroundColor: colors.white,
  },
  favoriteCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
  },
  favoriteCardContent: {
    flex: 1,
    gap: spacing.sm,
  },
  favoriteCardTitle: {
    ...typography.h3,
    color: colors.primaryText,
    fontSize: 18,
  },
  favoriteCardTags: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  favoriteButton: {
    position: 'relative',
    top: 0,
    right: 0,
  },

  // Gentle Prompt
  promptSection: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  promptText: {
    ...typography.body,
    color: colors.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Bottom spacer for tab bar
  bottomSpacer: {
    height: 100,
  },
});
