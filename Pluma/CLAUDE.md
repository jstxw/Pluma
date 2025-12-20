# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pluma is a badminton drill catalog mobile app built with Expo and React Native. It provides structured learning resources for players to improve shot techniques and footwork patterns across different skill levels.

## Development Commands

```bash
npm install          # Install dependencies
npm start            # Start Expo development server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run in web browser
npm run lint         # Run ESLint
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm test -- path/to/file.test.tsx  # Run a single test file
npm test -- -t "test name"         # Run tests matching pattern
```

## Architecture

### Tech Stack
- **Framework**: Expo SDK 54 with React Native 0.81.5
- **Navigation**: @react-navigation (bottom tabs + native stack). Note: expo-router plugin is enabled but navigation is implemented directly with @react-navigation.
- **State Management**: @tanstack/react-query for server state
- **Language**: TypeScript with strict mode
- **Animations**: react-native-reanimated
- **Storage**: @react-native-async-storage/async-storage

### Project Structure (src/)
```
src/
├── app/                    # App entry point and providers
│   ├── App.tsx             # Root component
│   ├── navigation/         # React Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   └── providers/          # Context providers
│       ├── ThemeProvider.tsx
│       ├── QueryProvider.tsx
│       └── FavoritesProvider.tsx
│
├── features/               # Feature-based modules (each follows screens/components/hooks/types/data pattern)
│   ├── home/               # Home tab (landing screen)
│   ├── drills/             # Drills feature (list + detail screens)
│   └── shots/              # Shots feature (list + detail screens)
│
├── shared/                 # Shared utilities and components
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives (Button, Card, Pill, SearchBar)
│   │   └── layout/         # Screen wrappers and scroll containers
│   ├── hooks/              # Shared hooks (useTheme, useSafeArea)
│   ├── utils/              # Formatting and validation helpers
│   └── constants/          # Design tokens (theme, spacing, typography)
│
├── services/               # External integrations
│   ├── api/                # API client and endpoints
│   └── storage/            # AsyncStorage utilities
│
└── types/                  # Global type definitions
```

### Path Aliases (tsconfig.json)
- `@/*` → project root
- `@app/*` → src/app/
- `@features/*` → src/features/
- `@shared/*` → src/shared/
- `@services/*` → src/services/
- `@types` → src/types/

## Navigation Architecture

The app uses a stack-in-tabs pattern:
- **RootNavigator**: Top-level NavigationContainer with root stack
- **TabNavigator**: Bottom tabs (Home, Drills, Shots) each containing their own native stack
- Each tab has its own stack navigator for list → detail navigation
- Tab state is preserved when switching tabs
- Tapping inactive tab resets that stack to root

Navigation types are defined in `src/app/navigation/types.ts`.

## Documentation

- **DESIGN_INSTRUCTIONS.md**: Design guidelines (colors, typography, spacing, components)

### Design System Key Points
- **Navigation**: Three bottom tabs (Home, Drills, Shots)
- **Colors**: White (#FFFFFF), black (#000000), dark accent (#1A1A1A), light gray (#F5F5F5)
- **Spacing**: 4px grid (4, 8, 12, 16, 20, 24, 32, 40)
- **Border radius**: 24px for cards, 20-28px for buttons

### Data Models
- **Drill**: id, title, description, instructions[], tags[], difficulty, type
- **Shot**: id, name, description, technique[], tags[], difficulty, relatedDrills[]
- **Tag categories**: skill_level, drill_type, shot_category, court_position, training_focus

## Testing

- **Framework**: Jest with jest-expo preset
- **Test Location**: `__tests__/**/*.test.{ts,tsx}`
- **Coverage Threshold**: 50% for branches, functions, lines, and statements
- **Mocks**: react-native-reanimated and AsyncStorage are pre-mocked in `__tests__/setup.ts`

## Expo Configuration

- **New Architecture**: Enabled (`newArchEnabled: true`)
- **React Compiler**: Enabled (`experiments.reactCompiler: true`)
- **Typed Routes**: Enabled for type-safe navigation
- **Scheme**: `pluma://` for deep linking
