# Pluma 🏸

A comprehensive badminton drill catalog and training companion app built with React Native and Expo. Pluma helps badminton players of all skill levels improve their game through structured drills, shot techniques, and interactive 3D training visualizations.

<div align="center">
  <img src="./assets/images/Pluma_Icon.png" alt="Pluma Logo" width="200"/>
</div>

## ✨ Features

### 🎯 Drill Catalog

- **Extensive Drill Library**: Browse 97+ badminton drills covering footwork, shots, and techniques
- **Smart Filtering**: Filter by skill level (beginner, intermediate, advanced), drill type, shot category, court position, and training focus
- **Grid & List Views**: Toggle between compact grid layout and detailed list view
- **Detailed Instructions**: Step-by-step instructions for each drill with visual guidance
- **Search Functionality**: Quickly find specific drills

### 📊 Progress Tracking

- **Drill Completion Tracker**: Circular progress indicator showing drills completed
- **Training Calendar**: Visual calendar displaying drill completion history with white rings marking active training days
- **Persistent Stats**: All progress data saved locally and synced across app sessions
- **Monthly View**: Navigate through different months to review training history

### 🏋️ Training Features

- **Interactive 3D Model Viewer**: Explore badminton training positions with interactive 3D models
- **Muscle Group Guidance**: Tap on body parts to get targeted training tips
- **Gesture Controls**: Rotate, zoom, and pan 3D models with intuitive touch gestures
- **Zoom Slider**: Precise zoom control with vertical slider

### 🎾 Shot Techniques

- **Shot Library**: Comprehensive catalog of badminton shots with detailed breakdowns
- **Technique Guides**: Learn proper form and execution for each shot type
- **Visual References**: High-quality images demonstrating shot techniques

### 🏠 Home Dashboard

- **Personalized Greeting**: Time-based welcome messages
- **Featured Drills**: Curated drill recommendations in a sliding card interface
- **Quick Categories**: Fast access to drill categories (Footwork, Accuracy, Control, Power)
- **FAQ Section**: Common questions and answers about badminton training

## 🛠 Tech Stack

### Core Framework

- **React Native** - Cross-platform mobile development
- **Expo SDK 54** - Development platform and tooling
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Navigation & Routing

- **React Navigation v7** - Native stack and bottom tab navigation
- **@react-navigation/native-stack** - Stack navigator
- **@react-navigation/bottom-tabs** - Bottom tab navigation

### State Management

- **Zustand** - Lightweight state management for global app state
- **@tanstack/react-query v5** - Server state management and caching
- **React Context API** - Provider pattern for drill tracking and favorites

### Data Persistence

- **@react-native-async-storage/async-storage** - Local storage for user data
- **Zustand Persist Middleware** - Automatic state persistence

### 3D Graphics & Animation

- **Three.js** - 3D model rendering and visualization
- **Expo GL** - OpenGL ES bindings for React Native
- **GLTFLoader** - Load and parse .glb 3D model files
- **Expo Asset** - Asset management and loading

### UI & Animations

- **React Native Reanimated v3** - High-performance animations
- **React Native Gesture Handler** - Native gesture recognition
- **Expo Vector Icons** - Icon library
- **React Native Safe Area Context** - Safe area handling for notches

### Development Tools

- **Jest** - Testing framework
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Expo Dev Client** - Enhanced development experience

## 📱 Screenshots

### Home Screen

- Circular progress tracker showing drill completion
- Monthly training calendar with completion indicators
- Featured drill carousel
- Quick access category boxes

### Drills Screen

- Grid/List toggle view
- Advanced filtering system
- Real-time search
- Drill difficulty badges

### Training Screen

- Interactive 3D body model
- Gesture-based rotation and zoom
- Muscle group selection
- Training tips overlay

### Shot Techniques

- Shot catalog with images
- Detailed technique descriptions
- Difficulty indicators

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pluma.git
cd pluma/Pluma
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

### Building for Production

#### Android

```bash
npx expo prebuild --platform android
npx expo run:android --variant release
```

#### iOS

```bash
npx expo prebuild --platform ios
npx expo run:ios --configuration Release
```

## 📂 Project Structure

```
Pluma/
├── assets/              # Images, fonts, and 3D models
│   ├── images/         # App icons and drill images
│   └── models/         # 3D GLB model files
├── src/
│   ├── app/            # App entry point and navigation
│   │   ├── navigation/ # Navigation configuration
│   │   └── providers/  # Context providers
│   ├── features/       # Feature-based modules
│   │   ├── drills/     # Drill catalog feature
│   │   ├── home/       # Home dashboard feature
│   │   ├── shots/      # Shot techniques feature
│   │   └── training/   # 3D training feature
│   ├── services/       # API and storage services
│   ├── shared/         # Shared components and utilities
│   │   ├── components/ # Reusable UI components
│   │   ├── constants/  # Theme, spacing, typography
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Helper functions
│   ├── state/          # Global state management
│   └── types/          # TypeScript type definitions
└── __tests__/          # Test files
```

## 🎨 Design System

### Colors

- **Black & White Theme**: Minimalist black background with white text
- **Accent Colors**: Subtle grays for secondary elements
- **High Contrast**: Optimized for readability

### Typography

- **Headings**: SF Pro Display (iOS) / Roboto (Android)
- **Body**: SF Pro Text (iOS) / Roboto (Android)
- **Consistent Scale**: Responsive sizing across devices

### Components

- **Cards**: Rounded corners (24px) with shadows
- **Buttons**: Touch-responsive with feedback animations
- **Pills**: Difficulty and category badges
- **Bottom Sheet**: Modal overlays for detailed content

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## 📝 Key Features Implementation

### Local Persistence

- Uses Zustand with AsyncStorage for persistent state
- Automatic state hydration on app launch
- Version-based migration system for schema updates

### Calendar Tracking

- Tracks drill completion by date (YYYY-MM-DD format)
- Visual indicators (white rings) on completed days
- Month navigation with swipe gestures

### 3D Model Viewer

- Loads .glb files using Three.js
- Interactive gesture controls for rotation and zoom
- Mesh-based selection for muscle group training tips
- Optimized rendering performance

### Drill Filtering

- Multi-criteria filtering system
- Real-time filter updates
- URL-based deep linking to filtered views

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Badminton community for drill inspiration
- Expo team for excellent tooling
- React Native community for open-source libraries

## 📧 Contact

Project Link: [https://github.com/yourusername/pluma](https://github.com/yourusername/pluma)

---

**Built with ❤️ for badminton players everywhere**

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
