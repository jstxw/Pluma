/**
 * ModelViewer - Interactive 3D GLB model viewer component
 *
 * Features:
 * - Renders GLB/GLTF 3D models using Three.js and expo-gl
 * - Touch gestures for rotation, zoom, and pan
 * - Supports model animations
 * - Loading and error states
 *
 * Note: Requires physical device for testing (simulators have poor WebGL support)
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  PanGestureHandler,
  PinchGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { colors } from '../../constants/theme';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

/** Information about a tapped mesh */
export interface MeshTapInfo {
  /** Name of the tapped mesh */
  meshName: string;
  /** Parent name if available */
  parentName: string | null;
  /** World position of tap point */
  position: { x: number; y: number; z: number };
}

/** 3D Hotspot definition */
export interface Hotspot3D {
  /** Unique identifier for this hotspot */
  id: string;
  /** 3D position relative to model center (after scaling) */
  position: { x: number; y: number; z: number };
  /** Optional color (default: accent color) */
  color?: number;
}

interface ModelViewerProps {
  /** URI of the GLB model to load */
  modelUri: string | null;
  /** Whether the model is still loading */
  isLoading?: boolean;
  /** Error message if model failed to load */
  error?: string | null;
  /** Background color (default: transparent) */
  backgroundColor?: string;
  /** Enable auto-rotation (default: true) */
  autoRotate?: boolean;
  /** Auto-rotation speed (default: 0.01) */
  autoRotateSpeed?: number;
  /** Initial camera distance (default: 3) */
  cameraDistance?: number;
  /** External zoom level (0-1, where 1 is closest) */
  zoom?: number;
  /** Called when an animation is available */
  onAnimationsLoaded?: (animations: THREE.AnimationClip[]) => void;
  /** Called when a mesh is tapped */
  onMeshTap?: (info: MeshTapInfo) => void;
  /** Currently highlighted mesh name (for visual feedback) */
  highlightedMesh?: string | null;
  /** 3D hotspots to display on the model */
  hotspots?: Hotspot3D[];
  /** Called when a 3D hotspot is tapped */
  onHotspotTap?: (hotspotId: string) => void;
  /** Currently selected hotspot ID (for visual feedback) */
  selectedHotspot?: string | null;
}

