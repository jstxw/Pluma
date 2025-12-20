/**
 * TrainingScreen - Training tab with 3D model viewer
 *
 * Features:
 * - Interactive 3D GLB model viewer
 * - Touch gestures for rotation and zoom
 * - Vertical zoom slider on left side
 * - Model animations support
 *
 * To add your GLB model:
 * 1. Place your .glb file in assets/models/
 * 2. Update the MODEL_SOURCE below with require('./path/to/your/model.glb')
 *    or use a remote URL string
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Screen } from '../../../shared/components/layout/Screen';
import { ModelViewer, BottomSheet } from '../../../shared/components/ui';
import type { Hotspot3D } from '../../../shared/components/ui';
import { useGLBModel } from '../../../shared/hooks';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import { findMuscleGroupById, type MuscleGroup } from '../data/muscleTraining';

// 3D Hotspot positions (relative to model center after scaling to ~2 units)
// Adjust these x, y, z values based on your model's pose
// x: left(-) / right(+), y: down(-) / up(+), z: back(-) / front(+)
// z should be positive (in front) so hotspots are clickable
const HOTSPOTS_3D: Hotspot3D[] = [
  { id: 'shoulder', position: { x: 0.15, y: 0.4, z: 0.4 } },
  { id: 'forearm', position: { x: -0.4, y: 0.5, z: 0.4 } },
  { id: 'wrist', position: { x: -0.5, y: 0.6, z: 0.4 } },
  { id: 'legs', position: { x: 0.1, y: 0, z: 1 } },
];

// Local asset
const MODEL_SOURCE = Asset.fromModule(require('../../../../assets/models/Meshy_AI_Badminton_Motion_1219191436_generate.glb')).uri;

// Slider constants
const SLIDER_WIDTH = 4;
const SLIDER_THUMB_SIZE = 24;
const SLIDER_TRACK_PADDING = 16;

export function TrainingScreen() {
  const { modelUri, isLoading, error } = useGLBModel(MODEL_SOURCE);
  const [zoom, setZoom] = useState(0.5);
  const [sliderHeight, setSliderHeight] = useState(200);

  // Bottom sheet state
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Animated thumb position
  const thumbPosition = useSharedValue(0.5);

  const handleAnimationsLoaded = (animations: THREE.AnimationClip[]) => {
    console.log('Available animations:', animations.map((a) => a.name));
  };

  // Handle hotspot press - find muscle group and show bottom sheet
  const handleHotspotPress = useCallback((hotspotId: string) => {
    const muscleGroup = findMuscleGroupById(hotspotId);
    if (muscleGroup) {
      setSelectedMuscle(muscleGroup);
      setSelectedHotspot(hotspotId);
      setSheetVisible(true);
    }
  }, []);

  // Handle bottom sheet dismiss
  const handleDismissSheet = useCallback(() => {
    setSheetVisible(false);
    setSelectedHotspot(null);
  }, []);

  // Handle slider layout to get height
  const onSliderLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setSliderHeight(height - SLIDER_TRACK_PADDING * 2 - SLIDER_THUMB_SIZE);
  }, []);

  // Handle pan gesture for slider
  const onSliderPan = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === State.ACTIVE || event.nativeEvent.state === State.BEGAN) {
        const { y } = event.nativeEvent;
        // Calculate position (inverted: top = 1, bottom = 0)
        const trackStart = SLIDER_TRACK_PADDING + SLIDER_THUMB_SIZE / 2;
        const normalizedY = Math.max(0, Math.min(sliderHeight, y - trackStart));
        const newZoom = 1 - (normalizedY / sliderHeight);

        setZoom(newZoom);
        thumbPosition.value = newZoom;
      }
    },
    [sliderHeight, thumbPosition]
  );

  // Animated thumb style
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const topPosition = SLIDER_TRACK_PADDING + (1 - thumbPosition.value) * sliderHeight;
    return {
      top: topPosition - SLIDER_THUMB_SIZE / 2,
    };
  });

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Training</Text>
        <Text style={styles.subtitle}>Interactive 3D Model</Text>
      </View>

      <View style={styles.modelWrapper}>
        {/* Vertical Zoom Slider */}
        <GestureHandlerRootView style={styles.sliderContainer}>
          <PanGestureHandler onGestureEvent={onSliderPan}>
            <View style={styles.sliderTrackContainer} onLayout={onSliderLayout}>
              {/* Track background */}
              <View style={styles.sliderTrack} />

              {/* Filled portion */}
              <View
                style={[
                  styles.sliderFill,
                  { height: `${zoom * 100}%` }
                ]}
              />

              {/* Thumb */}
              <Animated.View style={[styles.sliderThumb, thumbAnimatedStyle]}>
                <View style={styles.sliderThumbInner} />
              </Animated.View>

              {/* Zoom icons */}
              <Text style={styles.zoomIconTop}>+</Text>
              <Text style={styles.zoomIconBottom}>−</Text>
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>

        {/* Model Viewer with 3D Hotspots */}
        <View style={styles.modelContainer}>
          <ModelViewer
            modelUri={modelUri}
            isLoading={isLoading}
            error={error}
            autoRotate={false}
            autoRotateSpeed={0.005}
            cameraDistance={2}
            zoom={zoom}
            onAnimationsLoaded={handleAnimationsLoaded}
            hotspots={HOTSPOTS_3D}
            onHotspotTap={handleHotspotPress}
            selectedHotspot={selectedHotspot}
          />
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Rotate model and tap dots for training exercises
        </Text>
      </View>

      {/* Training Details Bottom Sheet */}
      <BottomSheet visible={sheetVisible} onDismiss={handleDismissSheet}>
        {selectedMuscle && (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>{selectedMuscle.name}</Text>
            <Text style={styles.sheetDescription}>{selectedMuscle.description}</Text>

            <Text style={styles.sheetImportance}>{selectedMuscle.importance}</Text>

            <Text style={styles.sectionTitle}>Exercises</Text>
            {selectedMuscle.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                {exercise.reps && (
                  <Text style={styles.exerciseDetail}>{exercise.reps}</Text>
                )}
                {exercise.duration && (
                  <Text style={styles.exerciseDetail}>{exercise.duration}</Text>
                )}
              </View>
            ))}

            <Text style={styles.sectionTitle}>Tips</Text>
            {selectedMuscle.tips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
  },
  subtitle: {
    ...typography.body,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },
  modelWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  sliderContainer: {
    width: 44,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTrackContainer: {
    flex: 1,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.card,
    paddingVertical: SLIDER_TRACK_PADDING,
  },
  sliderTrack: {
    position: 'absolute',
    width: SLIDER_WIDTH,
    top: SLIDER_TRACK_PADDING + SLIDER_THUMB_SIZE / 2,
    bottom: SLIDER_TRACK_PADDING + SLIDER_THUMB_SIZE / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: SLIDER_WIDTH / 2,
  },
  sliderFill: {
    position: 'absolute',
    width: SLIDER_WIDTH,
    bottom: SLIDER_TRACK_PADDING + SLIDER_THUMB_SIZE / 2,
    backgroundColor: colors.accentDark,
    borderRadius: SLIDER_WIDTH / 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: SLIDER_THUMB_SIZE,
    height: SLIDER_THUMB_SIZE,
    borderRadius: SLIDER_THUMB_SIZE / 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderThumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accentDark,
  },
  zoomIconTop: {
    position: 'absolute',
    top: 4,
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  zoomIconBottom: {
    position: 'absolute',
    bottom: 4,
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  modelContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 24,
    overflow: 'hidden',
  },
  instructions: {
    alignItems: 'center',
    paddingBottom: spacing['3xl'],
  },
  instructionText: {
    ...typography.caption,
    color: colors.secondaryText,
  },
  // Bottom sheet content styles
  sheetContent: {
    paddingTop: spacing.sm,
  },
  sheetTitle: {
    ...typography.h1,
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  sheetDescription: {
    ...typography.body,
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  sheetImportance: {
    ...typography.body,
    color: colors.accentDark,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.base,
    marginTop: spacing.sm,
  },
  exerciseCard: {
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.sm,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  exerciseName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  exerciseDescription: {
    ...typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },
  exerciseDetail: {
    ...typography.caption,
    color: colors.accentDark,
    fontWeight: '500',
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  tipBullet: {
    ...typography.body,
    color: colors.accentDark,
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.body,
    color: colors.secondaryText,
    flex: 1,
  },
});
