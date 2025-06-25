/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
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
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Environment Info */}
      <View style={styles.envContainer}>
        <Text style={styles.envTitle}>Environment: {Config.ENV}</Text>
        <Text style={styles.envInfo}>API URL: {Config.API_URL}</Text>
        <Text style={styles.envInfo}>
          Version: {Config.ANDROID_VERSION_NAME}
        </Text>
        <Text style={styles.envInfo}>
          Package: {Config.ANDROID_APPLICATION_ID}
        </Text>
      </View>

      <NewAppScreen templateFileName="App.tsx" />
    </View>
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
});

export default App;
