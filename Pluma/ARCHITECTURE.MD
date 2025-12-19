# Pluma: The Badminton Drill Catalog - Architecture

## Overview

This document defines the technical architecture, implementation patterns, and structural decisions for Pluma. It complements DESIGN_INSTRUCTIONS.md by focusing on how the experience is built rather than what it should feel like.

---

## Technology Stack

### Framework

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript for better developer experience and fewer runtime errors

### Navigation

- **React Navigation**: Native navigation library for React Native
- **Bottom Tabs Navigator**: Primary navigation pattern

### State Management

- **React Context API** or **Zustand**: Lightweight state management for app-level state
- **React Query / TanStack Query**: Server state management, caching, and data fetching

### Data Storage

- **AsyncStorage**: Local persistence for user preferences and favorites
- **SQLite** (optional): For offline drill catalog if needed

### Styling

- **StyleSheet API**: React Native's built-in styling
- **Themed Design System**: Centralized design tokens matching DESIGN_INSTRUCTIONS.md

---

## Application Architecture

### Directory Structure

```
pluma/
├── src/
│   ├── app/                    # App entry point and providers
│   │   ├── App.tsx
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── TabNavigator.tsx
│   │   │   └── types.ts
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       └── QueryProvider.tsx
│   │
│   ├── features/               # Feature-based modules
│   │   ├── home/
│   │   │   ├── screens/
│   │   │   │   └── HomeScreen.tsx
│   │   │   └── components/
│   │   │
│   │   ├── drills/
│   │   │   ├── screens/
│   │   │   │   ├── DrillsListScreen.tsx
│   │   │   │   └── DrillDetailScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── DrillCard.tsx
│   │   │   │   ├── DrillFilters.tsx
│   │   │   │   └── InstructionList.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDrills.ts
│   │   │   │   └── useFilters.ts
│   │   │   └── types/
│   │   │       └── drill.types.ts
│   │   │
│   │   └── shots/
│   │       ├── screens/
│   │       │   ├── ShotsListScreen.tsx
│   │       │   └── ShotDetailScreen.tsx
│   │       ├── components/
│   │       │   └── ShotCard.tsx
│   │       └── hooks/
│   │           └── useShots.ts
│   │
│   ├── shared/                 # Shared utilities and components
│   │   ├── components/
│   │   │   ├── ui/            # Design system components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Pill.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── TabBar.tsx
│   │   │   └── layout/
│   │   │       ├── Screen.tsx
│   │   │       └── ScrollView.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useTheme.ts
│   │   │   └── useSafeArea.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatting.ts
│   │   │   └── validation.ts
│   │   │
│   │   └── constants/
│   │       ├── theme.ts
│   │       ├── spacing.ts
│   │       └── typography.ts
│   │
│   ├── services/               # External integrations
│   │   ├── api/
│   │   │   ├── drills.api.ts
│   │   │   └── client.ts
│   │   └── storage/
│   │       └── localStorage.ts
│   │
│   └── types/                  # Global type definitions
│       └── index.ts
│
├── assets/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── __tests__/                  # Test files
    ├── unit/
    └── integration/
```

---

## Navigation Architecture

### Navigation Hierarchy

```
RootNavigator
└── TabNavigator (Bottom Tabs)
    ├── HomeStack
    │   └── HomeScreen
    │
    ├── DrillsStack
    │   ├── DrillsListScreen
    │   └── DrillDetailScreen (push navigation)
    │
    └── ShotsStack
        ├── ShotsListScreen
        └── ShotDetailScreen (push navigation)
```

### Navigation Rules

1. **Bottom Tab Navigation**

   - Always visible at top-level screens
   - Tapping active tab scrolls to top
   - Tapping inactive tab resets that stack to root
   - Tab state is preserved when switching

2. **Stack Navigation**

   - Detail screens push onto their respective stacks
   - Standard back gesture/button returns to list
   - No nested tab navigators
   - No modal presentations that replace tabs

3. **Deep Linking Support**
   - Support direct links to specific drills/shots
   - Maintain proper navigation stack when deep linking

### Implementation Example

```typescript
// TabNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Drills" component={DrillsStack} />
      <Tab.Screen name="Shots" component={ShotsStack} />
    </Tab.Navigator>
  );
}
```

---

## Data Architecture

### Data Models

#### Drill Model

