import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const StorageScreen = () => {
  const [asyncValue, setAsyncValue] = useState('');
  const [asyncInput, setAsyncInput] = useState('');
  const [keychainCredentials, setKeychainCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [keychainUsername, setKeychainUsername] = useState('');
  const [keychainPassword, setKeychainPassword] = useState('');
  const [storageStats, setStorageStats] = useState({
    asyncKeys: 0,
    asyncSize: 0,
    keychainExists: false,
  });

  // AsyncStorage Operations
  const saveToAsyncStorage = async () => {
    try {
      if (asyncInput.trim()) {
        await AsyncStorage.setItem('demo_key', asyncInput);
        setAsyncValue(asyncInput);
        setAsyncInput('');
        Alert.alert('Success', 'Data saved to AsyncStorage');
        await updateStorageStats();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
      console.error('AsyncStorage save error:', error);
    }
  };

  const loadFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('demo_key');
      if (value !== null) {
        setAsyncValue(value);
        Alert.alert('Success', 'Data loaded from AsyncStorage');
      } else {
        Alert.alert('Info', 'No data found in AsyncStorage');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
      console.error('AsyncStorage load error:', error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('demo_key');
      setAsyncValue('');
      Alert.alert('Success', 'Data cleared from AsyncStorage');
      await updateStorageStats();
    } catch (error) {
      Alert.alert('Error', 'Failed to clear data');
      console.error('AsyncStorage clear error:', error);
    }
  };

  const clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setAsyncValue('');
      Alert.alert('Success', 'All AsyncStorage data cleared');
      await updateStorageStats();
    } catch (error) {
      Alert.alert('Error', 'Failed to clear all data');
      console.error('AsyncStorage clear all error:', error);
    }
  };

  // Keychain Operations
  const saveToKeychain = async () => {
    try {
      if (keychainUsername.trim() && keychainPassword.trim()) {
        await Keychain.setInternetCredentials(
          'demo_service',
          keychainUsername,
          keychainPassword,
        );
        setKeychainCredentials({
          username: keychainUsername,
          password: keychainPassword,
        });
        setKeychainUsername('');
        setKeychainPassword('');
        Alert.alert('Success', 'Credentials saved to Keychain');
        await updateStorageStats();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save credentials');
      console.error('Keychain save error:', error);
    }
  };

  const loadFromKeychain = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials('demo_service');
      if (credentials && credentials.username && credentials.password) {
        setKeychainCredentials({
          username: credentials.username,
          password: credentials.password,
        });
        Alert.alert('Success', 'Credentials loaded from Keychain');
      } else {
        Alert.alert('Info', 'No credentials found in Keychain');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load credentials');
      console.error('Keychain load error:', error);
    }
  };

  const clearKeychain = async () => {
    try {
      await Keychain.resetInternetCredentials({ service: 'demo_service' });
      setKeychainCredentials(null);
      Alert.alert('Success', 'Credentials cleared from Keychain');
      await updateStorageStats();
    } catch (error) {
      Alert.alert('Error', 'Failed to clear credentials');
      console.error('Keychain clear error:', error);
    }
  };

  // Storage Statistics
  const updateStorageStats = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }

      const credentials = await Keychain.getInternetCredentials('demo_service');
      const hasKeychain = Boolean(credentials && credentials.username);

      setStorageStats({
        asyncKeys: keys.length,
        asyncSize: totalSize,
        keychainExists: hasKeychain,
      });
    } catch (error) {
      console.error('Storage stats error:', error);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await loadFromAsyncStorage();
      await loadFromKeychain();
      await updateStorageStats();
    };
    initializeData().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>💾 Storage Demo</Text>
          <Text style={styles.subtitle}>AsyncStorage & Keychain</Text>
        </View>

        {/* Storage Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>📊 Storage Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>AsyncStorage Keys</Text>
              <Text style={styles.statValue}>{storageStats.asyncKeys}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Storage Size</Text>
              <Text style={styles.statValue}>{storageStats.asyncSize}B</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Keychain</Text>
              <Text style={styles.statValue}>
                {storageStats.keychainExists ? '✅' : '❌'}
              </Text>
            </View>
          </View>
        </View>

        {/* AsyncStorage Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🗂️ AsyncStorage</Text>
          <Text style={styles.sectionDescription}>
            Persistent key-value storage for React Native
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter text to save..."
              value={asyncInput}
              onChangeText={setAsyncInput}
              multiline
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                saveToAsyncStorage().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loadFromAsyncStorage().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={() => {
                clearAsyncStorage().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Stored Value:</Text>
            <Text style={styles.resultValue}>{asyncValue || 'No data'}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={() => {
              clearAllAsyncStorage().catch(console.error);
            }}
          >
            <Text style={styles.buttonText}>Clear All AsyncStorage</Text>
          </TouchableOpacity>
        </View>

        {/* Keychain Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🔐 Keychain</Text>
          <Text style={styles.sectionDescription}>
            Secure storage for sensitive data like passwords
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={keychainUsername}
              onChangeText={setKeychainUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={keychainPassword}
              onChangeText={setKeychainPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                saveToKeychain().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loadFromKeychain().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={() => {
                clearKeychain().catch(console.error);
              }}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Stored Credentials:</Text>
            {keychainCredentials ? (
              <View>
                <Text style={styles.resultValue}>
                  Username: {keychainCredentials.username}
                </Text>
                <Text style={styles.resultValue}>
                  Password: {'*'.repeat(keychainCredentials.password.length)}
                </Text>
              </View>
            ) : (
              <Text style={styles.resultValue}>No credentials stored</Text>
            )}
          </View>
        </View>

        {/* Features Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>🚀 Storage Features</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>AsyncStorage</Text>
              <Text style={styles.featureItem}>• Persistent storage</Text>
              <Text style={styles.featureItem}>• Key-value pairs</Text>
              <Text style={styles.featureItem}>• String-based data</Text>
              <Text style={styles.featureItem}>• App settings</Text>
              <Text style={styles.featureItem}>• User preferences</Text>
            </View>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>Keychain</Text>
              <Text style={styles.featureItem}>• Secure storage</Text>
              <Text style={styles.featureItem}>• Encrypted data</Text>
              <Text style={styles.featureItem}>• Passwords & tokens</Text>
              <Text style={styles.featureItem}>• Biometric access</Text>
              <Text style={styles.featureItem}>• Hardware security</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  featureColumnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default StorageScreen;
