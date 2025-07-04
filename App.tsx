/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Config from 'react-native-config';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Environment Info */}
      <View style={styles.envContainer}>
        <Text style={styles.envTitle}>
          Environment: {Config.ENV ?? 'development'}
        </Text>
        <Text style={styles.envInfo}>
          API URL: {Config.API_URL ?? 'Not configured'}
        </Text>
        <Text style={styles.envInfo}>
          Version: {Config.ANDROID_VERSION_NAME ?? '1.0.0'}
        </Text>
        <Text style={styles.envInfo}>
          Package: {Config.ANDROID_APPLICATION_ID ?? 'com.rnflavor'}
        </Text>

        {/* React Native Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionTitle}>✅ React Native 0.80.0</Text>
          <Text style={styles.versionInfo}>🎉 Migration Complete!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  envContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 8,
  },
  envTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  envInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  versionContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  versionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  versionInfo: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: '500',
  },
});

export default App;
