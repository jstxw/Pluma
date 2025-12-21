# Goal

Implement local persistence for badminton stats so "drillsCompleted" is saved on-device and loads every app open.
Must be simple, reliable, and easy to extend to more stats.

## Tech choice

- React Native (Expo)
- Zustand for a tiny global store
- AsyncStorage for persistence
- Zustand persist middleware

## Step 1: Install dependencies

Run:
npm i zustand @react-native-async-storage/async-storage

## Step 2: Create a stats store file

Create: src/state/statsStore.ts

Requirements:

- Store state:
  - drillsCompleted: number
  - lastOpenedAt: string (ISO)
- Actions:
  - incrementDrillsCompleted(by=1)
  - setLastOpenedNow()
  - resetStats()

Persistence:

- Use zustand persist with AsyncStorage
- Storage key: "pluma_stats_v1"
- Include a version number and a migration stub

## Step 3: Load stats on app start

In App.tsx (or root layout), call:

- setLastOpenedNow() on mount
  This guarantees every app open updates lastOpenedAt.

Also ensure:

- App does NOT show "0" briefly then jump
  If needed, add a small "hydration" flag in store:
  - hasHydrated: boolean
    and set it in persist onRehydrateStorage.

## Step 4: Increment when a drill is completed

Find the moment you consider a drill "played/completed".
Examples:

- user taps "Finish"
- timer ends
- user marks drill done

At that exact point call:
incrementDrillsCompleted(1)

## Step 5: Show it in UI

Wherever your dashboard/home shows stats, read from store:
const drillsCompleted = useStatsStore(s => s.drillsCompleted)

Display it in the circular tracker center number.

## Step 6: Add a debug reset button (dev only)

Add a small button somewhere hidden in dev builds:
resetStats()
so I can test quickly.

## Step 7: Basic testing checklist

- Fresh install → count = 0
- Complete 1 drill → count = 1
- Force close app → reopen → count still = 1
- Complete another drill → count = 2
- Reset → count back to 0
- Upgrade safety: if store schema changes later, bump version and migrate

## Implementation details (must follow)

- TypeScript strongly typed
- No complicated architecture
- Store must be the ONLY place that touches persistence
- UI components should not directly call AsyncStorage
- Keep it minimal black/white compatible

Now implement it.
