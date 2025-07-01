# Discount Card Mobile App

A modern mobile application built with Apache Cordova for storing and managing discount cards with QR code functionality.

## Features

### 🎯 Core Features
- **Digital Card Storage**: Store all your discount cards in one convenient app
- **QR Code Scanning**: Scan QR codes from physical cards using your device camera
- **QR Code Generation**: Automatically generate QR codes for easy scanning at stores
- **Manual Entry**: Manually enter card details when scanning isn't available
- **Card Management**: Edit, delete, and organize your discount cards
- **Offline Storage**: All data stored locally on your device for privacy

### 📱 User Interface
- **Modern Design**: Clean, intuitive interface with Bootstrap 5
- **Card Colors**: Customizable color coding for easy card identification
- **Responsive Layout**: Works perfectly on phones and tablets
- **Dark Mode**: Automatic dark mode support based on device settings
- **Touch-Friendly**: Large buttons and easy navigation for mobile use

### 🔒 Privacy & Security
- **Local Storage**: All data stored locally on your device
- **No Internet Required**: Works completely offline
- **No Data Collection**: Your card information never leaves your device

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Apache Cordova CLI
- Android SDK (for Android builds)
- Xcode (for iOS builds, macOS only)

### Quick Start

1. **Clone or Download** the project to your local machine

2. **Install Cordova globally** (if not already installed):
   ```bash
   npm install -g cordova
   ```

3. **Navigate to the project directory**:
   ```bash
   cd discount-card-app
   ```

4. **Add your target platform**:
   ```bash
   # For Android
   cordova platform add android
   
   # For iOS (macOS only)
   cordova platform add ios
   ```

5. **Install required plugins** (already included in config.xml):
   ```bash
   cordova plugin add cordova-plugin-qrscanner
   cordova plugin add cordova-plugin-camera
   cordova plugin add cordova-plugin-file
   ```

6. **Build the app**:
   ```bash
   # For Android
   cordova build android
   
   # For iOS
   cordova build ios
   ```

7. **Run on device/emulator**:
   ```bash
   # Run on Android device/emulator
   cordova run android
   
   # Run on iOS device/simulator
   cordova run ios
   ```

### Development & Testing

For development and testing in a browser:
```bash
cordova serve
```
Then open http://localhost:8000 in your browser.

**Note**: QR scanning won't work in browser mode, but you can test other features.

## Usage Guide

### Adding Your First Card

1. **Tap the "+" button** in the top navigation bar
2. **Enter card details**:
   - Card Name (e.g., "Starbucks Rewards", "Target Circle")
   - Card Number (optional)
   - Choose a color for easy identification
3. **Add QR Code** (choose one method):
   - **Scan QR Code**: Use camera to scan existing QR code
   - **Enter Manually**: Type/paste QR code data manually
4. **Save the card**

### Using Your Cards

1. **View all cards** on the main screen
2. **Tap any card** to view details and QR code
3. **Show QR code** to store cashier for scanning
4. **Edit or delete** cards using the buttons in card detail view

### QR Code Scanning

1. **Tap "Scan QR Code"** when adding a card
2. **Allow camera permissions** when prompted
3. **Position QR code** within the camera view
4. **Wait for automatic detection** and capture
5. **Verify the data** and save the card

## Technical Details

### Built With
- **Apache Cordova**: Cross-platform mobile development
- **HTML5/CSS3/JavaScript**: Core web technologies
- **Bootstrap 5**: Modern UI framework
- **Bootstrap Icons**: Icon library
- **QRCode.js**: QR code generation library

### Plugins Used
- **cordova-plugin-qrscanner**: QR code scanning functionality
- **cordova-plugin-camera**: Camera access
- **cordova-plugin-file**: File system access

### Browser Compatibility
- **Chrome/Chromium**: Full support
- **Safari**: Full support
- **Firefox**: Full support
- **WebView**: Optimized for Android and iOS WebView

## File Structure

```
discount-card-app/
├── www/                    # Web application files
│   ├── css/
│   │   └── styles.css     # Application styles
│   ├── js/
│   │   └── app.js         # Main application logic
│   ├── img/               # App icons and images
│   └── index.html         # Main HTML file
├── platforms/             # Platform-specific builds
├── plugins/               # Cordova plugins
├── config.xml            # Cordova configuration
└── package.json          # Node.js dependencies
```

## Permissions

### Android
- **Camera**: Required for QR code scanning
- **Storage**: Required for local data storage

### iOS
- **Camera**: Required for QR code scanning
- **Photo Library**: Optional for saving QR codes

## Troubleshooting

### Common Issues

**QR Scanner not working**:
- Ensure camera permissions are granted
- Check if running on actual device (not browser)
- Verify adequate lighting for QR code scanning

**App won't build**:
- Ensure all prerequisites are installed
- Check Android SDK/Xcode setup
- Run `cordova requirements` to verify setup

**Camera permission denied**:
- Go to device settings and manually enable camera permission
- Restart the app after enabling permissions

### Support

For technical issues or feature requests, please check the project documentation or contact the development team.

## License

This project is open source and available under the MIT License.

## Version History

- **v1.0.0**: Initial release with core features
  - Card storage and management
  - QR code scanning and generation
  - Modern mobile UI
  - Offline functionality

---

**Enjoy managing your discount cards digitally! 🎉**