/**
 * ShotDetailScreen - Individual shot view with technique steps
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { ScrollView } from '../../../shared/components/layout/ScrollView';
import { Button, Pill, ScrollIndicatorContainer } from '../../../shared/components/ui';
import { useShot } from '../hooks/useShots';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

interface ShotDetailScreenProps {
  route: {
    params: { shotId: string };
  };
  navigation: {
    goBack: () => void;
  };
}

export function ShotDetailScreen({ route, navigation }: ShotDetailScreenProps) {
  const { shotId } = route.params;
  const { data: shot, isLoading, error } = useShot(shotId);

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.accentDark} />
        </View>
      </Screen>
    );
  }

  if (error || !shot) {
    return (
      <Screen>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load shot</Text>
          <Button variant="secondary" onPress={navigation.goBack}>
            Go Back
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollIndicatorContainer>
        <ScrollView>
          {/* Hero Image */}
          {shot.imageUrl ? (
            <Image source={shot.imageUrl} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <View style={styles.heroImage} />
          )}

          <View style={styles.content}>
            <Text style={styles.title}>{shot.name}</Text>

            <View style={styles.tags}>
              <Pill label={shot.difficulty} />
            </View>

            <Text style={styles.description}>{shot.description}</Text>

            <Text style={styles.sectionTitle}>Technique</Text>
            {shot.technique.map((step, index) => (
              <View key={step.id} style={styles.techniqueStep}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
                {step.keyPoints && (
                  <View style={styles.keyPoints}>
                    {step.keyPoints.map((point, i) => (
                      <Text key={i} style={styles.keyPoint}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollIndicatorContainer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: colors.primaryText,
  },
  heroImage: {
    width: '100%',
    height: 240,
    backgroundColor: colors.lightGray,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: spacing.xl,
  },
  content: {
    paddingBottom: spacing['3xl'],
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: spacing.base,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.body,
    color: colors.secondaryText,
    marginBottom: spacing['2xl'],
    lineHeight: 24,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.base,
  },
  techniqueStep: {
    marginBottom: spacing.lg,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
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
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryText,
    flex: 1,
  },
  stepDescription: {
    fontSize: 15,
    color: colors.secondaryText,
    marginLeft: 44,
    lineHeight: 21,
  },
  keyPoints: {
    marginLeft: 44,
    marginTop: spacing.xs,
  },
  keyPoint: {
    fontSize: 15,
    color: colors.primaryText,
    lineHeight: 21,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.base,
  },
  errorText: {
    ...typography.body,
    color: colors.secondaryText,
  },
});