export function ModelViewer({
  modelUri,
  isLoading = false,
  error = null,
  backgroundColor = 'transparent',
  autoRotate = true,
  autoRotateSpeed = 0.01,
  cameraDistance = 3,
  zoom = 0.5,
  onAnimationsLoaded,
  onMeshTap,
  highlightedMesh = null,
  hotspots = [],
  onHotspotTap,
  selectedHotspot = null,
}: ModelViewerProps) {
  // Refs for Three.js objects
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const frameIdRef = useRef<number | null>(null);

  // Raycaster for tap detection
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const viewSizeRef = useRef({ width: 0, height: 0 });

  // 3D Hotspot meshes
  const hotspotMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const hotspotGroupRef = useRef<THREE.Group | null>(null);

  // Material storage for highlighting
  const originalMaterialsRef = useRef<Map<string, THREE.Material | THREE.Material[]>>(new Map());
  const highlightMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const highlightedMeshRef = useRef<string | null>(null);

  // Touch interaction state
  const rotationRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const lastPanRef = useRef({ x: 0, y: 0 });
  const lastScaleRef = useRef(1);
  const zoomRef = useRef(zoom);
  const tapStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Update zoom ref when prop changes
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }

    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    if (modelRef.current && sceneRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      modelRef.current = null;
    }

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    sceneRef.current = null;
    cameraRef.current = null;
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Create highlight material
  const createHighlightMaterial = useCallback(() => {
    if (!highlightMaterialRef.current) {
      highlightMaterialRef.current = new THREE.MeshStandardMaterial({
        color: 0x4CAF50, // Green highlight
        emissive: 0x2E7D32,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9,
      });
    }
    return highlightMaterialRef.current;
  }, []);

  // Apply highlight to a mesh by name
  const applyHighlight = useCallback((meshName: string | null) => {
    if (!modelRef.current) return;

    // Reset previously highlighted mesh
    if (highlightedMeshRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === highlightedMeshRef.current) {
          const originalMaterial = originalMaterialsRef.current.get(child.name);
          if (originalMaterial) {
            child.material = originalMaterial;
          }
        }
      });
    }

    // Apply highlight to new mesh
    if (meshName) {
      const highlightMat = createHighlightMaterial();
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name.toLowerCase().includes(meshName.toLowerCase())) {
          // Store original material if not already stored
          if (!originalMaterialsRef.current.has(child.name)) {
            originalMaterialsRef.current.set(child.name, child.material);
          }
          child.material = highlightMat;
        }
      });
    }

    highlightedMeshRef.current = meshName;
  }, [createHighlightMaterial]);

  // Effect to apply highlighting when prop changes
  useEffect(() => {
    applyHighlight(highlightedMesh);
  }, [highlightedMesh, applyHighlight]);

  // Perform raycast to find tapped hotspot or mesh
  const performRaycast = useCallback((screenX: number, screenY: number): { type: 'hotspot' | 'mesh'; id: string } | null => {
    if (!cameraRef.current || !sceneRef.current || !viewSizeRef.current.width) {
      console.log('Raycast skipped: missing camera, scene, or view size');
      return null;
    }

    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    const x = (screenX / viewSizeRef.current.width) * 2 - 1;
    const y = -(screenY / viewSizeRef.current.height) * 2 + 1;

    console.log(`Raycast at screen (${screenX}, ${screenY}) -> NDC (${x.toFixed(2)}, ${y.toFixed(2)})`);

    // Update raycaster
    raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    // Update world matrices before raycasting
    sceneRef.current.updateMatrixWorld(true);

    // Check all objects in scene, then filter for hotspots first
    const allIntersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);

    console.log(`Found ${allIntersects.length} intersections`);

    // First, look for hotspot hits
    for (const intersect of allIntersects) {
      const obj = intersect.object;
      if (obj.name.startsWith('hotspot_')) {
        const hotspotId = obj.name.replace('hotspot_', '');
        console.log(`Hit hotspot: "${hotspotId}"`);
        return { type: 'hotspot', id: hotspotId };
      }
    }

    // If no hotspot, return first mesh hit
    if (allIntersects.length > 0) {
      const mesh = allIntersects[0].object as THREE.Mesh;
      console.log(`Hit mesh: "${mesh.name}"`);
      return { type: 'mesh', id: mesh.name };
    }

    console.log('No intersections found');
    return null;
  }, []);

  // Handle tap detection (called from pan gesture when it's a short tap)
  const handleTap = useCallback((x: number, y: number) => {
    console.log(`handleTap called at (${x}, ${y})`);
    const hitInfo = performRaycast(x, y);
    if (hitInfo) {
      console.log(`Hit info: type=${hitInfo.type}, id=${hitInfo.id}`);
      if (hitInfo.type === 'hotspot') {
        console.log(`Calling onHotspotTap with id: ${hitInfo.id}`);
        onHotspotTap?.(hitInfo.id);
      } else if (hitInfo.type === 'mesh' && onMeshTap) {
        onMeshTap({
          meshName: hitInfo.id,
          parentName: null,
          position: { x: 0, y: 0, z: 0 },
        });
      }
    }
  }, [onMeshTap, onHotspotTap, performRaycast]);

  // Handle WebGL context creation
  const onContextCreate = useCallback(
    async (gl: ExpoWebGLRenderingContext) => {
      // Cleanup any existing context
      cleanup();

      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

      // Store view dimensions for raycasting
      viewSizeRef.current = { width, height };

      // Create renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);
      renderer.setClearColor(
        backgroundColor === 'transparent' ? 0x000000 : backgroundColor,
        backgroundColor === 'transparent' ? 0 : 1
      );
      rendererRef.current = renderer;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = cameraDistance;
      cameraRef.current = camera;

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);

      // Load model if URI is available
      if (modelUri) {
        try {
          const loader = new GLTFLoader();
          const gltf: GLTF = await new Promise((resolve, reject) => {
            loader.load(
              modelUri,
              resolve,
              undefined,
              reject
            );
          });

          const model = gltf.scene;

          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;

          model.position.sub(center);
          model.scale.multiplyScalar(scale);

          scene.add(model);
          modelRef.current = model;

          // Log all mesh names for debugging model structure
          console.log('=== GLB Model Structure ===');
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              console.log(`Mesh: "${child.name}" | Parent: "${child.parent?.name || 'root'}"`);
            } else if (child instanceof THREE.Bone) {
              console.log(`Bone: "${child.name}"`);
            } else if (child.name) {
              console.log(`Object: "${child.name}" | Type: ${child.type}`);
            }
          });
          console.log('=== End Model Structure ===');

          // Setup animations if available
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;

            // Play the first animation by default
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();

            // Notify parent of available animations
            onAnimationsLoaded?.(gltf.animations);
          }

          // Create 3D hotspots attached to the model
          if (hotspots.length > 0) {
            const hotspotGroup = new THREE.Group();
            hotspotGroup.name = 'hotspots';
            hotspotMeshesRef.current.clear();

            hotspots.forEach((hotspot) => {
              // Create sphere geometry for hotspot (larger for easier tapping)
              const geometry = new THREE.SphereGeometry(0.12, 16, 16);
              const material = new THREE.MeshStandardMaterial({
                color: hotspot.color || 0x1a1a1a,
                emissive: hotspot.color || 0x1a1a1a,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9,
              });

              const sphere = new THREE.Mesh(geometry, material);
              sphere.name = `hotspot_${hotspot.id}`;
              sphere.position.set(
                hotspot.position.x,
                hotspot.position.y,
                hotspot.position.z
              );

              // Add inner glow sphere
              const innerGeometry = new THREE.SphereGeometry(0.05, 12, 12);
              const innerMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
              });
              const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
              sphere.add(innerSphere);

              hotspotGroup.add(sphere);
              hotspotMeshesRef.current.set(hotspot.id, sphere);

              console.log(`Created hotspot: ${hotspot.id} at (${hotspot.position.x}, ${hotspot.position.y}, ${hotspot.position.z})`);
            });

            model.add(hotspotGroup);
            hotspotGroupRef.current = hotspotGroup;
          }
        } catch (err) {
          console.error('Failed to load GLB model:', err);
        }
      }

      // Animation loop
      const animate = () => {
        frameIdRef.current = requestAnimationFrame(animate);

        // Update animation mixer
        if (mixerRef.current) {
          const delta = clockRef.current.getDelta();
          mixerRef.current.update(delta);
        }

        // Auto-rotate model
        if (autoRotate && modelRef.current) {
          modelRef.current.rotation.y += autoRotateSpeed;
        }

        // Apply manual rotation from gestures
        if (modelRef.current) {
          modelRef.current.rotation.x = rotationRef.current.x;
          modelRef.current.rotation.y += rotationRef.current.y * 0.1;
          rotationRef.current.y = 0; // Reset delta after applying
        }

        // Apply zoom from slider and pinch gestures
        if (cameraRef.current) {
          // zoom: 0 = far (cameraDistance * 2), 1 = close (cameraDistance * 0.5)
          const zoomMultiplier = 2 - (zoomRef.current * 1.5);
          cameraRef.current.position.z = (cameraDistance * zoomMultiplier) / scaleRef.current;
        }

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      animate();
    },
    [modelUri, backgroundColor, autoRotate, autoRotateSpeed, cameraDistance, cleanup, onAnimationsLoaded, hotspots]
  );

  // Handle pan gestures for rotation and tap detection
  const onPanGestureEvent = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      const { state, translationX, translationY, x, y } = event.nativeEvent;

      if (state === State.BEGAN) {
        // Record tap start for tap detection
        tapStartRef.current = { x, y, time: Date.now() };
      } else if (state === State.ACTIVE) {
        const deltaX = translationX - lastPanRef.current.x;
        const deltaY = translationY - lastPanRef.current.y;

        rotationRef.current.y += deltaX * 0.03;
        rotationRef.current.x += deltaY * 0.03;
        rotationRef.current.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, rotationRef.current.x)
        );

        lastPanRef.current = { x: translationX, y: translationY };
      } else if (state === State.END || state === State.CANCELLED) {
        // Check if this was a tap (short duration, minimal movement)
        if (tapStartRef.current && state === State.END) {
          const duration = Date.now() - tapStartRef.current.time;
          const movement = Math.sqrt(translationX * translationX + translationY * translationY);

          console.log(`Gesture ended: duration=${duration}ms, movement=${movement.toFixed(1)}px`);

          // Tap: less than 500ms and less than 20px movement (more lenient)
          if (duration < 500 && movement < 20) {
            handleTap(x, y);
          } else {
            console.log('Not a tap - too long or too much movement');
          }
        }

        lastPanRef.current = { x: 0, y: 0 };
        tapStartRef.current = null;
      }
    },
    [handleTap]
  );

  // Handle pinch gestures for zoom
  const onPinchGestureEvent = useCallback(
    (event: PinchGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        const { scale } = event.nativeEvent;
        const deltaScale = scale / lastScaleRef.current;
        scaleRef.current = Math.max(0.5, Math.min(3, scaleRef.current * deltaScale));
        lastScaleRef.current = scale;
      } else if (
        event.nativeEvent.state === State.END ||
        event.nativeEvent.state === State.CANCELLED
      ) {
        lastScaleRef.current = 1;
      }
    },
    []
  );

  // Show loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accentDark} />
        <Text style={styles.loadingText}>Loading model...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Show placeholder if no model URI
  if (!modelUri) {
    return (
      <View style={styles.centered}>
        <Text style={styles.placeholderText}>No model loaded</Text>
      </View>
    );
  }

  return (
    <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <View style={styles.container}>
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
        </View>
      </PanGestureHandler>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  glView: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    ...typography.body,
    color: colors.secondaryText,
    marginTop: spacing.base,
  },
  errorText: {
    ...typography.body,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  placeholderText: {
    ...typography.body,
    color: colors.secondaryText,
  },
});