```typescript
interface Drill {
  id: string;
  title: string;
  description: string;
  instructions: Instruction[];
  tags: Tag[];
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "shot" | "footwork" | "combination";
  estimatedDuration?: number; // minutes
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Instruction {
  id: string;
  order: number;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface Tag {
  id: string;
  name: string;
  category: TagCategory;
}

type TagCategory =
  | "skill_level"
  | "drill_type"
  | "shot_category"
  | "court_position"
  | "training_focus";
```

#### Shot Model

```typescript
interface Shot {
  id: string;
  name: string;
  description: string;
  technique: TechniqueStep[];
  tags: Tag[];
  difficulty: "beginner" | "intermediate" | "advanced";
  relatedDrills?: string[]; // drill IDs
  imageUrl?: string;
  videoUrl?: string;
}

interface TechniqueStep {
  id: string;
  order: number;
  title: string;
  description: string;
  keyPoints: string[];
  commonMistakes?: string[];
}
```

### Data Flow

```
User Action → Component → Hook → Service → API/Storage
                ↓                    ↓
            Local State ← Cache ← Response
                ↓
            Re-render
```

### State Management Strategy

**Local State (useState, useReducer)**

- UI state (modals, filters open/closed)
- Form inputs
- Temporary component state

**Context State**

- Theme preferences
- User preferences
- Global UI state (bottom sheet visibility)

**Server State (React Query)**

- Drill data
- Shot data
- Filtering/searching results
- Caching and background refetching

**Persistent State (AsyncStorage)**

- Favorite drills
- Filter preferences
- Completed drills tracking
- User settings

---

## Component Architecture

### Design System Components

All UI components follow the design specifications in DESIGN_INSTRUCTIONS.md.

#### Button Component

```typescript
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant,
  size = "medium",
  onPress,
  disabled,
  loading,
  children,
  icon,
}: ButtonProps) {
  // Implementation follows DESIGN_INSTRUCTIONS.md specs
}
```

#### Card Component

```typescript
interface CardProps {
  variant: "drill" | "shot" | "schedule";
  imageUrl?: string;
  title: string;
  subtitle?: string;
  tags?: Tag[];
  onPress?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}
```

### Component Patterns

**Composition over Configuration**

```typescript
// Good: Composable
<Card>
  <Card.Image source={imageUrl} />
  <Card.Content>
    <Card.Title>{title}</Card.Title>
    <Card.Tags tags={tags} />
  </Card.Content>
  <Card.Actions>
    <Button>View</Button>
  </Card.Actions>
</Card>

// Avoid: Over-configured single component
<Card
  imageUrl={imageUrl}
  title={title}
  tags={tags}
  showActions
  actionType="view"
  // ...too many props
/>
```

**Container/Presenter Pattern**

```typescript
// Container: Logic and data
function DrillsListContainer() {
  const { data, isLoading } = useDrills();
  const { filters, setFilters } = useFilters();

  return (
    <DrillsListPresenter
      drills={data}
      filters={filters}
      onFilterChange={setFilters}
      isLoading={isLoading}
    />
  );
}

// Presenter: Pure rendering
function DrillsListPresenter({ drills, filters, onFilterChange, isLoading }) {
  // Rendering logic only
}
```

---

## Performance Optimization

### List Rendering

```typescript
import { FlashList } from "@shopify/flash-list";

function DrillsList({ drills }: DrillsListProps) {
  return (
    <FlashList
      data={drills}
      renderItem={({ item }) => <DrillCard drill={item} />}
      estimatedItemSize={120}
      keyExtractor={(item) => item.id}
    />
  );
}
```

### Image Optimization

```typescript
import FastImage from "react-native-fast-image";

function DrillImage({ uri }: { uri: string }) {
  return (
    <FastImage
      source={{ uri, priority: FastImage.priority.normal }}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}
```

### Memoization Strategy

```typescript
// Memoize expensive components
const DrillCard = React.memo(DrillCardComponent);

// Memoize expensive calculations
const filteredDrills = useMemo(
  () => applyFilters(drills, filters),
  [drills, filters]
);

// Memoize callbacks passed to children
const handlePress = useCallback(
  (id: string) => navigation.navigate("DrillDetail", { id }),
  [navigation]
);
```

---

## API Integration

### API Client Setup

