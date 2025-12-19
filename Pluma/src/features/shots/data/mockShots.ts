/**
 * Mock Shots Data
 *
 * Realistic badminton shot techniques for development and testing.
 * Covers all skill levels with comprehensive technique breakdowns.
 */

import type { Shot, Tag, TechniqueStep } from '../../../types';

// =============================================================================
// Mock Tags (shared with drills, but shot-specific subset)
// =============================================================================

export const mockShotTags: Tag[] = [
  // Skill Level
  { id: 'tag-beginner', name: 'Beginner', category: 'skill_level' },
  { id: 'tag-intermediate', name: 'Intermediate', category: 'skill_level' },
  { id: 'tag-advanced', name: 'Advanced', category: 'skill_level' },

  // Shot Category
  { id: 'tag-overhead', name: 'Overhead', category: 'shot_category' },
  { id: 'tag-underarm', name: 'Underarm', category: 'shot_category' },
  { id: 'tag-forehand', name: 'Forehand', category: 'shot_category' },
  { id: 'tag-backhand', name: 'Backhand', category: 'shot_category' },

  // Court Position
  { id: 'tag-frontcourt', name: 'Front Court', category: 'court_position' },
  { id: 'tag-midcourt', name: 'Mid Court', category: 'court_position' },
  { id: 'tag-rearcourt', name: 'Rear Court', category: 'court_position' },

  // Training Focus
  { id: 'tag-offensive', name: 'Offensive', category: 'training_focus' },
  { id: 'tag-defensive', name: 'Defensive', category: 'training_focus' },
  { id: 'tag-neutral', name: 'Neutral', category: 'training_focus' },
  { id: 'tag-deceptive', name: 'Deceptive', category: 'training_focus' },
];

// Helper to get tags by IDs
const getTagsByIds = (ids: string[]): Tag[] =>
  mockShotTags.filter((tag) => ids.includes(tag.id));

// =============================================================================
// Mock Shots
// =============================================================================

