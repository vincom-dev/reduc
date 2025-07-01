# Build Instructions for Discount Card App

## Quick Testing (Browser)

For immediate testing without mobile platform setup:

```bash
# Open test-app.html in any modern browser
# This allows testing of all features except QR scanning
open test-app.html
```

## Development Server

To run the app in development mode:

```bash
# Start Cordova development server
cordova serve --port 8080

# Then open: http://localhost:8080
```

## Mobile Platform Setup

### Android Build

1. **Install Android Studio**:
   - Download and install Android Studio
   - Install Android SDK (API level 22 or higher)
   - Set ANDROID_HOME environment variable

2. **Set Environment Variables**:
   ```bash
   export ANDROID_HOME=/path/to/android-sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

3. **Build Android APK**:
   ```bash
   cordova build android
   ```

4. **Run on Android Device**:
   ```bash
   # Connect Android device via USB with USB debugging enabled
   cordova run android
   ```

### iOS Build (macOS only)

1. **Install Xcode**:
   - Install Xcode from Mac App Store
   - Install iOS SDK

2. **Add iOS Platform**:
   ```bash
   cordova platform add ios
   ```

3. **Build iOS App**:
   ```bash
   cordova build ios
   ```

4. **Run on iOS Device/Simulator**:
   ```bash
   cordova run ios
   ```

## Platform-Specific Commands

### Android
```bash
# Add Android platform
cordova platform add android

# Build debug APK
cordova build android

# Build release APK
cordova build android --release

# Run on device
cordova run android

# Run on emulator
cordova emulate android
```

### iOS
```bash
# Add iOS platform
cordova platform add ios

# Build for iOS
cordova build ios

# Run on device
cordova run ios

# Run on simulator
cordova emulate ios
```

## Distribution

### Android APK Distribution

1. **Build release APK**:
   ```bash
   cordova build android --release
   ```

2. **Sign APK** (for production):
   ```bash
   # Generate keystore (first time only)
   keytool -genkey -v -keystore my-app-key.keystore -alias discount-cards -keyalg RSA -keysize 2048 -validity 10000
   
   # Sign APK
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-app-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk discount-cards
   
   # Align APK
   zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk discount-cards.apk
   ```

### iOS App Store Distribution

1. **Build for production**:
   ```bash
   cordova build ios --release
   ```

2. **Open in Xcode**:
   ```bash
   open platforms/ios/DiscountCards.xcworkspace
   ```

3. **Archive and submit through Xcode**

## Troubleshooting

### Common Build Issues

**Android SDK not found**:
```bash
# Check if ANDROID_HOME is set
echo $ANDROID_HOME

# Check if android command is available
which android
```

**iOS build fails**:
```bash
# Check Xcode installation
xcode-select --print-path

# Check iOS simulator list
xcrun simctl list
```

**Plugin issues**:
```bash
# Remove and re-add plugins
cordova plugin remove cordova-plugin-qrscanner
cordova plugin add cordova-plugin-qrscanner

# Check plugin list
cordova plugin list
```

### Performance Optimization

**For production builds**:
1. Minify CSS and JavaScript
2. Optimize images
3. Enable ProGuard for Android
4. Use release builds only

**Memory optimization**:
1. Limit number of stored cards
2. Compress QR code data
3. Clear unused variables

## Testing

### Browser Testing
- Open `test-app.html` in Chrome/Safari/Firefox
- Test all features except QR scanning
- Use browser dev tools for debugging

### Device Testing
- Install on actual device for camera testing
- Test QR code scanning functionality
- Verify offline storage works
- Test app performance on older devices

### Emulator Testing
```bash
# Android emulator
cordova emulate android

# iOS simulator
cordova emulate ios
```