/**
 * Mock Drills Data
 *
 * Realistic badminton drills for development and testing.
 * Covers all skill levels with variety in drill types.
 */

import type { Drill, Tag } from '../../../types';

// =============================================================================
// Mock Tags
// =============================================================================

export const mockTags: Tag[] = [
  // Skill Level
  { id: 'tag-beginner', name: 'Beginner', category: 'skill_level' },
  { id: 'tag-intermediate', name: 'Intermediate', category: 'skill_level' },
  { id: 'tag-advanced', name: 'Advanced', category: 'skill_level' },

  // Drill Type
  { id: 'tag-footwork', name: 'Footwork', category: 'drill_type' },
  { id: 'tag-shot-drill', name: 'Shot Practice', category: 'drill_type' },
  { id: 'tag-rally', name: 'Rally', category: 'drill_type' },
  { id: 'tag-conditioning', name: 'Conditioning', category: 'drill_type' },

  // Shot Category
  { id: 'tag-clear', name: 'Clear', category: 'shot_category' },
  { id: 'tag-drop', name: 'Drop Shot', category: 'shot_category' },
  { id: 'tag-smash', name: 'Smash', category: 'shot_category' },
  { id: 'tag-net', name: 'Net Play', category: 'shot_category' },
  { id: 'tag-serve', name: 'Serve', category: 'shot_category' },
  { id: 'tag-drive', name: 'Drive', category: 'shot_category' },

  // Court Position
  { id: 'tag-frontcourt', name: 'Front Court', category: 'court_position' },
  { id: 'tag-midcourt', name: 'Mid Court', category: 'court_position' },
  { id: 'tag-rearcourt', name: 'Rear Court', category: 'court_position' },

  // Training Focus
  { id: 'tag-speed', name: 'Speed', category: 'training_focus' },
  { id: 'tag-accuracy', name: 'Accuracy', category: 'training_focus' },
  { id: 'tag-power', name: 'Power', category: 'training_focus' },
  { id: 'tag-consistency', name: 'Consistency', category: 'training_focus' },
  { id: 'tag-reaction', name: 'Reaction Time', category: 'training_focus' },
];

// Helper to get tags by IDs
const getTagsByIds = (ids: string[]): Tag[] =>
  mockTags.filter((tag) => ids.includes(tag.id));

// =============================================================================
// Mock Drills
// =============================================================================

