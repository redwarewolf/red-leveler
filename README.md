# 🎯 Red Leveler

A bubble level app that actually respects your screen real estate. Built with React Native & Expo.

## 📖 The Origin Story

You know how it goes - you need a simple bubble level app, download one from the store, and suddenly you're watching more ads than a Super Bowl broadcast. After the 47th "CONGRATULATIONS YOU WON" popup, I decided: 

> *"Screw this, I'll make my own level app - with blackjack and hookers!"*

Well, the blackjack and hookers didn't make it into v1.0, but at least there are **zero ads**. 🎰

### A Backend Developer's Mobile Adventure

Full disclosure: I'm a 100% backend developer who stumbled into mobile development as an excuse to learn something new. This entire app was built with the generous assistance of AI, because my frontend skills are... let's say "non-existent" to be polite.

**Apologies in advance** for any code that makes you question my career choices. If you find yourself thinking *"who wrote this garbage?"* - it was me, an idiot trying his best with React Native. 😅

The silver lining? At least the app works, and there are still no ads!

## ✨ Features

- **Dual Mode Display**
  - 🔵 **Portrait Mode**: Circular bubble level with X/Y axes
  - 📏 **Landscape Mode**: Linear level for precise horizontal measurements
  
- **Real-time Measurements**
  - Accelerometer-based angle detection
  - ±1° precision threshold
  - Smooth spring animations (because we're fancy like that)

- **Visual Feedback**
  - 🟢 Green LED when perfectly level
  - 🔴 Red LED when tilted
  - Live angle display in LCD-style format

- **Orientation Lock**
  - Lock current orientation with custom-drawn lock icon
  - Prevents accidental rotation during measurements

- **Industrial Design**
  - Metallic/industrial aesthetic with 3D beveled borders
  - Neon green LCD-style display
  - Dark theme optimized for any lighting condition

## 🛠️ Tech Stack

- **React Native** with **Expo** SDK 54
- **expo-sensors** - Accelerometer integration
- **expo-screen-orientation** - Physical orientation locking
- **Custom Hooks** - Modular architecture with separation of concerns

## 📁 Project Structure

```
red-leveler/
├── App.js                          # Main app orchestrator
├── src/
│   ├── components/                 # UI Components
│   │   ├── LevelCircle.js         # Circular bubble level
│   │   ├── LinearLevel.js         # Linear bubble level
│   │   ├── InfoPanel.js           # LED + angle display
│   │   └── OrientationLockButton.js # Custom lock icon
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useAccelerometer.js    # Sensor data processing
│   │   ├── useOrientation.js      # Orientation management
│   │   └── useBubbleAnimation.js  # Smooth bubble movement
│   ├── utils/
│   │   └── formatters.js          # Angle formatting utilities
│   └── constants/
│       └── theme.js               # Design system constants
├── app.json                        # Expo configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:redwarewolf/red-leveler.git
   cd red-leveler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**
   - **Android**: Scan the QR code with Expo Go app
   - **iOS**: Scan with Camera app (in theory - see disclaimer below)
   - Or press `a` for Android emulator / `i` for iOS simulator

> **⚠️ iOS Disclaimer**: This app has **NOT** been tested on iOS/iPhone because I don't own one and I'm not buying one just to test a level app. In theory, it should work since it's React Native, but your mileage may vary. If you're an iOS user and it explodes, please open an issue (with screenshots of the explosion). 📱💥

## 🏗️ Building for Production

### EAS Build

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure project for EAS Build
eas build:configure

# Build for Android
eas build --platform android --profile production

# Build for iOS (good luck, not tested by me)
eas build --platform ios --profile production
```

### Classic Expo Build (Legacy)

> Note: Classic build service is being phased out. Use EAS Build instead.

```bash
# For Android APK
expo build:android -t apk

# For Android App Bundle (Google Play)
expo build:android -t app-bundle

# For iOS (theoretical, untested)
expo build:ios
```

### Local Development Build

```bash
# Create development build
npx expo run:android  # For Android
npx expo run:ios      # For iOS (if you have a Mac and hate yourself)
```

### Platform Notes

- ✅ **Android**: Tested and working on Android devices
- ⚠️ **iOS**: Completely untested. I don't have an iPhone, and I'm not spending $1000+ to test a free level app. React Native is cross-platform in theory, so it *should* work. But if it doesn't, that's a you problem. 🤷‍♂️

## 🧪 Development & Testing

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (untested, see disclaimer above)
npm run ios

# Run on web
npm run web
```

### Tests & Linting

Currently there are no tests or linters configured because... I couldn't be bothered. 😅

If you want to add them:
- Testing: Jest + React Native Testing Library
- Linting: ESLint with React Native config

## 🤝 Contributing

Contributions are welcome! Whether it's:

- 🐛 Bug reports
- ✨ Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

### How to Contribute

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Keep code clean and well-commented
   - Follow the existing code style
   - Test on both portrait and landscape modes

4. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe what your changes do
   - Include screenshots if UI-related
   - Link any related issues

### Code Style Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Follow the existing file structure
- Comment complex logic

## 📋 Roadmap

### Actual Features
- [ ] Haptic feedback when level is reached
- [ ] Make a frontend developer not cry when reading the code
- [ ] Calibration/zero-point adjustment
- [ ] Stop Googling "what's a div" 
- [ ] Adjustable sensitivity thresholds
- [ ] Angle measurement mode (not just level detection)
- [ ] Dark/light theme toggle
- [ ] Add the blackjack from the original plan
- [ ] Write a silly story in LinkedIn how I'm a true full-stack developer

### Non-Negotiables
- [x] **Still no ads** ✅
- [x] **Still no tracking** ✅
- [x] **Still respects your sanity** ✅

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Thanks to all the ad-infested level apps that inspired this project
- Built with frustration, caffeine, and AI assistance ☕🤖
- Tested on a single Android device and surfaces (some were actually level)
- **NOT** tested on iOS (because iPhones are expensive and I'm poor)
- Shoutout to Stack Overflow for existing

## 📬 Contact

**Pedro Jara** - [@redwarewolf](https://github.com/redwarewolf)

Project Link: [https://github.com/redwarewolf/red-leveler](https://github.com/redwarewolf/red-leveler)

---

*"I love it! It's wonderful"* - My Mom.

*"I came for the level, I stayed for the lack of ads"* - Anonymous User, probably

