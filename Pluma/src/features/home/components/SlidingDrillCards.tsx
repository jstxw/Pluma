/**
 * SlidingDrillCards - Horizontally scrollable drill cards with snap and scale animation
 *
 * Features:
 * - Snaps to center card
 * - Peeks next/previous cards
 * - Scales centered card slightly larger
 * - Smooth animations using Animated API
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Card sizing (matching screenshot proportions)
const CARD_WIDTH = SCREEN_WIDTH * 0.78;
const CARD_HEIGHT = 380;
const SPACING = -20; // Negative spacing for stacked effect
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// Animation constants
const SCALE_CENTER = 1.0;
const SCALE_NEIGHBOR = 0.94;
const TRANSLATE_Y_NEIGHBOR = 10;

export interface FeaturedDrill {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  image: string;
  isFavorite?: boolean;
}

interface SlidingDrillCardsProps {
  drills: FeaturedDrill[];
  onPressCard?: (drill: FeaturedDrill) => void;
  onPressFavorite?: (drill: FeaturedDrill) => void;
}

export function SlidingDrillCards({
  drills,
  onPressCard,
}: SlidingDrillCardsProps) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCard = ({ item, index }: { item: FeaturedDrill; index: number }) => {
    // Calculate input range for this card
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    // Scale animation: center card is larger
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [SCALE_NEIGHBOR, SCALE_CENTER, SCALE_NEIGHBOR],
      extrapolate: 'clamp',
    });

    // Subtle vertical shift for non-centered cards
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [TRANSLATE_Y_NEIGHBOR, 0, TRANSLATE_Y_NEIGHBOR],
      extrapolate: 'clamp',
    });

    // Opacity for subtle fade
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }, { translateY }],
            opacity,
          },
        ]}
      >
        <Pressable
          style={styles.card}
          onPress={() => onPressCard?.(item)}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
        >
          {/* Background Image */}
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          {/* Card Content */}
          <View style={styles.content}>
            {/* Location/Subtitle */}
            <Text style={styles.subtitle}>{item.subtitle}</Text>

            {/* Title */}
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            {/* See More Button */}
            <Pressable
              style={styles.seeMoreButton}
              onPress={() => onPressCard?.(item)}
            >
              <Text style={styles.seeMoreText}>See more</Text>
              <View style={styles.arrowCircle}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={drills}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
        }}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        initialScrollIndex={Math.floor(drills.length / 2)}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: (CARD_WIDTH + SPACING) * index,
          index,
        })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT + 40, // Extra space for scaling
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: SPACING,
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: '#000',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
  },
  subtitle: {
    ...typography.caption,
    color: colors.white,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  title: {
    ...typography.h1,
    fontSize: 32,
    color: colors.white,
    marginBottom: spacing.lg,
    fontWeight: '700',
    lineHeight: 38,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    borderRadius: 32,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  seeMoreText: {
    ...typography.body,
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: '600',
    flex: 1,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryText,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  arrow: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '700',
  },
});