export const mockDrills: Drill[] = [
  // =====================
  // BEGINNER DRILLS
  // =====================
  {
    id: 'drill-1',
    title: 'Basic Shadow Footwork',
    description:
      'Master the fundamental footwork patterns without a shuttlecock. Focus on proper stance, balance, and movement efficiency.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-conditioning']),
    instructions: [
      {
        id: 'inst-1-1',
        order: 1,
        text: 'Start at the center of the court in ready position with knees slightly bent and weight on the balls of your feet.',
      },
      {
        id: 'inst-1-2',
        order: 2,
        text: 'Practice the split step by jumping slightly and landing with feet shoulder-width apart as your opponent hits.',
      },
      {
        id: 'inst-1-3',
        order: 3,
        text: 'Move to the front right corner using a lunge step, then recover to center.',
      },
      {
        id: 'inst-1-4',
        order: 4,
        text: 'Repeat for all six corners: front right, front left, mid right, mid left, rear right, rear left.',
      },
      {
        id: 'inst-1-5',
        order: 5,
        text: 'Complete 3 sets of 10 repetitions to each corner with 30-second rest between sets.',
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: 'drill-2',
    title: 'Wall Rally Practice',
    description:
      'Build consistency and control by rallying against a wall. Perfect for solo practice sessions.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 10,
    tags: getTagsByIds(['tag-beginner', 'tag-shot-drill', 'tag-consistency']),
    instructions: [
      {
        id: 'inst-2-1',
        order: 1,
        text: 'Stand 2-3 meters from a wall with your racket in ready position.',
      },
      {
        id: 'inst-2-2',
        order: 2,
        text: 'Hit the shuttlecock gently against the wall using forehand strokes.',
      },
      {
        id: 'inst-2-3',
        order: 3,
        text: 'Focus on keeping the shuttle at a consistent height and maintaining a steady rhythm.',
      },
      {
        id: 'inst-2-4',
        order: 4,
        text: 'After 20 successful hits, switch to backhand strokes.',
      },
      {
        id: 'inst-2-5',
        order: 5,
        text: 'Challenge yourself to reach 50 consecutive hits without dropping the shuttle.',
      },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-15'),
  },
  {
    id: 'drill-3',
    title: 'Serve Accuracy Training',
    description:
      'Improve your serve placement by targeting specific areas of the service court.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-beginner', 'tag-serve', 'tag-accuracy']),
    instructions: [
      {
        id: 'inst-3-1',
        order: 1,
        text: 'Place targets (cones or markers) in the four corners of the service court.',
      },
      {
        id: 'inst-3-2',
        order: 2,
        text: 'Start with 10 low serves aiming for the front corners of the service box.',
      },
      {
        id: 'inst-3-3',
        order: 3,
        text: 'Progress to 10 high serves targeting the back corners.',
      },
      {
        id: 'inst-3-4',
        order: 4,
        text: 'Track your accuracy by counting successful target hits.',
      },
      {
        id: 'inst-3-5',
        order: 5,
        text: 'Aim for at least 7 out of 10 serves landing in the target zone.',
      },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-4',
    title: 'Net Kill Basics',
    description:
      'Learn the fundamentals of attacking loose shots at the net with quick, decisive kills.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-net', 'tag-frontcourt', 'tag-reaction']),
    instructions: [
      {
        id: 'inst-4-1',
        order: 1,
        text: 'Position yourself close to the net in an attacking stance.',
      },
      {
        id: 'inst-4-2',
        order: 2,
        text: 'Have a partner feed high shuttles to the net area.',
      },
      {
        id: 'inst-4-3',
        order: 3,
        text: 'Use a short, punchy motion to kill the shuttle downward.',
      },
      {
        id: 'inst-4-4',
        order: 4,
        text: 'Focus on keeping your racket head above wrist level.',
      },
      {
        id: 'inst-4-5',
        order: 5,
        text: 'Practice 20 kills to forehand side, then 20 to backhand side.',
      },
    ],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-06-15'),
  },

  // =====================
  // INTERMEDIATE DRILLS
  // =====================
  {
    id: 'drill-5',
    title: 'Four Corners Footwork',
    description:
      'High-intensity footwork drill covering all four corners with proper technique and recovery.',
    difficulty: 'intermediate',
    type: 'footwork',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-footwork', 'tag-speed', 'tag-conditioning']),
    instructions: [
      {
        id: 'inst-5-1',
        order: 1,
        text: 'Start at center court. A partner or coach will call out corners randomly.',
      },
      {
        id: 'inst-5-2',
        order: 2,
        text: 'Move to the called corner using proper footwork technique and simulate a shot.',
      },
      {
        id: 'inst-5-3',
        order: 3,
        text: 'Recover to center position before the next call.',
      },
      {
        id: 'inst-5-4',
        order: 4,
        text: 'Maintain low body position and quick feet throughout.',
      },
      {
        id: 'inst-5-5',
        order: 5,
        text: 'Complete 3 sets of 2 minutes with 1-minute rest between sets.',
      },
      {
        id: 'inst-5-6',
        order: 6,
        text: 'Focus on explosive first step and smooth recovery movement.',
      },
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-05-20'),
  },
  {
    id: 'drill-6',
    title: 'Clear to Drop Combination',
    description:
      'Practice transitioning between defensive clears and attacking drop shots to build tactical awareness.',
    difficulty: 'intermediate',
    type: 'combination',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-clear', 'tag-drop', 'tag-rearcourt', 'tag-accuracy']),
    instructions: [
      {
        id: 'inst-6-1',
        order: 1,
        text: 'Partner feeds a high clear to your rear court.',
      },
      {
        id: 'inst-6-2',
        order: 2,
        text: 'Return with a defensive clear to buy time and reset position.',
      },
      {
        id: 'inst-6-3',
        order: 3,
        text: 'On the next feed, execute a deceptive drop shot.',
      },
      {
        id: 'inst-6-4',
        order: 4,
        text: 'Alternate between clears and drops, maintaining the same preparation.',
      },
      {
        id: 'inst-6-5',
        order: 5,
        text: 'Focus on disguising your shot until the last moment.',
      },
      {
        id: 'inst-6-6',
        order: 6,
        text: 'Complete 30 repetitions, aiming for consistent placement.',
      },
    ],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: 'drill-7',
    title: 'Multi-Shuttle Speed Drill',
    description:
      'Fast-paced drill using multiple shuttles to improve reaction time and shot execution under pressure.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-shot-drill', 'tag-speed', 'tag-reaction']),
    instructions: [
      {
        id: 'inst-7-1',
        order: 1,
        text: 'Feeder stands at the net with 20-30 shuttles.',
      },
      {
        id: 'inst-7-2',
        order: 2,
        text: 'Shuttles are fed rapidly to different areas of your court.',
      },
      {
        id: 'inst-7-3',
        order: 3,
        text: 'Return each shuttle with the appropriate shot (clear, drop, drive).',
      },
      {
        id: 'inst-7-4',
        order: 4,
        text: 'Focus on quick recovery after each shot.',
      },
      {
        id: 'inst-7-5',
        order: 5,
        text: 'Complete 3 sets with 2-minute rest between sets.',
      },
    ],
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'drill-8',
    title: 'Drive Defense Rally',
    description:
      'Build defensive reflexes with continuous flat drive exchanges at mid-court.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-drive', 'tag-midcourt', 'tag-reaction']),
    instructions: [
      {
        id: 'inst-8-1',
        order: 1,
        text: 'Both players position at mid-court on opposite sides.',
      },
      {
        id: 'inst-8-2',
        order: 2,
        text: 'Exchange flat drives keeping the shuttle at shoulder height.',
      },
      {
        id: 'inst-8-3',
        order: 3,
        text: 'Maintain a compact swing and quick racket recovery.',
      },
      {
        id: 'inst-8-4',
        order: 4,
        text: 'Try to sustain rallies of 20+ shots without errors.',
      },
      {
        id: 'inst-8-5',
        order: 5,
        text: 'Gradually increase pace as technique improves.',
      },
    ],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-05-25'),
  },
  {
    id: 'drill-9',
    title: 'Net Spin Practice',
    description:
      'Develop touch and control with spinning net shots that tumble over the net.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-net', 'tag-frontcourt', 'tag-accuracy']),
    instructions: [
      {
        id: 'inst-9-1',
        order: 1,
        text: 'Stand close to the net with a basket of shuttles.',
      },
      {
        id: 'inst-9-2',
        order: 2,
        text: 'Self-feed by dropping the shuttle and slicing across the cork.',
      },
      {
        id: 'inst-9-3',
        order: 3,
        text: 'Use a brushing motion to create spin on the shuttle.',
      },
      {
        id: 'inst-9-4',
        order: 4,
        text: 'Aim for the shuttle to tumble and die close to the net.',
      },
      {
        id: 'inst-9-5',
        order: 5,
        text: 'Practice both forehand and backhand spinning net shots.',
      },
      {
        id: 'inst-9-6',
        order: 6,
        text: 'Complete 50 repetitions on each side.',
      },
    ],
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-06-05'),
  },

  // =====================
  // ADVANCED DRILLS
  // =====================
  {
    id: 'drill-10',
    title: 'Full Court Singles Pattern',
    description:
      'Simulate singles match patterns with controlled rally sequences covering the entire court.',
    difficulty: 'advanced',
    type: 'combination',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-advanced', 'tag-rally', 'tag-conditioning', 'tag-consistency']),
    instructions: [
      {
        id: 'inst-10-1',
        order: 1,
        text: 'Play structured rallies: clear-clear-drop-net-lift pattern.',
      },
      {
        id: 'inst-10-2',
        order: 2,
        text: 'Focus on placement rather than power during the pattern.',
      },
      {
        id: 'inst-10-3',
        order: 3,
        text: 'After mastering the pattern, allow free play after the lift.',
      },
      {
        id: 'inst-10-4',
        order: 4,
        text: 'Maintain high intensity and proper technique throughout.',
      },
      {
        id: 'inst-10-5',
        order: 5,
        text: 'Play 5 games to 11 points with pattern starting each rally.',
      },
    ],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'drill-11',
    title: 'Jump Smash Power Training',
    description:
      'Develop explosive jumping smashes with maximum power and steep angles.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-rearcourt', 'tag-power']),
    instructions: [
      {
        id: 'inst-11-1',
        order: 1,
        text: 'Partner feeds high clears to your rear court.',
      },
      {
        id: 'inst-11-2',
        order: 2,
        text: 'Prepare early with scissor kick jump timing.',
      },
      {
        id: 'inst-11-3',
        order: 3,
        text: 'Contact the shuttle at the highest point with full body rotation.',
      },
      {
        id: 'inst-11-4',
        order: 4,
        text: 'Focus on steep downward angle rather than just speed.',
      },
      {
        id: 'inst-11-5',
        order: 5,
        text: 'Land in a balanced position ready for the next shot.',
      },
      {
        id: 'inst-11-6',
        order: 6,
        text: 'Complete 20 jump smashes, rest 2 minutes, repeat 3 times.',
      },
    ],
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date('2024-06-08'),
  },
  {
    id: 'drill-12',
    title: 'Deception and Variation Drill',
    description:
      'Master shot disguise by using identical preparation for multiple shot types.',
    difficulty: 'advanced',
    type: 'combination',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-shot-drill', 'tag-accuracy']),
    instructions: [
      {
        id: 'inst-12-1',
        order: 1,
        text: 'Receive high feeds to the rear court with identical preparation each time.',
      },
      {
        id: 'inst-12-2',
        order: 2,
        text: 'Randomly execute: clear, drop shot, or smash.',
      },
      {
        id: 'inst-12-3',
        order: 3,
        text: 'Feeder should not be able to predict your shot choice.',
      },
      {
        id: 'inst-12-4',
        order: 4,
        text: 'Delay your wrist action until the last possible moment.',
      },
      {
        id: 'inst-12-5',
        order: 5,
        text: 'Practice 40 shots with random selection.',
      },
    ],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-06-14'),
  },
  {
    id: 'drill-13',
    title: 'Doubles Rotation Drill',
    description:
      'Practice smooth front-back rotation with a partner in doubles attack and defense.',
    difficulty: 'advanced',
    type: 'combination',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-advanced', 'tag-rally', 'tag-conditioning', 'tag-speed']),
    instructions: [
      {
        id: 'inst-13-1',
        order: 1,
        text: 'Start in attacking formation: one front, one back.',
      },
      {
        id: 'inst-13-2',
        order: 2,
        text: 'Play controlled rallies against another pair.',
      },
      {
        id: 'inst-13-3',
        order: 3,
        text: 'Rotate positions based on shuttle height - low = side-by-side, high = front-back.',
      },
      {
        id: 'inst-13-4',
        order: 4,
        text: 'Communicate with partner using verbal cues.',
      },
      {
        id: 'inst-13-5',
        order: 5,
        text: 'Focus on seamless transitions without hesitation.',
      },
      {
        id: 'inst-13-6',
        order: 6,
        text: 'Play 15-minute sets with rotation analysis between sets.',
      },
    ],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-06-16'),
  },
  {
    id: 'drill-14',
    title: 'Backhand Clear Development',
    description:
      'Strengthen the backhand overhead clear for improved court coverage and recovery.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-clear', 'tag-rearcourt', 'tag-power']),
    instructions: [
      {
        id: 'inst-14-1',
        order: 1,
        text: 'Partner feeds to your backhand rear corner.',
      },
      {
        id: 'inst-14-2',
        order: 2,
        text: 'Turn your body to face the rear corner, leading with your racket shoulder.',
      },
      {
        id: 'inst-14-3',
        order: 3,
        text: 'Generate power from your forearm rotation and wrist snap.',
      },
      {
        id: 'inst-14-4',
        order: 4,
        text: 'Aim for deep clears that reach the opponent\'s baseline.',
      },
      {
        id: 'inst-14-5',
        order: 5,
        text: 'Complete 30 clears, focusing on height and depth.',
      },
    ],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'drill-15',
    title: 'Pressure Point Training',
    description:
      'High-intensity drill simulating match pressure with physical and mental challenges.',
    difficulty: 'advanced',
    type: 'combination',
    estimatedDuration: 35,
    tags: getTagsByIds(['tag-advanced', 'tag-conditioning', 'tag-rally', 'tag-speed', 'tag-reaction']),
    instructions: [
      {
        id: 'inst-15-1',
        order: 1,
        text: 'Play points where you must win 3 consecutive points to earn 1 game point.',
      },
      {
        id: 'inst-15-2',
        order: 2,
        text: 'If opponent wins a point, your streak resets to zero.',
      },
      {
        id: 'inst-15-3',
        order: 3,
        text: 'First to 5 game points wins the set.',
      },
      {
        id: 'inst-15-4',
        order: 4,
        text: 'Between points, perform 5 burpees to simulate fatigue.',
      },
      {
        id: 'inst-15-5',
        order: 5,
        text: 'Focus on maintaining shot quality under physical stress.',
      },
      {
        id: 'inst-15-6',
        order: 6,
        text: 'Complete 3 sets with 5-minute recovery between sets.',
      },
    ],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-06-20'),
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all drills
 */
export const getAllDrills = (): Drill[] => mockDrills;

/**
 * Get drill by ID
 */
export const getDrillById = (id: string): Drill | undefined =>
  mockDrills.find((drill) => drill.id === id);

/**
 * Get drills by difficulty
 */
export const getDrillsByDifficulty = (difficulty: Drill['difficulty']): Drill[] =>
  mockDrills.filter((drill) => drill.difficulty === difficulty);

/**
 * Get drills by type
 */
export const getDrillsByType = (type: Drill['type']): Drill[] =>
  mockDrills.filter((drill) => drill.type === type);

/**
 * Search drills by title or description
 */
export const searchDrills = (query: string): Drill[] => {
  const lowerQuery = query.toLowerCase();
  return mockDrills.filter(
    (drill) =>
      drill.title.toLowerCase().includes(lowerQuery) ||
      drill.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get all unique tags from drills
 */
export const getAllTags = (): Tag[] => mockTags;
