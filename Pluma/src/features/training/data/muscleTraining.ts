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
 * meshNames match the GLB model mesh part names
 */
export const muscleGroups: MuscleGroup[] = [
  {
    id: 'ankles',
    name: 'Ankles',
    meshNames: ['Ankles'],
    description: 'The ankles provide stability during rapid direction changes and cushion landing impacts.',
    importance: 'Critical for quick footwork, lunges, and injury prevention',
    exercises: [
      {
        name: 'Ankle Circles',
        description: 'Lift foot off ground, rotate ankle in circles both directions.',
        reps: '2 sets of 20 each direction',
      },
      {
        name: 'Single-Leg Balance',
        description: 'Stand on one foot, maintain balance. Progress to eyes closed.',
        duration: '3 sets of 30 seconds each leg',
      },
      {
        name: 'Resistance Band Dorsiflexion',
        description: 'Loop band around foot, flex ankle toward shin against resistance.',
        reps: '3 sets of 15 each foot',
      },
      {
        name: 'Heel Walks',
        description: 'Walk on heels with toes pointed up across the court.',
        duration: '3 sets of 30 seconds',
      },
    ],
    tips: [
      'Always warm up ankles before playing',
      'Consider ankle braces if you have a history of sprains',
      'Strengthen gradually to build stability',
    ],
  },
  {
    id: 'core',
    name: 'Core',
    meshNames: ['Core'],
    description: 'The core muscles stabilize your body during rotational movements and power transfer.',
    importance: 'Essential for shot power, balance, and injury prevention',
    exercises: [
      {
        name: 'Plank',
        description: 'Hold a push-up position with forearms on ground, body straight.',
        duration: '3 sets of 45 seconds',
      },
      {
        name: 'Russian Twists',
        description: 'Seated, lean back slightly, rotate torso side to side with or without weight.',
        reps: '3 sets of 20 total',
      },
      {
        name: 'Dead Bug',
        description: 'Lie on back, extend opposite arm and leg while keeping core engaged.',
        reps: '3 sets of 10 each side',
      },
      {
        name: 'Medicine Ball Rotations',
        description: 'Stand with ball, rotate explosively mimicking smash motion.',
        reps: '3 sets of 12 each side',
      },
    ],
    tips: [
      'Engage core during all shots for better power transfer',
      'Breathe steadily during core exercises',
      'Focus on anti-rotation strength for badminton',
    ],
  },
  {
    id: 'forearms',
    name: 'Forearms',
    meshNames: ['Forearms'],
    description: 'The forearm muscles control racket grip strength and contribute to shot power.',
    importance: 'Provides stability and power transfer from arm to racket',
    exercises: [
      {
        name: 'Wrist Curls',
        description: 'Hold dumbbell, rest forearm on thigh, curl wrist up and down.',
        reps: '3 sets of 15',
      },
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
        name: 'Grip Strengthener',
        description: 'Squeeze a grip strengthener or stress ball repeatedly.',
        reps: '3 sets of 20 squeezes',
      },
    ],
    tips: [
      'Balance grip strength with flexibility',
      'Avoid over-gripping during play',
      'Ice after intense training if soreness occurs',
    ],
  },
  {
    id: 'knees',
    name: 'Knees',
    meshNames: ['Knees'],
    description: 'The knees absorb impact during jumps and lunges, requiring strength and stability.',
    importance: 'Vital for explosive movements and injury prevention',
    exercises: [
      {
        name: 'Wall Sits',
        description: 'Back against wall, slide down to 90-degree knee bend, hold.',
        duration: '3 sets of 45 seconds',
      },
      {
        name: 'Step-Ups',
        description: 'Step onto a raised platform, drive through heel, step down.',
        reps: '3 sets of 12 each leg',
      },
      {
        name: 'Terminal Knee Extensions',
        description: 'With band around knee, straighten from slight bend to full extension.',
        reps: '3 sets of 15 each leg',
      },
      {
        name: 'Lateral Band Walks',
        description: 'With band around thighs, walk sideways in athletic stance.',
        reps: '3 sets of 10 steps each direction',
      },
    ],
    tips: [
      'Land softly with bent knees to absorb impact',
      'Strengthen muscles around the knee for stability',
      'Stop immediately if you feel sharp knee pain',
    ],
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    meshNames: ['Shoulder'],
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
    id: 'wrist',
    name: 'Wrist',
    meshNames: ['Wrist'],
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
