/**
 * Accordion - Q&A FAQ Component with pill-shaped headers
 * Features:
 * Pill-shaped question headers
 * Rotating chevron icon
 * Smooth expand/collapse animation
 * Single-open behavior
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionItemProps {
  item: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isExpanded, onToggle }: AccordionItemProps) {
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(isExpanded ? 1 : 0, { duration: 200 });
  }, [isExpanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
      },
    ],
  }));

  return (
    <View style={styles.itemContainer}>
      {/* Question Header (Pill) */}
      <Pressable
        style={[styles.header, isExpanded && styles.headerExpanded]}
        onPress={onToggle}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
      >
        <Text
          style={[styles.question, isExpanded && styles.questionExpanded]}
          numberOfLines={2}
        >
          {item.question}
        </Text>
        <Animated.View style={chevronStyle}>
          <Text style={styles.chevron}>▼</Text>
        </Animated.View>
      </Pressable>

      {/* Answer (Expandable) */}
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
}

interface AccordionProps {
  items: FAQItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isExpanded={expandedId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  itemContainer: {
    // Individual item wrapper
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    height: 60,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  headerExpanded: {
    backgroundColor: colors.primaryText,
    borderColor: colors.primaryText,
  },
  question: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    flex: 1,
  },
  questionExpanded: {
    color: colors.white,
  },
  chevron: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: '700',
  },
  answerContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  answer: {
    ...typography.body,
    fontSize: 15,
    color: colors.primaryText,
    lineHeight: 24,
  },
});
