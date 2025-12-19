/**
 * DrillDetailScreen - Individual drill view with instructions
 *
 * Design Philosophy:
 * - Immersive but not heavy
 * - Clear sense of entering a deeper layer
 * - No competing navigation elements
 * - Large, readable text area as primary focus
 * - Balance text density with visual breathing room
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Pill } from '../../../shared/components/ui/Pill';
import { InstructionList } from '../components/InstructionList';
import { useDrill } from '../hooks/useDrills';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import { formatDuration, formatDifficulty, formatDrillType } from '../../../shared/utils/formatting';
import type { DrillDetailScreenProps } from '../../../app/navigation/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.4;
const CONTENT_OVERLAP = 40;

export function DrillDetailScreen({ route, navigation }: DrillDetailScreenProps) {
  const { drillId } = route.params;
  const { data: drill, isLoading, error } = useDrill(drillId);
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for hero image parallax effect
  const heroAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.2, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT],
      [0, HERO_HEIGHT * 0.5],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  // Animated style for back button opacity
  const backButtonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT - 100],
      [1, 0.9],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color={colors.accentDark} />
        <Text style={styles.loadingText}>Loading drill...</Text>
      </View>
    );
  }

  if (error || !drill) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Unable to load drill</Text>
          <Text style={styles.errorText}>
            {"Something went wrong. Please try again."}
          </Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero Image with Gradient Overlay */}
      <Animated.View style={[styles.heroContainer, heroAnimatedStyle]}>
        <View style={styles.heroImage}>
          {/* Gradient overlay for text readability */}
          <View style={styles.heroGradient} />

          {/* Decorative pattern for visual interest */}
          <View style={styles.heroPattern}>
            <View style={styles.patternCircle} />
            <View style={[styles.patternCircle, styles.patternCircle2]} />
            <View style={[styles.patternCircle, styles.patternCircle3]} />
          </View>

          {/* Drill type indicator on hero */}
          <View style={styles.heroTypeContainer}>
            <Text style={styles.heroTypeText}>
              {formatDrillType(drill.type).toUpperCase()}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Back Button Overlay */}
      <Animated.View
        style={[
          styles.backButtonContainer,
          { top: insets.top + 12 },
          backButtonAnimatedStyle,
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonIcon}>{"←"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Spacer for hero image */}
        <View style={{ height: HERO_HEIGHT - CONTENT_OVERLAP }} />

        {/* Content Card - Overlaps Hero */}
        <View style={styles.contentCard}>
          {/* Title and Difficulty Row */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{drill.title}</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>
                {formatDifficulty(drill.difficulty)}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {drill.tags.slice(0, 4).map((tag) => (
              <Pill key={tag.id} label={tag.name} size="small" />
            ))}
            {drill.estimatedDuration && (
              <Pill
                label={formatDuration(drill.estimatedDuration)}
                size="small"
                variant="outlined"
              />
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{drill.description}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Instructions Section */}
          <View style={styles.instructionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              <Text style={styles.stepCount}>
                {drill.instructions.length} steps
              </Text>
            </View>

            <InstructionList instructions={drill.instructions} />
          </View>

          {/* Tips Section (if available) */}
          {drill.tags.length > 0 && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Training Focus</Text>
              <View style={styles.tipsContainer}>
                {drill.tags
                  .filter((tag) => tag.category === 'training_focus')
                  .map((tag) => (
                    <View key={tag.id} style={styles.tipItem}>
                      <View style={styles.tipDot} />
                      <Text style={styles.tipText}>{tag.name}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}

          {/* Bottom Spacer */}
          <View style={{ height: insets.bottom + 40 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: spacing.base,
  },
  loadingText: {
    ...typography.body,
    color: colors.secondaryText,
  },

  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  errorContent: {
    alignItems: 'center',
    gap: spacing.base,
  },
  errorTitle: {
    ...typography.h2,
    color: colors.primaryText,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: colors.accentDark,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.button,
    marginTop: spacing.base,
  },
  errorButtonText: {
    ...typography.button,
    color: colors.white,
  },

  // Hero Section
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
    zIndex: 0,
  },
  heroImage: {
    flex: 1,
    backgroundColor: colors.accentDark,
    overflow: 'hidden',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // Simulate gradient with layered views
  },
  heroPattern: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  patternCircle2: {
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -50,
    right: -100,
  },
  patternCircle3: {
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: 20,
    left: -50,
  },
  heroTypeContainer: {
    position: 'absolute',
    bottom: CONTENT_OVERLAP + 20,
    left: spacing.lg,
  },
  heroTypeText: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 2,
    fontWeight: '600',
  },

  // Back Button
  backButtonContainer: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButtonIcon: {
    fontSize: 24,
    color: colors.primaryText,
    marginLeft: -2, // Optical adjustment
  },

  // Scroll Content
  scrollContent: {
    flexGrow: 1,
  },

  // Content Card
  contentCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    minHeight: SCREEN_HEIGHT - HERO_HEIGHT + CONTENT_OVERLAP + 100,
    // Subtle shadow for depth
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },

  // Title Row
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
    gap: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    flex: 1,
    fontSize: 28,
  },
  difficultyBadge: {
    backgroundColor: colors.accentDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  // Description
  descriptionContainer: {
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.body,
    color: colors.secondaryText,
    lineHeight: 26,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: spacing.xl,
  },

  // Instructions Section
  instructionsSection: {
    marginBottom: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primaryText,
  },
  stepCount: {
    ...typography.caption,
    color: colors.secondaryText,
  },

  // Tips Section
  tipsSection: {
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    marginTop: spacing.base,
  },
  tipsTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
  tipsContainer: {
    gap: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentDark,
  },
  tipText: {
    ...typography.body,
    color: colors.secondaryText,
  },
});
