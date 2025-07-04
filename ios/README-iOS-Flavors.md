# iOS Flavors Configuration

This iOS project is configured to support multiple flavors (dev, staging, production) with separate configurations for each environment.

## Project Structure

```
ios/
├── Config/
│   ├── Common.xcconfig          # Common settings for all flavors
│   ├── Debug.xcconfig           # Debug/Development flavor
│   ├── Staging.xcconfig         # Staging flavor
│   └── Production.xcconfig      # Production flavor
├── rn-flavor/
│   └── flavors/
│       ├── dev/
│       │   ├── Info.plist       # Development-specific Info.plist
│       │   ├── dev.entitlements # Development entitlements
│       │   └── GoogleService-Info.plist # Firebase dev config
│       ├── stg/
│       │   ├── Info.plist       # Staging-specific Info.plist
│       │   ├── stg.entitlements # Staging entitlements
│       │   └── GoogleService-Info.plist # Firebase staging config
│       └── prod/
│           ├── Info.plist       # Production-specific Info.plist
│           ├── prod.entitlements # Production entitlements
│           └── GoogleService-Info.plist # Firebase production config
└── Podfile                      # CocoaPods configuration
```

## Features

### 1. Separate Bundle Identifiers
- **Dev**: `com.rnflavor.dev`
- **Staging**: `com.rnflavor.stg`
- **Production**: `com.rnflavor`

### 2. Different App Names
- **Dev**: "rn-flavor Dev"
- **Staging**: "rn-flavor Staging"
- **Production**: "rn-flavor"

### 3. Environment-specific Configuration
- Separate Firebase projects for each environment
- Different API endpoints via react-native-config
- Environment-specific entitlements
- Separate push notification environments

### 4. Development Features
- Dev environment allows arbitrary loads in NSAppTransportSecurity
- More permissive settings for development
- Debug preprocessor definitions

## How to Use

### Setting up Xcode Project

1. **Create Build Configurations**:
   - Open Xcode project
   - Go to Project → Info → Configurations
   - Duplicate existing configurations and rename them:
     - `Debug-Dev`
     - `Debug-Staging`
     - `Release-Production`

2. **Create Schemes**:
   - Create separate schemes for each flavor
   - Configure each scheme to use the appropriate build configuration

3. **Configure Build Settings**:
   - Select your target
   - Go to Build Settings
   - For each configuration, set the Configuration File to the appropriate xcconfig file

### Building Different Flavors

```bash
# Development
yarn ios:dev

# Staging
yarn ios:stg

# Production
yarn ios:prod
```

### Important Notes

1. **Firebase Configuration**: Replace the template GoogleService-Info.plist files with your actual Firebase project configurations.

2. **Entitlements**: Update the entitlements files according to your app's requirements and Apple Developer account setup.

3. **Bundle Identifiers**: Make sure your bundle identifiers match your Apple Developer account app registrations.

4. **Associated Domains**: Update the associated domains in entitlements files to match your actual domains.

5. **Environment Variables**: This setup works with react-native-config to load different .env files for each environment.

## Troubleshooting

1. **Pod install issues**: Run `pod install` after any changes to the Podfile.

2. **Build configuration errors**: Make sure all xcconfig files are properly included in your Xcode project.

3. **Missing files**: Ensure all flavor-specific files are added to the Xcode project and properly referenced.

4. **Code signing**: Configure separate provisioning profiles for each flavor if needed.
