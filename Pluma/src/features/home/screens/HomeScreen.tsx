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
  const inspiration = getTodayInspiration();
  const currentHour = new Date().getHours();

  // Time-based greeting
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Screen edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with personalized greeting */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, Player</Text>
          <Text style={styles.welcome}>Welcome to Pluma</Text>
        </View>


        {/* Daily inspiration section */}
        <View style={styles.inspirationSection}>
          <Text style={styles.sectionLabel}>{"TODAY'S FOCUS"}</Text>
          <View style={styles.inspirationCard}>
            <Text style={styles.focusTag}>{inspiration.focus}</Text>
            <Text style={styles.quoteText}>{`"${inspiration.quote}"`}</Text>
          </View>
        </View>

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

  // Bottom spacer for tab bar
  bottomSpacer: {
    height: 100,
  },
});