```typescript
// services/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Data Fetching with React Query

```typescript
// hooks/useDrills.ts
import { useQuery } from "@tanstack/react-query";
import { fetchDrills } from "@/services/api/drills.api";

export function useDrills(filters?: DrillFilters) {
  return useQuery({
    queryKey: ["drills", filters],
    queryFn: () => fetchDrills(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

---

## Offline Support

### Caching Strategy

1. **Network First, Cache Fallback**

   - Attempt network request
   - Fall back to cached data if offline
   - Show indicator when viewing cached data

2. **Cache Then Network**
   - Show cached data immediately
   - Update in background if network available
   - Refresh UI when fresh data arrives

### Implementation

```typescript
export function useDrillsOffline() {
  const { data: networkData, isError } = useDrills();
  const [cachedData, setCachedData] = useState<Drill[]>([]);

  useEffect(() => {
    if (networkData) {
      // Cache successful response
      AsyncStorage.setItem("drills", JSON.stringify(networkData));
      setCachedData(networkData);
    } else {
      // Load from cache
      AsyncStorage.getItem("drills").then((cached) => {
        if (cached) setCachedData(JSON.parse(cached));
      });
    }
  }, [networkData]);

  return {
    data: networkData || cachedData,
    isOffline: isError && cachedData.length > 0,
  };
}
```

---

## Testing Strategy

### Unit Tests

- Utility functions
- Custom hooks
- Business logic
- Data transformations

### Component Tests

- Component rendering
- User interactions
- Prop variations
- Accessibility

### Integration Tests

- Navigation flows
- Data fetching and caching
- Filter application
- Search functionality

### Example Test

```typescript
describe("DrillCard", () => {
  it("renders drill information correctly", () => {
    const drill = mockDrill();
    const { getByText, getByRole } = render(<DrillCard drill={drill} />);

    expect(getByText(drill.title)).toBeTruthy();
    expect(getByRole("button")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const drill = mockDrill();
    const onPress = jest.fn();
    const { getByRole } = render(<DrillCard drill={drill} onPress={onPress} />);

    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledWith(drill.id);
  });
});
```

---

## Build and Deployment

### Environment Configuration

```typescript
// .env.development
API_BASE_URL=https://dev-api.pluma.app
ANALYTICS_ENABLED=false

// .env.production
API_BASE_URL=https://api.pluma.app
ANALYTICS_ENABLED=true
```

### Build Commands

```bash
# Development
npm run ios
npm run android

# Production builds
npm run build:ios
npm run build:android

# Testing
npm test
npm run test:coverage
npm run test:e2e
```

### Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Run full test suite
4. Build production bundles
5. Submit to App Store / Play Store
6. Tag release in git

---

## Code Standards

### TypeScript Guidelines

- Use strict mode
- Avoid `any` types
- Define interfaces for all data structures
- Use type guards for runtime type checking

### Naming Conventions

- **Components**: PascalCase (`DrillCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDrills.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_DRILLS_PER_PAGE`)
- **Files**: kebab-case for utilities (`format-date.ts`)

### File Organization

- One component per file
- Co-locate related files (component + styles + tests)
- Index files for clean imports
- Separate business logic from UI

---

## Security Considerations

### Data Protection

- No sensitive user data stored locally
- API tokens stored securely in keychain
- Input validation on all forms
- Sanitize user-generated content

### API Security

- HTTPS only
- Request timeout limits
- Rate limiting awareness
- Error messages don't leak system info

---

## Monitoring and Analytics

### Performance Monitoring

- Track app startup time
- Monitor navigation performance
- Track API response times
- Measure render performance

### User Analytics (Privacy-First)

- Screen views
- Drill/shot views
- Search queries (anonymized)
- Filter usage patterns
- No personal data collection

### Error Tracking

- Crash reporting
- API error logging
- Navigation errors
- Render errors with error boundaries

---

## Future Considerations

### Scalability

- Pagination for large drill lists
- Virtual scrolling for long instruction lists
- Image lazy loading and compression
- Code splitting for faster initial load

### Feature Expansion

- User accounts and progress tracking
- Custom drill creation
- Social sharing
- Video demonstrations
- Workout programs

### Technical Debt Management

- Regular dependency updates
- Code refactoring sprints
- Performance audits
- Accessibility audits

---

_Last Updated: December 2025_
_Version: 1.0_
