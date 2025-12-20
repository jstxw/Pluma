/**
 * Muscle group training data for badminton-specific exercises
 */

export interface Exercise {
  name: string;
  description: string;
  reps?: string;
  duration?: string;
}

export interface MuscleGroup {
  id: string;
  name: string;
  meshNames: string[]; // GLB mesh names that map to this group
  description: string;
  importance: string; // Why it's important for badminton
  exercises: Exercise[];
  tips: string[];
}

/**
 * Badminton-specific muscle groups with training exercises
 * meshNames will be updated once we know the actual mesh names from the GLB model
 */
export const muscleGroups: MuscleGroup[] = [
  {
    id: 'wrist',
    name: 'Wrist',
    meshNames: ['Mesh10'],
    description: 'The wrist is crucial for generating power and controlling racket angle in badminton shots.',
    importance: 'Essential for net shots, flicks, and deceptive plays',
    exercises: [
      {
        name: 'Wrist Curls',
        description: 'Hold a light dumbbell, rest forearm on thigh, curl wrist up and down.',
        reps: '3 sets of 15',
      },
      {
        name: 'Wrist Rotations',
        description: 'Hold racket, rotate wrist clockwise and counter-clockwise.',
        reps: '2 sets of 20 each direction',
      },
      {
        name: 'Finger Grip Squeeze',
        description: 'Squeeze a stress ball or grip strengthener.',
        duration: '3 sets of 30 seconds',
      },
      {
        name: 'Racket Flicks',
        description: 'Practice quick wrist flicks with your racket, focusing on snap.',
        reps: '3 sets of 20',
      },
    ],
    tips: [
      'Keep wrist relaxed during rallies to enable quick reactions',
      'Strengthen gradually to prevent injury',
      'Stretch before and after training',
    ],
  },
  {
    id: 'forearm',
    name: 'Forearm',
    meshNames: ['Mesh10'],
    description: 'The forearm muscles control racket grip strength and contribute to shot power.',
    importance: 'Provides stability and power transfer from arm to racket',
    exercises: [
      {
        name: 'Reverse Wrist Curls',
        description: 'Hold dumbbell with palm facing down, curl wrist upward.',
        reps: '3 sets of 12',
      },
      {
        name: 'Pronation/Supination',
        description: 'Hold weight, rotate forearm palm-up to palm-down.',
        reps: '3 sets of 15',
      },
      {
        name: 'Towel Wring',
        description: 'Wring out a wet towel as hard as possible.',
        reps: '3 sets of 10 wrings',
      },
      {
        name: 'Racket Weight Swings',
        description: 'Attach weight to racket head, practice slow controlled swings.',
        reps: '2 sets of 10',
      },
    ],
    tips: [
      'Balance grip strength with flexibility',
      'Avoid over-gripping during play',
      'Ice after intense training if soreness occurs',
    ],
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    meshNames: ['Mesh10'],
    description: 'The shoulder complex enables overhead shots, serves, and provides rotational power.',
    importance: 'Critical for smashes, clears, and defensive shots',
    exercises: [
      {
        name: 'Shoulder External Rotation',
        description: 'Use resistance band, elbow at side, rotate forearm outward.',
        reps: '3 sets of 15',
      },
      {
        name: 'Internal Rotation',
        description: 'Resistance band attached, rotate forearm inward across body.',
        reps: '3 sets of 15',
      },
      {
        name: 'Overhead Press',
        description: 'Light dumbbells, press overhead from shoulder height.',
        reps: '3 sets of 12',
      },
      {
        name: 'Shadow Smash Practice',
        description: 'Perform smash motion without shuttle, focus on rotation.',
        reps: '3 sets of 20',
      },
    ],
    tips: [
      'Warm up thoroughly before overhead movements',
      'Maintain scapular stability during shots',
      'Rest if experiencing any shoulder pain',
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    meshNames: ['Mesh10'],
    description: 'Strong legs provide the foundation for court movement, lunges, and explosive jumps.',
    importance: 'Essential for footwork, lunges, and jump smashes',
    exercises: [
      {
        name: 'Lateral Lunges',
        description: 'Step sideways into a lunge, push back to standing.',
        reps: '3 sets of 10 each side',
      },
      {
        name: 'Split Squat Jumps',
        description: 'Lunge position, jump and switch legs mid-air.',
        reps: '3 sets of 8',
      },
      {
        name: 'Calf Raises',
        description: 'Rise onto toes, lower slowly, repeat.',
        reps: '3 sets of 20',
      },
      {
        name: 'Box Jumps',
        description: 'Jump onto a stable platform, step down, repeat.',
        reps: '3 sets of 10',
      },
      {
        name: 'Court Footwork Drills',
        description: 'Practice 6-corner footwork pattern at game speed.',
        duration: '3 sets of 1 minute',
      },
    ],
    tips: [
      'Focus on landing softly to protect knees',
      'Maintain low center of gravity during movement',
      'Stretch hip flexors regularly',
    ],
  },
];

/**
 * Find a muscle group by mesh name
 */
export function findMuscleGroupByMeshName(meshName: string): MuscleGroup | undefined {
  const lowerMeshName = meshName.toLowerCase();
  return muscleGroups.find((group) =>
    group.meshNames.some((name) => lowerMeshName.includes(name.toLowerCase()))
  );
}

/**
 * Find a muscle group by ID
 */
export function findMuscleGroupById(id: string): MuscleGroup | undefined {
  return muscleGroups.find((group) => group.id === id);
}
