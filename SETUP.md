# Build Variants Setup Guide

This guide explains how to set up and run both Android build variants of this React Native Expo app.

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
2. **Java 17** (LTS version - required for React Native)
   - Check version: `java --version`
   - Should show: `openjdk 17.x.x` or similar
3. **Android SDK** with the following:
   - Build Tools 36.0.0
   - Platform API 36
   - NDK 27.1.12297006
4. **Expo CLI** (installed via npm)

### Installing Java 17

If you have a different Java version, install Java 17:

#### Using Homebrew (macOS):
```bash
# Install Java 17
brew install openjdk@17

# Link it system-wide
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Add to your shell profile (~/.zshrc or ~/.bash_profile)
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
export JAVA_HOME="/opt/homebrew/opt/openjdk@17"

# Reload shell
source ~/.zshrc  # or source ~/.bash_profile
```

#### Using SDKMAN (Cross-platform):
```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Java 17
sdk install java 17.0.13-tem
sdk default java 17.0.13-tem
```

## Project Setup

### 1. Install Dependencies

```bash
cd margelo
npm install
```

### 2. Configure Gradle Properties

The project is already configured with necessary Gradle settings in [android/gradle.properties](android/gradle.properties):

```properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED
newArchEnabled=true
hermesEnabled=true
edgeToEdgeEnabled=true
```

## Build Variants

This project has **two build variants** configured via Android product flavors:

### 1. **Standard Variant**
- **Package ID**: `com.treeindia.margelo`
- **Description**: Standard React Native app without any native modifications
- **Use case**: Default production build

### 2. **WithHeader Variant**
- **Package ID**: `com.treeindia.margelo.withheader`
- **Description**: Includes a native Android header bar with "margelo is cool" text
- **Use case**: Demonstrates native view integration with React Native
- **Features**:
  - Gray header bar (120dp height)
  - Native Android TextView (not React component)
  - Demonstrates view hierarchy manipulation

Both variants can be installed simultaneously on the same device since they have different package IDs.

## Running the Variants

### Option 1: Using NPM Scripts (Recommended)

#### Standard Variant
```bash
npm run android
```

#### WithHeader Variant
```bash
npm run android:withHeader
```

### Option 2: Using Expo CLI Directly

#### Standard Variant
```bash
npx expo run:android --variant standardDebug
```

#### WithHeader Variant
```bash
npx expo run:android --variant withHeaderDebug
```

### Option 3: Building Manually with Gradle

```bash
# Navigate to android directory
cd android

# Build both variants
./gradlew assembleStandardDebug assembleWithHeaderDebug

# Install manually
adb install -r app/build/outputs/apk/standard/debug/app-standard-debug.apk
adb install -r app/build/outputs/apk/withHeader/debug/app-withHeader-debug.apk
```

## Setting Up Wireless Debugging

If you're using wireless ADB:

### Method 1: Port Forwarding (Recommended)
```bash
# Forward Metro port to device
adb reverse tcp:8081 tcp:8081

# Now run the app normally
npm run android:withHeader
```

### Method 2: Configure Dev Server IP (Android 10 and below)
```bash
# Enable TCP mode
adb tcpip 5555

# Get device IP from Settings → About Phone → Status
# Then connect wirelessly
adb connect <device-ip>:5555

# Disconnect USB and continue
```

### Method 3: Wireless Debugging (Android 11+)
1. Enable **Developer Options** on device
2. Go to **Settings → Developer Options → Wireless Debugging**
3. Tap **Pair device with pairing code**
4. Run on computer:
   ```bash
   adb pair <ip>:<port>
   # Enter pairing code shown on device

   adb connect <ip>:<port>
   # Use IP and port from main "Wireless debugging" screen
   ```

## Metro Bundler

The Metro bundler must be running to serve JavaScript:

```bash
# Start Metro
npm start

# Or let expo run:android start it automatically
```

## Troubleshooting

### Java Version Issues
**Error**: `A restricted method in java.lang.System has been called`

**Solution**: Ensure you're using Java 17 (not Java 21 or 24):
```bash
java --version
# Should show: openjdk 17.x.x
```

### Metro Connection Error
**Error**: `Unable to load script. Make sure you're running Metro`

**Solution**: Set up port forwarding:
```bash
adb reverse tcp:8081 tcp:8081
```

### Build Variant Confusion
**Error**: `Cannot locate tasks that match 'app:installDebug'`

**Solution**: Always specify the variant explicitly:
```bash
npx expo run:android --variant standardDebug
# or
npx expo run:android --variant withHeaderDebug
```

### Gradle Daemon Issues
If builds are slow or failing:
```bash
cd android
./gradlew --stop
./gradlew clean
cd ..
npm run android
```

## Project Structure

### Variant-Specific Files

```
android/app/src/
├── main/                    # Shared code for all variants
│   ├── AndroidManifest.xml
│   └── java/com/treeindia/margelo/
│       ├── MainApplication.kt
│       └── (MainActivity.kt - if no variant-specific)
├── standard/                # Standard variant only
│   └── java/com/treeindia/margelo/
│       └── MainActivity.kt  # Standard activity (no header)
└── withHeader/              # WithHeader variant only
    └── java/com/treeindia/margelo/
        └── MainActivity.kt  # Activity with native header
```

### Build Configuration

Flavors are defined in [android/app/build.gradle](android/app/build.gradle):

```gradle
flavorDimensions "header"
productFlavors {
    standard {
        dimension "header"
        applicationIdSuffix ""
    }
    withHeader {
        dimension "header"
        applicationIdSuffix ".withheader"
    }
}
```

## Key Features

### Text Overflow Fixes
Both variants include fixes for text overflow:
- Song list items properly truncate long titles with ellipsis
- Full-screen player text respects screen boundaries
- Implemented using `numberOfLines`, `ellipsizeMode`, and flex constraints

### Native Header Implementation (WithHeader Variant)
The native header is added in `MainActivity.onCreate()` by:
1. Accessing the activity's content view
2. Removing the React root view temporarily
3. Creating a LinearLayout container
4. Adding the native TextView header
5. Re-adding the React root view below the header

## Development Workflow

1. **Make code changes** in `src/`
2. **Metro hot reloads** automatically
3. **For native changes**, rebuild the APK:
   ```bash
   npm run android:withHeader
   ```

## Production Builds

To create release builds:

```bash
cd android

# Build release variants
./gradlew assembleStandardRelease assembleWithHeaderRelease

# APKs will be in:
# app/build/outputs/apk/standard/release/
# app/build/outputs/apk/withHeader/release/
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Android Build Variants](https://developer.android.com/studio/build/build-variants)
- [Gradle Plugin User Guide](https://docs.gradle.org/)

## Summary

| Command | Variant | Package ID |
|---------|---------|------------|
| `npm run android` | Standard | `com.treeindia.margelo` |
| `npm run android:withHeader` | WithHeader | `com.treeindia.margelo.withheader` |

Both variants share the same React Native codebase but differ in their native Android implementation. The withHeader variant demonstrates how to integrate native Android views with React Native content.
