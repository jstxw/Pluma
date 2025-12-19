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
  { id: 'tag-control', name: 'Control', category: 'training_focus' },
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
        text: 'Start with 10 backhand serves aiming for the front corners of the service box.',
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
    type: 'shot',
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
    type: 'rally',
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
    type: 'shot',
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
    type: 'rally',
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
    type: 'rally',
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
  {
    id: 'drill-16',
    title: 'Forehand Clear Practice',
    description:
      'Develop proper overhead technique and consistency for forehand clears to the backcourt.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-beginner', 'tag-clear', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-16-1', order: 1, text: 'Stand in your rear court in a ready position.' },
      { id: 'inst-16-2', order: 2, text: 'Have a partner or coach lift the shuttle to your forehand side.' },
      { id: 'inst-16-3', order: 3, text: "Hit a high clear aiming toward the opponent's back boundary line." },
      { id: 'inst-16-4', order: 4, text: 'Focus on relaxed grip, full swing, and high contact point.' },
      { id: 'inst-16-5', order: 5, text: 'Repeat for 10–15 clears before resting.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-17',
    title: 'Static Drop Shot Practice',
    description:
      'Practice controlled forehand drop shots from the backcourt with a focus on accuracy.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-drop', 'tag-control']),
    instructions: [
      { id: 'inst-17-1', order: 1, text: 'Start in the rear court with a partner feeding high lifts.' },
      { id: 'inst-17-2', order: 2, text: 'Hit a gentle drop shot toward the front service line.' },
      { id: 'inst-17-3', order: 3, text: 'Use the same preparation as a clear for deception.' },
      { id: 'inst-17-4', order: 4, text: 'Focus on soft touch rather than speed.' },
      { id: 'inst-17-5', order: 5, text: 'Complete 15–20 drops before switching roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-18',
    title: 'Straight Net Shot Basics',
    description:
      'Learn correct net shot technique with emphasis on control and tight net clearance.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-net', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-18-1', order: 1, text: 'Stand close to the net in a low, balanced stance.' },
      { id: 'inst-18-2', order: 2, text: 'Have a partner gently feed the shuttle to the net area.' },
      { id: 'inst-18-3', order: 3, text: 'Play a soft straight net shot just over the tape.' },
      { id: 'inst-18-4', order: 4, text: 'Focus on relaxed fingers and minimal swing.' },
      { id: 'inst-18-5', order: 5, text: 'Repeat 10–15 shots on forehand, then backhand.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-19',
    title: 'Backhand Serve Practice',
    description:
      'Build consistency and control for backhand serves that skim the net.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-serve', 'tag-accuracy']),
    instructions: [
      { id: 'inst-19-1', order: 1, text: 'Stand behind the service line with a relaxed grip.' },
      { id: 'inst-19-2', order: 2, text: 'Aim to serve the shuttle just over the net tape.' },
      { id: 'inst-19-3', order: 3, text: 'Target the front service line corners.' },
      { id: 'inst-19-4', order: 4, text: 'Maintain the same serving motion each time.' },
      { id: 'inst-19-5', order: 5, text: 'Serve 20 shuttles and count successful serves.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-20',
    title: 'High Serve Practice',
    description:
      'Practice high serves with correct height and depth for singles play.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-serve', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-20-1', order: 1, text: 'Stand behind the singles service line.' },
      { id: 'inst-20-2', order: 2, text: 'Serve the shuttle high with a smooth, full motion.' },
      { id: 'inst-20-3', order: 3, text: 'Aim to land the shuttle near the back boundary line.' },
      { id: 'inst-20-4', order: 4, text: 'Focus on height before power.' },
      { id: 'inst-20-5', order: 5, text: 'Complete 15–20 high serves with consistent form.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-21',
    title: 'Clear–Drop Alternation',
    description:
      'Practice alternating between high clears and controlled drop shots using a fixed pattern to improve shot quality and consistency.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-beginner', 'tag-clear', 'tag-drop', 'tag-rearcourt', 'tag-control']),
    instructions: [
      {
        id: 'inst-21-1',
        order: 1,
        text: 'Start in the rear court in a balanced ready position.',
      },
      {
        id: 'inst-21-2',
        order: 2,
        text: 'Have a partner or coach lift the shuttle high to your forehand side.',
      },
      {
        id: 'inst-21-3',
        order: 3,
        text: "Hit a high clear aiming toward the opponent's back boundary line.",
      },
      {
        id: 'inst-21-4',
        order: 4,
        text: 'On the next lift, play a controlled straight drop shot to the front court.',
      },
      {
        id: 'inst-21-5',
        order: 5,
        text: 'Continue alternating: one clear, one drop, keeping the pattern fixed.',
      },
      {
        id: 'inst-21-6',
        order: 6,
        text: 'Focus on using the same preparation for both shots to build disguise.',
      },
      {
        id: 'inst-21-7',
        order: 7,
        text: 'Complete 10 clear–drop pairs, then rest or switch roles.',
      },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-22',
    title: 'Clear to Target Zones',
    description:
      'Improve clear accuracy by aiming high clears into specific backcourt target zones.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-beginner', 'tag-clear', 'tag-rearcourt', 'tag-accuracy']),
    instructions: [
      { id: 'inst-22-1', order: 1, text: 'Place cones or markers in the two backcourt corners.' },
      { id: 'inst-22-2', order: 2, text: 'Start in the rear court with a shuttle feed or self-feed.' },
      { id: 'inst-22-3', order: 3, text: 'Hit a high forehand clear aiming at one target zone.' },
      { id: 'inst-22-4', order: 4, text: 'Alternate targets after each clear.' },
      { id: 'inst-22-5', order: 5, text: 'Count how many clears land within the target areas.' },
      { id: 'inst-22-6', order: 6, text: 'Perform 15–20 clears before resting.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-23',
    title: 'Drop to Service Line Targets',
    description:
      'Develop drop shot control by targeting the front service line area.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-drop', 'tag-rearcourt', 'tag-accuracy']),
    instructions: [
      { id: 'inst-23-1', order: 1, text: 'Place markers along the front service line.' },
      { id: 'inst-23-2', order: 2, text: 'Have a partner lift the shuttle to your forehand rear court.' },
      { id: 'inst-23-3', order: 3, text: 'Play a straight drop shot aiming just inside the service line.' },
      { id: 'inst-23-4', order: 4, text: 'Use soft touch and controlled swing.' },
      { id: 'inst-23-5', order: 5, text: 'Reset after each shot and repeat.' },
      { id: 'inst-23-6', order: 6, text: 'Complete 15–20 drops before switching roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-24',
    title: 'Net Tape Awareness Drill',
    description:
      'Train tight net shots that skim the tape and reduce lift opportunities.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 10,
    tags: getTagsByIds(['tag-beginner', 'tag-net', 'tag-frontcourt', 'tag-control']),
    instructions: [
      { id: 'inst-24-1', order: 1, text: 'Stand close to the net in a low, balanced stance.' },
      { id: 'inst-24-2', order: 2, text: 'Have a partner gently feed shuttles to the net area.' },
      { id: 'inst-24-3', order: 3, text: 'Play straight net shots that skim just over the tape.' },
      { id: 'inst-24-4', order: 4, text: 'Focus on relaxed fingers and minimal swing.' },
      { id: 'inst-24-5', order: 5, text: 'Stop and reset if the shuttle goes too high.' },
      { id: 'inst-24-6', order: 6, text: 'Repeat 10–15 shots on each side.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-25',
    title: 'Forehand and Backhand Net Shot Repetition (V-Shape)',
    description:
      'Practice alternating forehand and backhand net shots using a V-shaped movement pattern.',
    difficulty: 'beginner',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-beginner', 'tag-net', 'tag-footwork', 'tag-control']),
    instructions: [
      { id: 'inst-25-1', order: 1, text: 'Start at the net center in a low ready position.' },
      { id: 'inst-25-2', order: 2, text: 'Have a feeder alternate shuttles to forehand and backhand net areas.' },
      { id: 'inst-25-3', order: 3, text: 'Play a straight net shot on each feed.' },
      { id: 'inst-25-4', order: 4, text: 'Move back to the center after every shot.' },
      { id: 'inst-25-5', order: 5, text: 'Maintain balance and controlled lunges.' },
      { id: 'inst-25-6', order: 6, text: 'Perform 10–12 repetitions per side.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-26',
    title: 'Split Step Basics',
    description:
      'Learn the split step without follow-up movement to build timing and balance.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 5,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-26-1', order: 1, text: 'Stand in base position with knees slightly bent.' },
      { id: 'inst-26-2', order: 2, text: 'Perform a small hop and land on both feet.' },
      { id: 'inst-26-3', order: 3, text: 'Focus on soft landing and balance.' },
      { id: 'inst-26-4', order: 4, text: 'Reset and repeat.' },
      { id: 'inst-26-5', order: 5, text: 'Complete 8–10 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-27',
    title: 'Base Position Reset Drill',
    description:
      'Build habit of returning to base position after every movement.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-27-1', order: 1, text: 'Start at the center base position.' },
      { id: 'inst-27-2', order: 2, text: 'Step lightly to any direction.' },
      { id: 'inst-27-3', order: 3, text: 'Immediately return to base.' },
      { id: 'inst-27-4', order: 4, text: 'Maintain balance and posture.' },
      { id: 'inst-27-5', order: 5, text: 'Repeat 10–12 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-28',
    title: 'Lunge Hold Drill',
    description:
      'Improve frontcourt balance and stability using controlled lunges.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-28-1', order: 1, text: 'Step forward into a frontcourt lunge.' },
      { id: 'inst-28-2', order: 2, text: 'Hold the lunge position for 2 seconds.' },
      { id: 'inst-28-3', order: 3, text: 'Keep knee aligned and back straight.' },
      { id: 'inst-28-4', order: 4, text: 'Push back to base position.' },
      { id: 'inst-28-5', order: 5, text: 'Repeat 6–8 times per side.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-29',
    title: 'Side-Step Awareness Drill',
    description:
      'Practice lateral movement using side steps without crossing feet.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 6,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-29-1', order: 1, text: 'Stand in base position.' },
      { id: 'inst-29-2', order: 2, text: 'Side-step to the left without crossing feet.' },
      { id: 'inst-29-3', order: 3, text: 'Return to base.' },
      { id: 'inst-29-4', order: 4, text: 'Repeat to the right side.' },
      { id: 'inst-29-5', order: 5, text: 'Perform 8–10 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-30',
    title: 'Racket-Up Ready Position Drill',
    description:
      'Build habit of keeping racket up and body ready before movement.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 5,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-30-1', order: 1, text: 'Stand in base position with racket up.' },
      { id: 'inst-30-2', order: 2, text: 'Check elbow position in front of body.' },
      { id: 'inst-30-3', order: 3, text: 'Hold ready stance for 5 seconds.' },
      { id: 'inst-30-4', order: 4, text: 'Relax and reset.' },
      { id: 'inst-30-5', order: 5, text: 'Repeat 6–8 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-31',
    title: 'Net Lunge and Recover',
    description:
      'Practice controlled lunging to the net and recovering to base.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 10,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-31-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-31-2', order: 2, text: 'Lunge forward to one net corner.' },
      { id: 'inst-31-3', order: 3, text: 'Pause briefly to stabilize.' },
      { id: 'inst-31-4', order: 4, text: 'Push back to base position.' },
      { id: 'inst-31-5', order: 5, text: 'Repeat 8 times on one side only.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-32',
    title: 'Rear Court Step-Back Drill',
    description:
      'Introduce backward movement for forehand rear court coverage.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-32-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-32-2', order: 2, text: 'Step back toward the forehand rear corner.' },
      { id: 'inst-32-3', order: 3, text: 'Perform a shadow clear motion.' },
      { id: 'inst-32-4', order: 4, text: 'Return to base under control.' },
      { id: 'inst-32-5', order: 5, text: 'Repeat 6–8 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-33',
    title: 'Side Step to Midcourt and Back',
    description:
      'Practice short lateral movement to midcourt and recovery.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-midcourt']),
    instructions: [
      { id: 'inst-33-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-33-2', order: 2, text: 'Side-step to the midcourt forehand side.' },
      { id: 'inst-33-3', order: 3, text: 'Pause briefly, then stabilize.' },
      { id: 'inst-33-4', order: 4, text: 'Return to base.' },
      { id: 'inst-33-5', order: 5, text: 'Perform 8–10 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-34',
    title: 'Forward-Only Net Approach Drill',
    description:
      'Build confidence moving forward toward the net without striking a shuttle.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 6,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-34-1', order: 1, text: 'Begin at base position.' },
      { id: 'inst-34-2', order: 2, text: 'Move forward toward the net with control.' },
      { id: 'inst-34-3', order: 3, text: 'Stop before lunging.' },
      { id: 'inst-34-4', order: 4, text: 'Walk back to base position.' },
      { id: 'inst-34-5', order: 5, text: 'Repeat 6–8 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-35',
    title: 'One-Corner Shadow Footwork',
    description:
      'Reinforce correct movement patterns to a single corner.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 6,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-35-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-35-2', order: 2, text: 'Move to a chosen corner.' },
      { id: 'inst-35-3', order: 3, text: 'Perform the appropriate shadow shot.' },
      { id: 'inst-35-4', order: 4, text: 'Return to base.' },
      { id: 'inst-35-5', order: 5, text: 'Repeat 6–10 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-36',
    title: 'V-Shape Net Footwork',
    description:
      'Practice short V-shaped movement between net corners and base.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 10,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-36-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-36-2', order: 2, text: 'Move to the forehand net corner.' },
      { id: 'inst-36-3', order: 3, text: 'Return to base.' },
      { id: 'inst-36-4', order: 4, text: 'Move to the backhand net corner.' },
      { id: 'inst-36-5', order: 5, text: 'Repeat 6–8 cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-37',
    title: 'Net to Base to Net',
    description:
      'Improve recovery awareness with slow-paced net movement.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 10,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork']),
    instructions: [
      { id: 'inst-37-1', order: 1, text: 'Begin at base position.' },
      { id: 'inst-37-2', order: 2, text: 'Move forward to the net.' },
      { id: 'inst-37-3', order: 3, text: 'Return slowly to base.' },
      { id: 'inst-37-4', order: 4, text: 'Reset before the next repetition.' },
      { id: 'inst-37-5', order: 5, text: 'Complete 8 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-38',
    title: 'Frontcourt Two-Point Movement',
    description:
      'Practice controlled movement between two frontcourt points.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-38-1', order: 1, text: 'Start near the front service line.' },
      { id: 'inst-38-2', order: 2, text: 'Move to the forehand net corner.' },
      { id: 'inst-38-3', order: 3, text: 'Return to starting point.' },
      { id: 'inst-38-4', order: 4, text: 'Repeat on the backhand side.' },
      { id: 'inst-38-5', order: 5, text: 'Perform 6–8 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-39',
    title: 'Rearcourt Two-Point Shadow',
    description:
      'Practice rear court movement using only the forehand corner.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 8,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-39-1', order: 1, text: 'Begin at base position.' },
      { id: 'inst-39-2', order: 2, text: 'Move to the forehand rear corner.' },
      { id: 'inst-39-3', order: 3, text: 'Perform a shadow clear motion.' },
      { id: 'inst-39-4', order: 4, text: 'Return to base.' },
      { id: 'inst-39-5', order: 5, text: 'Repeat 6–8 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-40',
    title: 'Net Touch and Reset Drill',
    description:
      'Introduce controlled net approach with immediate reset.',
    difficulty: 'beginner',
    type: 'footwork',
    estimatedDuration: 6,
    tags: getTagsByIds(['tag-beginner', 'tag-footwork', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-40-1', order: 1, text: 'Start at base position.' },
      { id: 'inst-40-2', order: 2, text: 'Move forward and lightly touch the net tape.' },
      { id: 'inst-40-3', order: 3, text: 'Immediately step back to base.' },
      { id: 'inst-40-4', order: 4, text: 'Maintain balance throughout the movement.' },
      { id: 'inst-40-5', order: 5, text: 'Repeat 6–10 times.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-41',
    title: 'Smash–Recover–Smash (Fixed Pattern)',
    description:
      'Build consistent standard smash technique with recovery to base between shots.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-smash', 'tag-rearcourt', 'tag-footwork']),
    instructions: [
      { id: 'inst-41-1', order: 1, text: 'Start at base position with racket up.' },
      { id: 'inst-41-2', order: 2, text: 'Feeder lifts the shuttle high to your rear court.' },
      { id: 'inst-41-3', order: 3, text: 'Hit a standard smash with controlled form (not maximum power).' },
      { id: 'inst-41-4', order: 4, text: 'Recover to base immediately after landing.' },
      { id: 'inst-41-5', order: 5, text: 'Repeat for 8–12 smashes, then rest and switch roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-42',
    title: 'Smash to Target Zones',
    description:
      'Improve smash placement by repeatedly hitting into defined target areas.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-smash', 'tag-accuracy', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-42-1', order: 1, text: 'Place cones/markers in two target zones (e.g., midcourt sidelines or body zone).' },
      { id: 'inst-42-2', order: 2, text: 'Feeder lifts to your rear court repeatedly.' },
      { id: 'inst-42-3', order: 3, text: 'Smash aiming at the selected target zone.' },
      { id: 'inst-42-4', order: 4, text: 'Alternate target zones every 2–3 smashes.' },
      { id: 'inst-42-5', order: 5, text: 'Complete 12–20 smashes total, tracking hits in target.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-43',
    title: 'Smash vs Defense (Continuous)',
    description:
      'Develop attacking endurance and consistency by smashing continuously while defender lifts back.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-smash', 'tag-rally']),
    instructions: [
      { id: 'inst-43-1', order: 1, text: 'Attacker starts in rear court; defender starts midcourt.' },
      { id: 'inst-43-2', order: 2, text: 'Defender lifts to the attacker to begin the sequence.' },
      { id: 'inst-43-3', order: 3, text: 'Attacker plays a standard smash; defender returns with a high lift.' },
      { id: 'inst-43-4', order: 4, text: 'Continue smash–lift exchanges for 8–15 shots.' },
      { id: 'inst-43-5', order: 5, text: 'Switch roles after 2–3 rallies.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-44',
    title: 'High Lift Under Pressure (Net Feed)',
    description:
      'Train high defensive lifts from the frontcourt with correct height and depth.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-44-1', order: 1, text: 'Start near the net in a low stance.' },
      { id: 'inst-44-2', order: 2, text: 'Feeder plays a gentle net shot to you.' },
      { id: 'inst-44-3', order: 3, text: 'Lift high and deep to the rear court (aim near back boundary).' },
      { id: 'inst-44-4', order: 4, text: 'Recover to base after each lift.' },
      { id: 'inst-44-5', order: 5, text: 'Complete 12–20 lifts, alternating corners if possible.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-45',
    title: 'Flat Lift Speed Control',
    description:
      'Practice flatter, faster lifts that still reach the backcourt without floating.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-frontcourt', 'tag-control']),
    instructions: [
      { id: 'inst-45-1', order: 1, text: 'Start near the net with racket up.' },
      { id: 'inst-45-2', order: 2, text: 'Feeder plays a net shot slightly in front of you.' },
      { id: 'inst-45-3', order: 3, text: 'Play a flatter lift that travels quickly to the backcourt.' },
      { id: 'inst-45-4', order: 4, text: 'Keep the shuttle below "easy smash height" for your opponent.' },
      { id: 'inst-45-5', order: 5, text: 'Perform 10–15 flat lifts, then switch to high lifts for contrast.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-46',
    title: 'Random Net Feed: High Lift or Flat Lift Decision',
    description:
      'Improve lift selection by choosing high or flat lifts based on feed quality and balance.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-frontcourt', 'tag-footwork']),
    instructions: [
      { id: 'inst-46-1', order: 1, text: 'Feeder stands opposite net with a stack of shuttles.' },
      { id: 'inst-46-2', order: 2, text: 'Feeder alternates tighter and looser net feeds.' },
      { id: 'inst-46-3', order: 3, text: 'If feed is tight: play a high lift. If feed is loose: play a flatter lift.' },
      { id: 'inst-46-4', order: 4, text: 'Recover to base after each lift.' },
      { id: 'inst-46-5', order: 5, text: 'Complete 15–25 lifts total, focusing on correct choice.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-47',
    title: 'Drive Exchange (Midcourt Continuous)',
    description:
      'Build drive consistency and reflexes with a continuous flat exchange.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 12,
    tags: getTagsByIds(['tag-intermediate', 'tag-drive', 'tag-midcourt', 'tag-rally']),
    instructions: [
      { id: 'inst-47-1', order: 1, text: 'Both players stand in midcourt with racket up.' },
      { id: 'inst-47-2', order: 2, text: 'Start with a gentle flat drive to your partner.' },
      { id: 'inst-47-3', order: 3, text: 'Keep the shuttle flat and fast (no lifts).' },
      { id: 'inst-47-4', order: 4, text: 'Use short swings and quick grip changes.' },
      { id: 'inst-47-5', order: 5, text: 'Maintain the rally for 30–60 seconds, then rest.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-48',
    title: 'Drive with Direction Change (Straight → Cross)',
    description:
      'Practice changing drive direction to create openings and improve control.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-drive', 'tag-midcourt', 'tag-control']),
    instructions: [
      { id: 'inst-48-1', order: 1, text: 'Start a drive exchange from midcourt.' },
      { id: 'inst-48-2', order: 2, text: 'Hit 3 straight drives in a row.' },
      { id: 'inst-48-3', order: 3, text: 'On the 4th drive, change direction cross-court.' },
      { id: 'inst-48-4', order: 4, text: 'Partner mirrors the same pattern back.' },
      { id: 'inst-48-5', order: 5, text: 'Repeat for 6–10 cycles, then swap who initiates direction change.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-49',
    title: 'Drive–Block–Drive (Doubles Defense Pattern)',
    description:
      'Train fast drive defense and frontcourt blocks to keep pressure low and flat.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 18,
    tags: getTagsByIds(['tag-intermediate', 'tag-drive', 'tag-rally']),
    instructions: [
      { id: 'inst-49-1', order: 1, text: 'Player A drives from midcourt; Player B blocks softly to the net.' },
      { id: 'inst-49-2', order: 2, text: 'Player A steps in and drives again (flat, not lifted).' },
      { id: 'inst-49-3', order: 3, text: 'Player B alternates: one block, one drive back.' },
      { id: 'inst-49-4', order: 4, text: 'Keep exchanges fast with short swings.' },
      { id: 'inst-49-5', order: 5, text: 'Continue for 45–60 seconds, then switch roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-50',
    title: 'Backhand Clear Repetition (Rear Corner Feed)',
    description:
      'Build backhand clear technique from the rear backhand corner with consistent feeding.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-clear', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-50-1', order: 1, text: 'Start near base, then move to the rear backhand corner.' },
      { id: 'inst-50-2', order: 2, text: 'Feeder lifts repeatedly to your backhand rear corner.' },
      { id: 'inst-50-3', order: 3, text: 'Hit a backhand clear high and deep (prioritize height and length).' },
      { id: 'inst-50-4', order: 4, text: 'Recover to base after each clear.' },
      { id: 'inst-50-5', order: 5, text: 'Perform 10–15 clears, then rest and switch roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-51',
    title: 'Backhand Clear with Shadow Prep (2-Step)',
    description:
      'Reinforce correct backhand clear prep and timing using a shadow + hit pattern.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-clear', 'tag-footwork', 'tag-control']),
    instructions: [
      { id: 'inst-51-1', order: 1, text: 'Start at base and do one shadow move to backhand rear corner.' },
      { id: 'inst-51-2', order: 2, text: 'Return to base and reset quickly.' },
      { id: 'inst-51-3', order: 3, text: 'On the next rep, feeder lifts to the same corner.' },
      { id: 'inst-51-4', order: 4, text: 'Hit a backhand clear with the same timing as the shadow rep.' },
      { id: 'inst-51-5', order: 5, text: 'Repeat for 8–12 cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-52',
    title: 'Backhand Clear Cross-Court Target Drill',
    description:
      'Improve backhand clear quality by aiming to a specific deep target area cross-court.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 18,
    tags: getTagsByIds(['tag-intermediate', 'tag-clear', 'tag-accuracy']),
    instructions: [
      { id: 'inst-52-1', order: 1, text: 'Place a cone/marker in the deep forehand rear corner on the opposite side.' },
      { id: 'inst-52-2', order: 2, text: 'Feeder lifts to your backhand rear corner.' },
      { id: 'inst-52-3', order: 3, text: 'Hit a backhand clear aiming to land near the target cone.' },
      { id: 'inst-52-4', order: 4, text: 'Track how many clears land within 1–2 racket lengths of the target.' },
      { id: 'inst-52-5', order: 5, text: 'Complete 10–15 clears, then rest.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-53',
    title: 'Cross-Court Net Shot Feeder Drill',
    description:
      'Develop consistent cross-court net shots with controlled feeding and tight net clearance.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-net', 'tag-frontcourt', 'tag-control']),
    instructions: [
      { id: 'inst-53-1', order: 1, text: 'Worker stands at the net; feeder stands opposite with shuttles.' },
      { id: 'inst-53-2', order: 2, text: 'Feeder feeds a gentle net-height shuttle to the worker.' },
      { id: 'inst-53-3', order: 3, text: 'Worker plays a cross-court net shot to the opposite net corner.' },
      { id: 'inst-53-4', order: 4, text: 'Reset after each shot; focus on keeping it tight to the tape.' },
      { id: 'inst-53-5', order: 5, text: 'Perform 20 reps forehand side, then 20 reps backhand side.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-54',
    title: 'Cross-Net to Straight-Net Alternation',
    description:
      'Train control and disguise by alternating cross-court and straight net shots.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 12,
    tags: getTagsByIds(['tag-intermediate', 'tag-net', 'tag-frontcourt']),
    instructions: [
      { id: 'inst-54-1', order: 1, text: 'Feeder provides consistent net feeds to one side.' },
      { id: 'inst-54-2', order: 2, text: 'Worker plays one cross-court net shot.' },
      { id: 'inst-54-3', order: 3, text: 'On the next feed, worker plays a straight net shot.' },
      { id: 'inst-54-4', order: 4, text: 'Continue alternating cross then straight.' },
      { id: 'inst-54-5', order: 5, text: 'Complete 20 total net shots, then switch sides/roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-55',
    title: 'Cross-Court Net Shot with Recovery',
    description:
      'Add recovery to base after cross-court net shots to simulate rally readiness.',
    difficulty: 'intermediate',
    type: 'footwork',
    estimatedDuration: 18,
    tags: getTagsByIds(['tag-intermediate', 'tag-net', 'tag-frontcourt', 'tag-footwork']),
    instructions: [
      { id: 'inst-55-1', order: 1, text: 'Start at base; feeder stands opposite net with shuttles.' },
      { id: 'inst-55-2', order: 2, text: 'Feeder plays a gentle net feed to your forehand net area.' },
      { id: 'inst-55-3', order: 3, text: 'Play a cross-court net shot to the far net corner.' },
      { id: 'inst-55-4', order: 4, text: 'Recover to base immediately with racket up.' },
      { id: 'inst-55-5', order: 5, text: 'Repeat 10–12 reps, then switch to backhand net area.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-56',
    title: 'Cross Drop Repetition (Rear Court Feed)',
    description:
      'Build consistent cross drops from the rear court with a focus on angle and tight landing.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-drop', 'tag-rearcourt', 'tag-control']),
    instructions: [
      { id: 'inst-56-1', order: 1, text: 'Feeder lifts to your rear forehand corner consistently.' },
      { id: 'inst-56-2', order: 2, text: 'Use clear preparation, then play a cross drop to the opposite front corner.' },
      { id: 'inst-56-3', order: 3, text: 'Aim to land near the front service line diagonally.' },
      { id: 'inst-56-4', order: 4, text: 'Keep the shuttle tight over the net (avoid floating).' },
      { id: 'inst-56-5', order: 5, text: 'Complete 15–20 reps, then switch roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-57',
    title: 'Cross Drop to Net Reply (2-Shot Pattern)',
    description:
      'Practice cross drop plus immediate readiness for the opponent`s net response.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-drop', 'tag-net', 'tag-footwork']),
    instructions: [
      { id: 'inst-57-1', order: 1, text: 'Feeder lifts to your rear court; you play a cross drop.' },
      { id: 'inst-57-2', order: 2, text: 'Feeder plays a straight net reply back to you.' },
      { id: 'inst-57-3', order: 3, text: 'Move in and play a controlled straight net shot back.' },
      { id: 'inst-57-4', order: 4, text: 'Recover to base after the net shot.' },
      { id: 'inst-57-5', order: 5, text: 'Repeat 8–12 cycles, then switch roles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-58',
    title: 'Clear–Drop–Net Rally',
    description:
      'Continuous rally alternating between clear, drop, and net shots to build control and consistency.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-rally', 'tag-control']),
    instructions: [
      { id: 'inst-58-1', order: 1, text: 'Player A starts with a high clear.' },
      { id: 'inst-58-2', order: 2, text: 'Player B plays a straight drop.' },
      { id: 'inst-58-3', order: 3, text: 'Player A plays a net shot.' },
      { id: 'inst-58-4', order: 4, text: 'Player B lifts and rally repeats.' },
      { id: 'inst-58-5', order: 5, text: 'Continue rally for 30–60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-59',
    title: 'Clear vs Cross Drop Alternation (Deception Focus)',
    description:
      'Train disguise by alternating full clears and cross drops with identical preparation.',
    difficulty: 'intermediate',
    type: 'shot',
    estimatedDuration: 18,
    tags: getTagsByIds(['tag-intermediate', 'tag-clear', 'tag-drop', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-59-1', order: 1, text: 'Feeder lifts consistently to your rear court.' },
      { id: 'inst-59-2', order: 2, text: 'Play a full clear with standard preparation.' },
      { id: 'inst-59-3', order: 3, text: 'On the next lift, use identical preparation but play a cross drop.' },
      { id: 'inst-59-4', order: 4, text: 'Continue alternating: one clear, one cross drop.' },
      { id: 'inst-59-5', order: 5, text: 'Focus on keeping preparation identical for both shots.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-60',
    title: 'Smash–Lift–Drop Rotation',
    description:
      'Practice attacking and defensive transitions using smashes, lifts, and drops.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-rally', 'tag-power']),
    instructions: [
      { id: 'inst-60-1', order: 1, text: 'Player A smashes from rear court.' },
      { id: 'inst-60-2', order: 2, text: 'Player B lifts high to reset.' },
      { id: 'inst-60-3', order: 3, text: 'Player A plays a drop shot.' },
      { id: 'inst-60-4', order: 4, text: 'Player B net shots, then lifts.' },
      { id: 'inst-60-5', order: 5, text: 'Repeat continuously.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-61',
    title: 'Drive–Block–Lift Rally',
    description:
      'Continuous flat rally improving speed and reaction with defensive recovery.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-rally']),
    instructions: [
      { id: 'inst-61-1', order: 1, text: 'Players exchange drives from midcourt.' },
      { id: 'inst-61-2', order: 2, text: 'After 3 drives, one player blocks softly.' },
      { id: 'inst-61-3', order: 3, text: 'Opponent lifts to continue rally.' },
      { id: 'inst-61-4', order: 4, text: 'Resume drive exchange.' },
      { id: 'inst-61-5', order: 5, text: 'Maintain rally for 45–60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-62',
    title: 'Backhand Clear to Net Transition',
    description:
      'Train recovery and control after backhand clears into frontcourt play.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-62-1', order: 1, text: 'Player A plays backhand clear.' },
      { id: 'inst-62-2', order: 2, text: 'Player B drops to the net.' },
      { id: 'inst-62-3', order: 3, text: 'Player A plays net shot.' },
      { id: 'inst-62-4', order: 4, text: 'Player B lifts back to rear court.' },
      { id: 'inst-62-5', order: 5, text: 'Repeat continuously.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-63',
    title: 'Cross Drop–Net–Lift Rally',
    description:
      'Build precision and recovery when playing cross drops and net replies.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-accuracy', 'tag-rally']),
    instructions: [
      { id: 'inst-63-1', order: 1, text: 'Player A plays cross drop from rear court.' },
      { id: 'inst-63-2', order: 2, text: 'Player B replies with straight net shot.' },
      { id: 'inst-63-3', order: 3, text: 'Player A lifts to rear court.' },
      { id: 'inst-63-4', order: 4, text: 'Player B resets with a clear.' },
      { id: 'inst-63-5', order: 5, text: 'Continue rally.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-64',
    title: 'Smash–Lift Endurance Cycle',
    description:
      'Build attacking stamina with repeated smash–lift exchanges.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-rally', 'tag-power']),
    instructions: [
      { id: 'inst-64-1', order: 1, text: 'Player A smashes from rear court.' },
      { id: 'inst-64-2', order: 2, text: 'Player B lifts high or flat alternately.' },
      { id: 'inst-64-3', order: 3, text: 'Player A smashes again with control.' },
      { id: 'inst-64-4', order: 4, text: 'Recover to base between smashes.' },
      { id: 'inst-64-5', order: 5, text: 'Continue for 10–15 smash cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-65',
    title: 'Drive Speed Rally',
    description:
      'High-tempo continuous drive exchanges to develop speed and reflexes.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-rally']),
    instructions: [
      { id: 'inst-65-1', order: 1, text: 'Both players stand in midcourt.' },
      { id: 'inst-65-2', order: 2, text: 'Exchange flat drives continuously.' },
      { id: 'inst-65-3', order: 3, text: 'After every 5 drives, add one block.' },
      { id: 'inst-65-4', order: 4, text: 'Recover quickly and resume drives.' },
      { id: 'inst-65-5', order: 5, text: 'Maintain rally for 45 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-66',
    title: 'Backhand Clear Pressure Rally',
    description:
      'Train recovery and consistency after repeated backhand clears.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-66-1', order: 1, text: 'Player A plays backhand clear.' },
      { id: 'inst-66-2', order: 2, text: 'Player B replies with drop or net shot.' },
      { id: 'inst-66-3', order: 3, text: 'Player A lifts or clears again.' },
      { id: 'inst-66-4', order: 4, text: 'Alternate net and lift replies.' },
      { id: 'inst-66-5', order: 5, text: 'Continue rally for 60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-67',
    title: 'Cross Net Speed Rally',
    description:
      'Fast-paced net rally emphasizing cross-court control and recovery.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-accuracy']),
    instructions: [
      { id: 'inst-67-1', order: 1, text: 'Start with a gentle net feed.' },
      { id: 'inst-67-2', order: 2, text: 'Players exchange cross-court net shots.' },
      { id: 'inst-67-3', order: 3, text: 'After 4 shots, add a lift.' },
      { id: 'inst-67-4', order: 4, text: 'Reset with a clear.' },
      { id: 'inst-67-5', order: 5, text: 'Repeat continuously.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-68',
    title: 'Cross Drop Transition Rally',
    description:
      'Practice cross drops followed by fast recovery into net and lift play.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-68-1', order: 1, text: 'Player A plays a cross drop from rear court.' },
      { id: 'inst-68-2', order: 2, text: 'Player B replies with net shot.' },
      { id: 'inst-68-3', order: 3, text: 'Player A lifts to reset.' },
      { id: 'inst-68-4', order: 4, text: 'Player B clears.' },
      { id: 'inst-68-5', order: 5, text: 'Continue rally.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-69',
    title: 'Serve–Drive–Lift Rally',
    description:
      'Fast entry rally combining serve, drive, and lift patterns.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-rally']),
    instructions: [
      { id: 'inst-69-1', order: 1, text: 'Start with a low backhand serve.' },
      { id: 'inst-69-2', order: 2, text: 'Receiver drives flat.' },
      { id: 'inst-69-3', order: 3, text: 'Server blocks then lifts.' },
      { id: 'inst-69-4', order: 4, text: 'Resume drive exchanges.' },
      { id: 'inst-69-5', order: 5, text: 'Continue for 45 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-70',
    title: 'Accuracy Zones Continuous Rally',
    description:
      'Maintain rally while aiming shots to designated zones.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-accuracy', 'tag-control']),
    instructions: [
      { id: 'inst-70-1', order: 1, text: 'Place target zones in frontcourt and backcourt.' },
      { id: 'inst-70-2', order: 2, text: 'Rally freely using clears, drops, and lifts.' },
      { id: 'inst-70-3', order: 3, text: 'Score points for hitting target zones.' },
      { id: 'inst-70-4', order: 4, text: 'Avoid smashes unless setup is clear.' },
      { id: 'inst-70-5', order: 5, text: 'Rally for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-71',
    title: 'Power Control Rally',
    description:
      'Balance smash power with recovery and shot selection.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-power', 'tag-control']),
    instructions: [
      { id: 'inst-71-1', order: 1, text: 'Player A attacks with standard smashes.' },
      { id: 'inst-71-2', order: 2, text: 'Player B blocks or lifts alternately.' },
      { id: 'inst-71-3', order: 3, text: 'After every smash, recover fully.' },
      { id: 'inst-71-4', order: 4, text: 'Mix in drops to reduce predictability.' },
      { id: 'inst-71-5', order: 5, text: 'Continue for 10–12 cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-72',
    title: 'Serve Variety Rally',
    description:
      'Practice rally entry using both high and low serves.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-72-1', order: 1, text: 'Alternate high and low serves each rally.' },
      { id: 'inst-72-2', order: 2, text: 'Receiver responds freely.' },
      { id: 'inst-72-3', order: 3, text: 'Play out rally using mixed shots.' },
      { id: 'inst-72-4', order: 4, text: 'Focus on quality serve placement.' },
      { id: 'inst-72-5', order: 5, text: 'Rotate server every rally.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-73',
    title: 'Chaos Multi-Shot Rally',
    description:
      'Randomized continuous rally forcing fast decisions and recovery.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-rally']),
    instructions: [
      { id: 'inst-73-1', order: 1, text: 'Play a free rally with no restrictions.' },
      { id: 'inst-73-2', order: 2, text: 'Every 5th shot must change direction.' },
      { id: 'inst-73-3', order: 3, text: 'Include smashes, drops, drives, and lifts.' },
      { id: 'inst-73-4', order: 4, text: 'Keep racket up and recover quickly.' },
      { id: 'inst-73-5', order: 5, text: 'Continue for 90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-74',
    title: 'Net Pressure Rally',
    description:
      'Sustain rallies with repeated net approaches and recoveries.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-74-1', order: 1, text: 'Initiate rally with a drop or net shot.' },
      { id: 'inst-74-2', order: 2, text: 'Opponent lifts or net shots back.' },
      { id: 'inst-74-3', order: 3, text: 'Alternate net pressure and lifts.' },
      { id: 'inst-74-4', order: 4, text: 'Avoid finishing shots.' },
      { id: 'inst-74-5', order: 5, text: 'Maintain rally for 60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-75',
    title: 'Rear-to-Front Transition Rally',
    description:
      'Practice fast transitions from rear court to front court play.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-control']),
    instructions: [
      { id: 'inst-75-1', order: 1, text: 'Start rally with a clear.' },
      { id: 'inst-75-2', order: 2, text: 'Opponent drops to frontcourt.' },
      { id: 'inst-75-3', order: 3, text: 'Move forward for net shot.' },
      { id: 'inst-75-4', order: 4, text: 'Reset with a lift.' },
      { id: 'inst-75-5', order: 5, text: 'Continue alternation.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-76',
    title: 'Cross Direction Rally',
    description:
      'Emphasize diagonal shot selection while maintaining rally flow.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-accuracy', 'tag-control']),
    instructions: [
      { id: 'inst-76-1', order: 1, text: 'Players prioritize cross-court shots.' },
      { id: 'inst-76-2', order: 2, text: 'Include cross drop and cross net shots.' },
      { id: 'inst-76-3', order: 3, text: 'Use lifts and clears to reset.' },
      { id: 'inst-76-4', order: 4, text: 'Avoid straight shots unless forced.' },
      { id: 'inst-76-5', order: 5, text: 'Rally for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-77',
    title: 'Defensive Control Rally',
    description:
      'Train patience and placement under continuous defensive pressure.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-77-1', order: 1, text: 'One player attacks with controlled smashes.' },
      { id: 'inst-77-2', order: 2, text: 'Defender alternates high and flat lifts.' },
      { id: 'inst-77-3', order: 3, text: 'Occasionally add drives to change tempo.' },
      { id: 'inst-77-4', order: 4, text: 'Switch attacker after each rally.' },
      { id: 'inst-77-5', order: 5, text: 'Continue for multiple rallies.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-78',
    title: 'Tempo Change Rally',
    description:
      'Alternate slow control shots with fast attacking shots.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-speed', 'tag-control']),
    instructions: [
      { id: 'inst-78-1', order: 1, text: 'Start with slow clear–drop exchanges.' },
      { id: 'inst-78-2', order: 2, text: 'After 4 shots, inject a smash or drive.' },
      { id: 'inst-78-3', order: 3, text: 'Reset tempo with a lift.' },
      { id: 'inst-78-4', order: 4, text: 'Repeat pattern.' },
      { id: 'inst-78-5', order: 5, text: 'Maintain rally for 60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-79',
    title: 'Endurance Accuracy Rally',
    description:
      'Sustain long rallies while prioritizing accurate placement.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-intermediate', 'tag-accuracy', 'tag-rally']),
    instructions: [
      { id: 'inst-79-1', order: 1, text: 'Play continuous rally using all shots.' },
      { id: 'inst-79-2', order: 2, text: 'Avoid risky power shots.' },
      { id: 'inst-79-3', order: 3, text: 'Aim for corners and service lines.' },
      { id: 'inst-79-4', order: 4, text: 'Recover fully between shots.' },
      { id: 'inst-79-5', order: 5, text: 'Rally for 90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-80',
    title: 'Attack–Defend Swap Rally',
    description:
      'Continuous rally where roles swap mid-rally.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-intermediate', 'tag-power', 'tag-rally']),
    instructions: [
      { id: 'inst-80-1', order: 1, text: 'Player A attacks with smash or drop.' },
      { id: 'inst-80-2', order: 2, text: 'Player B defends with lift or block.' },
      { id: 'inst-80-3', order: 3, text: 'On a clear, swap attacking roles.' },
      { id: 'inst-80-4', order: 4, text: 'Continue rally with swapped roles.' },
      { id: 'inst-80-5', order: 5, text: 'Maintain rally for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-81',
    title: 'Serve-to-Smash Build-Up Rally',
    description:
      'Build rallies progressively from serve into attack.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-intermediate', 'tag-power', 'tag-control']),
    instructions: [
      { id: 'inst-81-1', order: 1, text: 'Start with low or high serve.' },
      { id: 'inst-81-2', order: 2, text: 'Exchange clears and drops.' },
      { id: 'inst-81-3', order: 3, text: 'After 4 shots, allow smashes.' },
      { id: 'inst-81-4', order: 4, text: 'Defender lifts to continue rally.' },
      { id: 'inst-81-5', order: 5, text: 'Repeat for multiple rallies.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-82',
    title: 'Full-Skill Continuous Rally',
    description:
      'Game-like rally using all shots with emphasis on decision-making.',
    difficulty: 'intermediate',
    type: 'rally',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-intermediate', 'tag-rally', 'tag-speed', 'tag-accuracy', 'tag-control']),
    instructions: [
      { id: 'inst-82-1', order: 1, text: 'Start rally with serve of choice.' },
      { id: 'inst-82-2', order: 2, text: 'Use full range of shots freely.' },
      { id: 'inst-82-3', order: 3, text: 'Avoid ending rally quickly.' },
      { id: 'inst-82-4', order: 4, text: 'Focus on recovery and shot selection.' },
      { id: 'inst-82-5', order: 5, text: 'Rally continuously for 90–120 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-83',
    title: 'Jump Smash with Recovery Cycle',
    description:
      'Train explosive jump smash followed by fast recovery into rally continuation.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-power', 'tag-rally']),
    instructions: [
      { id: 'inst-83-1', order: 1, text: 'Feeder lifts deep to rear court.' },
      { id: 'inst-83-2', order: 2, text: 'Player performs a jump smash.' },
      { id: 'inst-83-3', order: 3, text: 'Feeder blocks or lifts randomly.' },
      { id: 'inst-83-4', order: 4, text: 'Player recovers and continues rally.' },
      { id: 'inst-83-5', order: 5, text: 'Continue for 8–12 smash cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-84',
    title: 'Jump Smash Angle Target Drill',
    description:
      'Improve steepness and placement of jump smashes under fatigue.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-accuracy', 'tag-power']),
    instructions: [
      { id: 'inst-84-1', order: 1, text: 'Place targets near sidelines and body zone.' },
      { id: 'inst-84-2', order: 2, text: 'Feeder lifts repeatedly.' },
      { id: 'inst-84-3', order: 3, text: 'Player jump smashes aiming at targets.' },
      { id: 'inst-84-4', order: 4, text: 'Recover fully after each jump.' },
      { id: 'inst-84-5', order: 5, text: 'Complete 12–16 jump smashes.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-85',
    title: 'Jump Smash Decision Rally',
    description:
      'Force decision-making on when to jump smash versus reset.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-rally']),
    instructions: [
      { id: 'inst-85-1', order: 1, text: 'Rally begins with clears and drops.' },
      { id: 'inst-85-2', order: 2, text: 'Jump smash only when lift is short.' },
      { id: 'inst-85-3', order: 3, text: 'If lift is deep, reset rally.' },
      { id: 'inst-85-4', order: 4, text: 'Opponent defends realistically.' },
      { id: 'inst-85-5', order: 5, text: 'Continue rally for 90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-86',
    title: 'Reverse Slice Drop Disguise Drill',
    description:
      'Train identical preparation for clear and reverse slice drop.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-drop', 'tag-rearcourt']),
    instructions: [
      { id: 'inst-86-1', order: 1, text: 'Feeder lifts to rear court.' },
      { id: 'inst-86-2', order: 2, text: 'Player alternates clear and reverse slice drop.' },
      { id: 'inst-86-3', order: 3, text: 'Maintain identical preparation.' },
      { id: 'inst-86-4', order: 4, text: 'Aim for tight frontcourt landing.' },
      { id: 'inst-86-5', order: 5, text: 'Complete 20 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-87',
    title: 'Reverse Slice Drop to Net Kill Rally',
    description:
      'Practice follow-up pressure after forcing weak net replies.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-drop', 'tag-net', 'tag-rally']),
    instructions: [
      { id: 'inst-87-1', order: 1, text: 'Player plays reverse slice drop.' },
      { id: 'inst-87-2', order: 2, text: 'Opponent plays net reply.' },
      { id: 'inst-87-3', order: 3, text: 'Player moves in for net kill or tight net shot.' },
      { id: 'inst-87-4', order: 4, text: 'Reset with lift if needed.' },
      { id: 'inst-87-5', order: 5, text: 'Repeat 10–12 cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-88',
    title: 'Reverse Slice Drop Under Pressure',
    description:
      'Execute reverse slice drops while moving at full speed.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-advanced', 'tag-drop', 'tag-control', 'tag-rally']),
    instructions: [
      { id: 'inst-88-1', order: 1, text: 'Rally with fast clears and drives.' },
      { id: 'inst-88-2', order: 2, text: 'Reverse slice drop allowed only when late.' },
      { id: 'inst-88-3', order: 3, text: 'Opponent plays full-speed defense.' },
      { id: 'inst-88-4', order: 4, text: 'Recover immediately after drop.' },
      { id: 'inst-88-5', order: 5, text: 'Rally for 90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-89',
    title: 'Backhand Smash Rear-Corner Feed',
    description:
      'Develop power and confidence in backhand smashes from rear court.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-power']),
    instructions: [
      { id: 'inst-89-1', order: 1, text: 'Feeder lifts to backhand rear corner.' },
      { id: 'inst-89-2', order: 2, text: 'Player performs full backhand smash.' },
      { id: 'inst-89-3', order: 3, text: 'Recover to base immediately.' },
      { id: 'inst-89-4', order: 4, text: 'Alternate straight and cross smashes.' },
      { id: 'inst-89-5', order: 5, text: 'Complete 10–14 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-90',
    title: 'Backhand Smash to Defense Rally',
    description:
      'Apply backhand smashes in live defensive pressure.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-rally']),
    instructions: [
      { id: 'inst-90-1', order: 1, text: 'Player initiates rally from backhand rear corner.' },
      { id: 'inst-90-2', order: 2, text: 'Backhand smash used when lift is short.' },
      { id: 'inst-90-3', order: 3, text: 'Opponent defends realistically.' },
      { id: 'inst-90-4', order: 4, text: 'Continue rally after smash.' },
      { id: 'inst-90-5', order: 5, text: 'Play for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-91',
    title: 'Backhand Smash Decision Drill',
    description:
      'Train judgment on when to smash versus clear on the backhand side.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 30,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-control']),
    instructions: [
      { id: 'inst-91-1', order: 1, text: 'Feeder varies lift depth to backhand corner.' },
      { id: 'inst-91-2', order: 2, text: 'Smash only on short lifts.' },
      { id: 'inst-91-3', order: 3, text: 'Clear on deep lifts.' },
      { id: 'inst-91-4', order: 4, text: 'Recover fully after each shot.' },
      { id: 'inst-91-5', order: 5, text: 'Complete 15–20 feeds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-92',
    title: 'Stick Smash Reaction Drill',
    description:
      'Improve quick execution of stick smashes in fast rallies.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-speed']),
    instructions: [
      { id: 'inst-92-1', order: 1, text: 'Rally with fast clears and drives.' },
      { id: 'inst-92-2', order: 2, text: 'Stick smash only when shuttle is slightly loose.' },
      { id: 'inst-92-3', order: 3, text: 'Opponent blocks or lifts.' },
      { id: 'inst-92-4', order: 4, text: 'Continue rally immediately.' },
      { id: 'inst-92-5', order: 5, text: 'Maintain rally for 60 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-93',
    title: 'Stick Smash Placement Drill',
    description:
      'Control placement and deception of stick smashes.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 18,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-accuracy']),
    instructions: [
      { id: 'inst-93-1', order: 1, text: 'Feeder lifts slightly short.' },
      { id: 'inst-93-2', order: 2, text: 'Player executes stick smash.' },
      { id: 'inst-93-3', order: 3, text: 'Aim alternately at sidelines and body.' },
      { id: 'inst-93-4', order: 4, text: 'Recover quickly after each hit.' },
      { id: 'inst-93-5', order: 5, text: 'Complete 12–16 smashes.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-94',
    title: 'Stick Smash vs Drive Rally',
    description:
      'Practice countering fast drives with stick smashes.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-smash', 'tag-rally']),
    instructions: [
      { id: 'inst-94-1', order: 1, text: 'Opponent drives aggressively.' },
      { id: 'inst-94-2', order: 2, text: 'Player intercepts with stick smash.' },
      { id: 'inst-94-3', order: 3, text: 'Opponent blocks or lifts.' },
      { id: 'inst-94-4', order: 4, text: 'Rally continues.' },
      { id: 'inst-94-5', order: 5, text: 'Play for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-95',
    title: 'Spinning Net Shot Feeder Drill',
    description:
      'Develop tight spinning net shots with consistent feeding.',
    difficulty: 'advanced',
    type: 'shot',
    estimatedDuration: 15,
    tags: getTagsByIds(['tag-advanced', 'tag-net', 'tag-control']),
    instructions: [
      { id: 'inst-95-1', order: 1, text: 'Feeder plays soft net feeds.' },
      { id: 'inst-95-2', order: 2, text: 'Player executes spinning net shot.' },
      { id: 'inst-95-3', order: 3, text: 'Focus on tight tape clearance.' },
      { id: 'inst-95-4', order: 4, text: 'Reset after each shot.' },
      { id: 'inst-95-5', order: 5, text: 'Perform 20 repetitions.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-96',
    title: 'Spinning Net Shot Pressure Rally',
    description:
      'Apply spinning net shots under realistic rally pressure.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 25,
    tags: getTagsByIds(['tag-advanced', 'tag-net', 'tag-rally']),
    instructions: [
      { id: 'inst-96-1', order: 1, text: 'Rally begins with net exchange.' },
      { id: 'inst-96-2', order: 2, text: 'Spinning net allowed only when shuttle is tight.' },
      { id: 'inst-96-3', order: 3, text: 'Opponent attempts net kill.' },
      { id: 'inst-96-4', order: 4, text: 'Recover immediately after net shot.' },
      { id: 'inst-96-5', order: 5, text: 'Continue rally for 60–90 seconds.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'drill-97',
    title: 'Spin Net to Kill Conversion',
    description:
      'Train follow-up attacks after forcing weak replies from spin net shots.',
    difficulty: 'advanced',
    type: 'rally',
    estimatedDuration: 20,
    tags: getTagsByIds(['tag-advanced', 'tag-net', 'tag-rally']),
    instructions: [
      { id: 'inst-97-1', order: 1, text: 'Player plays spinning net shot.' },
      { id: 'inst-97-2', order: 2, text: 'Opponent replies weakly.' },
      { id: 'inst-97-3', order: 3, text: 'Player finishes with net kill or push.' },
      { id: 'inst-97-4', order: 4, text: 'Reset with lift.' },
      { id: 'inst-97-5', order: 5, text: 'Repeat 10–12 cycles.' },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-04-10'),
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
