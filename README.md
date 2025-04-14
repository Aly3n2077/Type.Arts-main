# Type.Arts - Art Marketplace App

A React Native application for buying and selling digital art.

## Firebase Setup Instructions

To use the Google Sign-In functionality in this app, you need to set up a Firebase project and configure it properly. Follow these steps:

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "TypeArts")
4. Enable Google Analytics if desired
5. Click "Create project"

### 2. Register Your App

1. In the Firebase console, click on the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "TypeArts Web")
3. Copy the Firebase configuration object that looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```
4. Replace the placeholder values in `app/config/firebase.ts` with your actual Firebase configuration

### 3. Enable Google Sign-In

1. In the Firebase console, go to Authentication > Sign-in method
2. Enable Google as a sign-in provider
3. Configure the OAuth consent screen if prompted
4. Add your app's domain to the authorized domains list

### 4. Get Web Client ID for Google Sign-In

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to APIs & Services > Credentials
4. Look for the Web Client ID (or create a new OAuth 2.0 Client ID if needed)
5. Copy the Web Client ID and replace `YOUR_WEB_CLIENT_ID` in `app/context/AuthContext.tsx`

### 5. Install Dependencies

Make sure you have all the required dependencies installed:

```bash
npm install firebase @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin
```

## Running the App

1. Start the development server:
   ```bash
   npm start
   ```

2. Run on your device or emulator:
   ```bash
   npm run android
   # or
   npm run ios
   ```

## Features

- Google Sign-In authentication
- User profile management
- Art collections
- Favorites
- Account settings

## Project Structure

- `app/` - Main application code
  - `(tabs)/` - Tab-based navigation screens
  - `(auth)/` - Authentication screens
  - `config/` - Configuration files
  - `context/` - React Context providers
  - `components/` - Reusable UI components

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/JARVIS2077/Type.Arts)