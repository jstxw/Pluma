/**
 * InstructionList component for displaying drill steps
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { Instruction } from '../../../types';

interface InstructionListProps {
  instructions: Instruction[];
}

export function InstructionList({ instructions }: InstructionListProps) {
  return (
    <View style={styles.container}>
      {instructions.map((instruction, index) => (
        <View key={instruction.id} style={styles.item}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{instruction.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accentDark,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 2,
  },
  text: {
    fontSize: 15,
    color: colors.primaryText,
    lineHeight: 21,
  },
});