export const mockShots: Shot[] = [
  // =====================
  // BEGINNER SHOTS
  // =====================
  {
    id: 'shot-1',
    name: 'Clear',
    description:
      'A high, deep shot hit from the rear court to the opponent\'s rear court. The fundamental defensive and rally-building shot in badminton.',
    difficulty: 'beginner',
    tags: getTagsByIds(['tag-beginner', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-defensive']),
    relatedDrills: ['drill-6', 'drill-14'],
    technique: [
      {
        id: 'step-1-1',
        order: 1,
        title: 'Ready Position',
        description: 'Start with a balanced stance, racket up, and eyes on the shuttlecock.',
        keyPoints: [
          'Feet shoulder-width apart',
          'Knees slightly bent',
          'Non-racket arm raised for balance',
          'Weight on balls of feet',
        ],
      },
      {
        id: 'step-1-2',
        order: 2,
        title: 'Footwork and Positioning',
        description: 'Move to position under the shuttle using proper footwork.',
        keyPoints: [
          'Turn sideways to the net',
          'Use chassé steps to move back',
          'Position shuttle above hitting shoulder',
          'Maintain balance throughout movement',
        ],
      },
      {
        id: 'step-1-3',
        order: 3,
        title: 'Backswing',
        description: 'Prepare your racket arm with a full backswing.',
        keyPoints: [
          'Elbow high and pointing up',
          'Racket behind your head',
          'Non-racket arm extended for balance',
          'Body weight on back foot',
        ],
      },
      {
        id: 'step-1-4',
        order: 4,
        title: 'Contact and Follow-through',
        description: 'Strike the shuttle at the highest point with full arm extension.',
        keyPoints: [
          'Contact at highest reachable point',
          'Full pronation of forearm',
          'Hit through the shuttle, not at it',
          'Follow through down and across body',
        ],
      },
    ],
  },
  {
    id: 'shot-2',
    name: 'Drop Shot',
    description:
      'A soft shot played from the rear court that falls gently just over the net. Used to move opponents forward and create openings.',
    difficulty: 'beginner',
    tags: getTagsByIds(['tag-beginner', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-offensive']),
    relatedDrills: ['drill-6'],
    technique: [
      {
        id: 'step-2-1',
        order: 1,
        title: 'Preparation (Same as Clear)',
        description: 'Use identical preparation to disguise your shot selection.',
        keyPoints: [
          'Same footwork as clear',
          'Same backswing as clear',
          'Same body position as clear',
          'Opponent cannot tell your intention',
        ],
      },
      {
        id: 'step-2-2',
        order: 2,
        title: 'Gentle Contact',
        description: 'Slow the racket head at contact for a soft touch.',
        keyPoints: [
          'Reduce swing speed before contact',
          'Slice slightly across the shuttle',
          'Use mainly wrist and fingers',
          'Aim for net tape height',
        ],
      },
      {
        id: 'step-2-3',
        order: 3,
        title: 'Follow-through',
        description: 'Complete a shortened follow-through to maintain deception.',
        keyPoints: [
          'Shorter follow-through than clear',
          'Racket finishes in front of body',
          'Prepare immediately for opponent\'s reply',
          'Move forward to cover net response',
        ],
      },
    ],
  },
  {
    id: 'shot-3',
    name: 'Backhand Serve',
    description:
      'A short serve that travels low over the net and lands near the front service line. The primary serve in doubles and commonly used in singles.',
    difficulty: 'beginner',
    tags: getTagsByIds(['tag-beginner', 'tag-underarm', 'tag-forehand', 'tag-frontcourt', 'tag-neutral']),
    relatedDrills: ['drill-3'],
    technique: [
      {
        id: 'step-3-1',
        order: 1,
        title: 'Stance and Grip',
        description: 'Set up in a balanced serving position with proper grip.',
        keyPoints: [
          'Stand close to center line',
          'Front foot pointing toward target',
          'Relaxed forehand grip',
          'Hold shuttle by feathers at waist height',
        ],
      },
      {
        id: 'step-3-2',
        order: 2,
        title: 'Backswing',
        description: 'Short, compact backswing for control.',
        keyPoints: [
          'Minimal backswing',
          'Racket stays below waist',
          'Elbow close to body',
          'Wrist cocked back',
        ],
      },
      {
        id: 'step-3-3',
        order: 3,
        title: 'Contact',
        description: 'Push the shuttle gently with a controlled motion.',
        keyPoints: [
          'Contact below waist height',
          'Racket head below hand at contact',
          'Push rather than hit the shuttle',
          'Aim for shuttle to skim the net tape',
        ],
      },
      {
        id: 'step-3-4',
        order: 4,
        title: 'Follow-through',
        description: 'Minimal follow-through while preparing for return.',
        keyPoints: [
          'Short, controlled follow-through',
          'Racket finishes pointing at target',
          'Immediately ready for opponent\'s return',
          'Move into court after serve',
        ],
      },
    ],
  },
  {
    id: 'shot-4',
    name: 'High Serve',
    description:
      'A deep serve hit high to the back of the service court. Primarily used in singles to push the opponent to the rear court.',
    difficulty: 'beginner',
    tags: getTagsByIds(['tag-beginner', 'tag-underarm', 'tag-forehand', 'tag-rearcourt', 'tag-defensive']),
    relatedDrills: ['drill-3'],
    technique: [
      {
        id: 'step-4-1',
        order: 1,
        title: 'Stance',
        description: 'Set up for power generation with proper weight transfer.',
        keyPoints: [
          'Stand further from service line than backhand serve',
          'Side-on stance for power',
          'Weight on back foot',
          'Shuttle held at arm\'s length',
        ],
      },
      {
        id: 'step-4-2',
        order: 2,
        title: 'Swing and Contact',
        description: 'Use a longer swing for height and depth.',
        keyPoints: [
          'Fuller backswing than backhand serve',
          'Weight transfer from back to front foot',
          'Contact at full arm extension',
          'Hit upward at approximately 45 degrees',
        ],
      },
      {
        id: 'step-4-3',
        order: 3,
        title: 'Follow-through',
        description: 'Complete follow-through high for maximum trajectory.',
        keyPoints: [
          'Racket finishes high above shoulder',
          'Body fully rotated toward target',
          'Move to center court after serve',
          'Prepare for opponent\'s reply',
        ],
      },
    ],
  },
  {
    id: 'shot-5',
    name: 'Net Shot',
    description:
      'A delicate shot played from near the net that just clears the tape and falls close to the net on the opponent\'s side.',
    difficulty: 'beginner',
    tags: getTagsByIds(['tag-beginner', 'tag-underarm', 'tag-forehand', 'tag-frontcourt', 'tag-neutral']),
    relatedDrills: ['drill-4', 'drill-9'],
    technique: [
      {
        id: 'step-5-1',
        order: 1,
        title: 'Approach',
        description: 'Move to the net with a lunge step.',
        keyPoints: [
          'Lunge forward with racket leg',
          'Racket arm extended toward shuttle',
          'Low body position',
          'Eyes fixed on the shuttle',
        ],
      },
      {
        id: 'step-5-2',
        order: 2,
        title: 'Racket Preparation',
        description: 'Present the racket face to the shuttle.',
        keyPoints: [
          'Racket face open (tilted up)',
          'Grip relaxed',
          'Wrist laid back',
          'Racket head higher than hand',
        ],
      },
      {
        id: 'step-5-3',
        order: 3,
        title: 'Contact',
        description: 'Gentle push to lift shuttle just over the net.',
        keyPoints: [
          'Minimal swing - just a push',
          'Contact as high as possible',
          'Use fingers for fine control',
          'Aim for shuttle to tumble over net',
        ],
      },
    ],
  },

  // =====================
  // INTERMEDIATE SHOTS
  // =====================
  {
    id: 'shot-6',
    name: 'Smash',
    description:
      'The most powerful attacking shot in badminton. A steep, downward shot hit with maximum force to end the rally.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-offensive']),
    relatedDrills: ['drill-11'],
    technique: [
      {
        id: 'step-6-1',
        order: 1,
        title: 'Positioning',
        description: 'Position yourself behind the shuttle for optimal power angle.',
        keyPoints: [
          'Get behind and slightly to the side of shuttle',
          'Side-on stance with weight on back foot',
          'Shoulders parallel to net',
          'Non-racket arm pointing at shuttle',
        ],
      },
      {
        id: 'step-6-2',
        order: 2,
        title: 'Throwing Motion',
        description: 'Use a powerful throwing motion with full body rotation.',
        keyPoints: [
          'Initiate with hip rotation',
          'Elbow leads the swing',
          'Forearm pronation at contact',
          'Full body rotation into the shot',
        ],
      },
      {
        id: 'step-6-3',
        order: 3,
        title: 'Contact Point',
        description: 'Strike at the highest point with racket angled down.',
        keyPoints: [
          'Contact in front of body',
          'Full arm extension',
          'Racket face angled downward',
          'Snap wrist for extra speed',
        ],
      },
      {
        id: 'step-6-4',
        order: 4,
        title: 'Follow-through and Recovery',
        description: 'Complete the swing and prepare for the next shot.',
        keyPoints: [
          'Racket follows through across body',
          'Land on racket foot',
          'Push off to return to base',
          'Ready for possible return',
        ],
      },
    ],
  },
  {
    id: 'shot-7',
    name: 'Drive',
    description:
      'A flat, fast shot hit horizontally at shoulder height. Used for quick exchanges and to maintain pressure.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-forehand', 'tag-midcourt', 'tag-offensive']),
    relatedDrills: ['drill-8'],
    technique: [
      {
        id: 'step-7-1',
        order: 1,
        title: 'Ready Position',
        description: 'Prepare with a compact, reactive stance.',
        keyPoints: [
          'Racket in front of body',
          'Grip relaxed but ready',
          'Low, athletic stance',
          'Weight on balls of feet',
        ],
      },
      {
        id: 'step-7-2',
        order: 2,
        title: 'Compact Swing',
        description: 'Use a short, powerful swing for quick execution.',
        keyPoints: [
          'Minimal backswing',
          'Elbow stays close to body',
          'Quick wrist action',
          'Punch through the shuttle',
        ],
      },
      {
        id: 'step-7-3',
        order: 3,
        title: 'Contact',
        description: 'Hit the shuttle flat at the highest comfortable point.',
        keyPoints: [
          'Contact in front of body',
          'Flat racket face',
          'Eye level or slightly below',
          'Quick snap at impact',
        ],
      },
    ],
  },
  {
    id: 'shot-8',
    name: 'Lift',
    description:
      'An underarm shot hit from the front court high to the opponent\'s rear court. A defensive shot used to reset the rally.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-underarm', 'tag-forehand', 'tag-frontcourt', 'tag-defensive']),
    relatedDrills: ['drill-10'],
    technique: [
      {
        id: 'step-8-1',
        order: 1,
        title: 'Lunge to the Net',
        description: 'Reach the shuttle with a deep lunge.',
        keyPoints: [
          'Push off from center court',
          'Deep lunge with racket leg',
          'Racket extended ahead of body',
          'Low body position',
        ],
      },
      {
        id: 'step-8-2',
        order: 2,
        title: 'Swing Path',
        description: 'Swing upward to send shuttle high and deep.',
        keyPoints: [
          'Swing from low to high',
          'Open racket face',
          'Use wrist for height',
          'Aim for deep baseline',
        ],
      },
      {
        id: 'step-8-3',
        order: 3,
        title: 'Recovery',
        description: 'Push back to center court immediately.',
        keyPoints: [
          'Push off lunging leg',
          'Use non-racket arm for balance',
          'Take small steps back to center',
          'Racket up for next shot',
        ],
      },
    ],
  },
  {
    id: 'shot-9',
    name: 'Backhand Clear',
    description:
      'A clear shot played with the backhand from the rear court. An essential defensive skill for covering the backhand side.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-overhead', 'tag-backhand', 'tag-rearcourt', 'tag-defensive']),
    relatedDrills: ['drill-14'],
    technique: [
      {
        id: 'step-9-1',
        order: 1,
        title: 'Grip Change',
        description: 'Switch to backhand grip while moving to the shuttle.',
        keyPoints: [
          'Thumb on back bevel',
          'Grip relaxed',
          'Quick grip change during movement',
          'V-shape rotated left (for right-handers)',
        ],
      },
      {
        id: 'step-9-2',
        order: 2,
        title: 'Body Position',
        description: 'Turn your back toward the net to position correctly.',
        keyPoints: [
          'Back faces the net',
          'Look over hitting shoulder',
          'Weight on back foot',
          'Elbow high and leading',
        ],
      },
      {
        id: 'step-9-3',
        order: 3,
        title: 'Swing and Contact',
        description: 'Generate power from forearm rotation.',
        keyPoints: [
          'Lead with elbow',
          'Forearm rotation is key power source',
          'Contact at full extension',
          'Wrist snap at impact',
        ],
      },
    ],
  },
  {
    id: 'shot-10',
    name: 'Cross-Court Net Shot',
    description:
      'A net shot played diagonally across the court. Adds deception and creates difficult angles for opponents.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-underarm', 'tag-forehand', 'tag-frontcourt', 'tag-deceptive']),
    relatedDrills: ['drill-9'],
    technique: [
      {
        id: 'step-10-1',
        order: 1,
        title: 'Approach',
        description: 'Move to the shuttle showing intention for straight shot.',
        keyPoints: [
          'Approach as if playing straight',
          'Racket face presented straight',
          'Eyes on shuttle',
          'Disguise until last moment',
        ],
      },
      {
        id: 'step-10-2',
        order: 2,
        title: 'Last-Moment Redirection',
        description: 'Change racket angle at the last moment.',
        keyPoints: [
          'Late wrist rotation',
          'Brush across shuttle',
          'Slight outside contact point',
          'Gentle touch - don\'t hit hard',
        ],
      },
    ],
  },
  {
    id: 'shot-16',
    name: 'Cross Drop',
    description:
      'A drop shot played from the rear court that lands diagonally into the opponent\'s front court. Used to pull opponents forward and sideways, create space, and force weak replies.',
    difficulty: 'intermediate',
    tags: getTagsByIds(['tag-intermediate', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-deceptive', 'tag-offensive']),
    relatedDrills: ['drill-6'],
    technique: [
      {
        id: 'step-16-1',
        order: 1,
        title: 'Preparation (Looks Like a Clear)',
        description:
          'Set up exactly like a clear so the opponent cannot read the cross drop early.',
        keyPoints: [
          'Use the same approach and footwork as a clear',
          'Show the same backswing and shoulder rotation',
          'Keep your body side-on and stable',
          'Hold the racket up early to avoid rushing',
        ],
      },
      {
        id: 'step-16-2',
        order: 2,
        title: 'Contact Point (In Front and High)',
        description:
          'Make contact high and slightly in front to control angle and keep the shuttle tight.',
        keyPoints: [
          'Contact the shuttle at your highest comfortable point',
          'Hit slightly in front of your body, not behind your head',
          'Use a relaxed grip for touch control',
          'Avoid "scooping" upward (that makes it float)',
        ],
      },
      {
        id: 'step-16-3',
        order: 3,
        title: 'Racket Face and Direction',
        description:
          'Angle the racket face to send the shuttle diagonally while keeping the same swing shape.',
        keyPoints: [
          'Keep racket face angled toward target corner',
          'Slice gently across the shuttle',
          'Maintain soft touch for tight net clearance',
          'Follow through toward diagonal target',
        ],
      },
    ],
  },

  // =====================
  // ADVANCED SHOTS
  // =====================
  {
    id: 'shot-11',
    name: 'Jump Smash',
    description:
      'A smash executed while jumping to achieve a steeper angle and more power. The most devastating attacking shot in badminton.',
    difficulty: 'advanced',
    tags: getTagsByIds(['tag-advanced', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-offensive']),
    relatedDrills: ['drill-11'],
    technique: [
      {
        id: 'step-11-1',
        order: 1,
        title: 'Preparation and Timing',
        description: 'Time your jump to meet the shuttle at maximum height.',
        keyPoints: [
          'Move quickly behind the shuttle',
          'Prepare for jump as shuttle falls',
          'Time jump to hit at peak',
          'Non-racket arm raised for balance',
        ],
      },
      {
        id: 'step-11-2',
        order: 2,
        title: 'Scissor Kick',
        description: 'Execute a scissor kick for power and rotation.',
        keyPoints: [
          'Jump off both feet or back foot',
          'Legs scissor mid-air (racket leg moves back)',
          'Body rotates during jump',
          'Core engaged throughout',
        ],
      },
      {
        id: 'step-11-3',
        order: 3,
        title: 'Aerial Contact',
        description: 'Strike the shuttle at the highest point with full power.',
        keyPoints: [
          'Contact at peak of jump',
          'Full arm extension',
          'Explosive pronation',
          'Steep downward angle',
        ],
      },
      {
        id: 'step-11-4',
        order: 4,
        title: 'Landing',
        description: 'Land safely and prepare for the next shot.',
        keyPoints: [
          'Land on racket foot first',
          'Absorb impact with bent knee',
          'Immediately push back to center',
          'Ready for any return',
        ],
      },
    ],
  },
  {
    id: 'shot-12',
    name: 'Reverse Slice Drop',
    description:
      'A deceptive drop shot using reverse slice to change shuttle direction unexpectedly. Creates confusion and wrong-foots opponents.',
    difficulty: 'advanced',
    tags: getTagsByIds(['tag-advanced', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-deceptive']),
    relatedDrills: ['drill-12'],
    technique: [
      {
        id: 'step-12-1',
        order: 1,
        title: 'Identical Preparation',
        description: 'Prepare exactly as for a clear or smash.',
        keyPoints: [
          'Same backswing as power shots',
          'Same footwork pattern',
          'Same body positioning',
          'Opponent expects powerful shot',
        ],
      },
      {
        id: 'step-12-2',
        order: 2,
        title: 'Late Racket Face Change',
        description: 'Rotate racket face at the last moment.',
        keyPoints: [
          'Maintain speed until final moment',
          'Rotate racket to outside of shuttle',
          'Brush across the cork',
          'Decelerate just before contact',
        ],
      },
      {
        id: 'step-12-3',
        order: 3,
        title: 'Follow-through',
        description: 'Complete with a cross-body follow-through.',
        keyPoints: [
          'Racket goes across body',
          'Wrist relaxed after contact',
          'Be ready to cover net',
          'Move forward after shot',
        ],
      },
    ],
  },
  {
    id: 'shot-13',
    name: 'Backhand Smash',
    description:
      'An attacking smash from the backhand side. A rare but powerful weapon when mastered.',
    difficulty: 'advanced',
    tags: getTagsByIds(['tag-advanced', 'tag-overhead', 'tag-backhand', 'tag-rearcourt', 'tag-offensive']),
    relatedDrills: ['drill-14'],
    technique: [
      {
        id: 'step-13-1',
        order: 1,
        title: 'Quick Positioning',
        description: 'Get into position faster than for a backhand clear.',
        keyPoints: [
          'Recognize smash opportunity early',
          'Position slightly in front of shuttle',
          'Back toward net',
          'Elbow high and ready',
        ],
      },
      {
        id: 'step-13-2',
        order: 2,
        title: 'Power Generation',
        description: 'Use explosive forearm and wrist for power.',
        keyPoints: [
          'Coil wrist back fully',
          'Explosive forearm rotation',
          'Fast elbow extension',
          'Contact in front of body',
        ],
      },
      {
        id: 'step-13-3',
        order: 3,
        title: 'Downward Angle',
        description: 'Aim for a steep angle into opponent\'s court.',
        keyPoints: [
          'Angle racket face down',
          'Target mid-court area',
          'Don\'t try for too much angle',
          'Power over precision for this shot',
        ],
      },
    ],
  },
  {
    id: 'shot-14',
    name: 'Stick Smash',
    description:
      'A half-smash that sticks to the opponent\'s body. Difficult to return due to awkward position required.',
    difficulty: 'advanced',
    tags: getTagsByIds(['tag-advanced', 'tag-overhead', 'tag-forehand', 'tag-rearcourt', 'tag-offensive']),
    relatedDrills: ['drill-11', 'drill-12'],
    technique: [
      {
        id: 'step-14-1',
        order: 1,
        title: 'Read Opponent Position',
        description: 'Identify when opponent is committed to one side.',
        keyPoints: [
          'Watch opponent\'s movement',
          'Aim at their body/hip area',
          'Choose when they\'re moving',
          'Target their dominant shoulder',
        ],
      },
      {
        id: 'step-14-2',
        order: 2,
        title: 'Controlled Power',
        description: 'Use 60-70% power for accuracy and flat trajectory.',
        keyPoints: [
          'Not a full-power smash',
          'Flatter trajectory than normal smash',
          'Accuracy over speed',
          'Fast but controllable',
        ],
      },
    ],
  },
  {
    id: 'shot-15',
    name: 'Spinning Net Shot',
    description:
      'An advanced net shot that spins and tumbles, making it extremely difficult to return cleanly.',
    difficulty: 'advanced',
    tags: getTagsByIds(['tag-advanced', 'tag-underarm', 'tag-forehand', 'tag-frontcourt', 'tag-deceptive']),
    relatedDrills: ['drill-9'],
    technique: [
      {
        id: 'step-15-1',
        order: 1,
        title: 'Precise Positioning',
        description: 'Get very close to the net for maximum spin.',
        keyPoints: [
          'Racket almost touching net tape',
          'Low body position',
          'Eyes level with shuttle',
          'Relaxed grip for feel',
        ],
      },
      {
        id: 'step-15-2',
        order: 2,
        title: 'Slicing Action',
        description: 'Brush across the shuttle to create spin.',
        keyPoints: [
          'Cut across the shuttle cork',
          'Use finger power',
          'Slight outside-to-inside motion',
          'Very gentle contact',
        ],
      },
      {
        id: 'step-15-3',
        order: 3,
        title: 'Spin Control',
        description: 'Vary spin direction based on situation.',
        keyPoints: [
          'Forehand spin goes left (for right-hander)',
          'Backhand spin goes right',
          'Speed of slice affects spin amount',
          'Practice both directions',
        ],
      },
    ],
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all shots
 */
export const getAllShots = (): Shot[] => mockShots;

/**
 * Get shot by ID
 */
export const getShotById = (id: string): Shot | undefined =>
  mockShots.find((shot) => shot.id === id);

/**
 * Get shots by difficulty
 */
export const getShotsByDifficulty = (difficulty: Shot['difficulty']): Shot[] =>
  mockShots.filter((shot) => shot.difficulty === difficulty);

/**
 * Search shots by name or description
 */
export const searchShots = (query: string): Shot[] => {
  const lowerQuery = query.toLowerCase();
  return mockShots.filter(
    (shot) =>
      shot.name.toLowerCase().includes(lowerQuery) ||
      shot.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all unique tags from shots
 */
export const getAllShotTags = (): Tag[] => mockShotTags;

/**
 * Get related drills for a shot
 */
export const getRelatedDrillIds = (shotId: string): string[] => {
  const shot = getShotById(shotId);
  return shot?.relatedDrills ?? [];
};
