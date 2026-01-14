# Margelo

A React Native application built with Expo, TypeScript, and NativeWind.

## Prerequisites

- Node.js 18 or higher
- Bun 1.3.3 or higher
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with Android SDK
- Expo CLI (installed automatically with dependencies)

## Tech Stack

- React Native 0.81.5
- Expo 54
- TypeScript 5.9
- NativeWind (Tailwind CSS for React Native)
- React Query (TanStack Query)
- Zustand (State Management)
- React Native Reanimated
- React Native Gesture Handler
- React Native Worklets

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd margelo
```

2. Install dependencies using Bun
```bash
bun install
```

## Running the Application

### Development Server

Start the Expo development server:
```bash
bun start
```

This will open the Expo Developer Tools in your browser. From here you can:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan QR code with Expo Go app on your physical device

### iOS

Run on iOS simulator:
```bash
bun ios
```

Requirements:
- macOS with Xcode installed
- iOS Simulator set up through Xcode

### Android

Run on Android emulator:
```bash
bun android
```

Run with custom header variant:
```bash
bun run android:withHeader
```

Requirements:
- Android Studio installed
- Android SDK configured
- Android emulator running or physical device connected via USB

### Web

Run in web browser:
```bash
bun web
```

## Development Commands

### Linting

Check code for linting and formatting issues:
```bash
bun lint
```

### Format

Auto-fix linting and formatting issues:
```bash
bun format
```

### Prebuild

Generate native iOS and Android directories:
```bash
bun prebuild
```

This command is necessary when:
- Adding native modules
- Changing native configurations
- First time setting up native builds

## Project Structure

```
margelo/
├── src/
│   ├── api/           # API integration and services
│   ├── components/    # Reusable components
│   ├── constants/     # App constants
│   ├── hooks/         # Custom React hooks
│   ├── stores/        # Zustand state stores
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── components/        # Root level components
├── assets/           # Images, fonts, and other static assets
├── App.tsx           # Application entry point
└── global.css        # Global Tailwind styles
```

## Configuration Files

- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `metro.config.js` - Metro bundler configuration
- `babel.config.js` - Babel configuration
- `eslint.config.js` - ESLint configuration
- `prettier.config.js` - Prettier configuration

## Troubleshooting

### Clear Cache

If you encounter build issues:
```bash
bun start --clear
```

### Reset Dependencies

```bash
rm -rf node_modules bun.lock
bun install
```

### iOS Build Issues

```bash
cd ios
pod install
cd ..
bun ios
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
bun android
```

## Notes

- This project uses Bun as the package manager. All npm/yarn commands should be replaced with Bun equivalents.
- NativeWind is configured for styling. Use Tailwind classes in className prop.
- The project uses TypeScript strict mode. Ensure all types are properly defined.
