import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HealthScreen = () => {
  const [healthData, setHealthData] = useState({
    steps: 0,
    heartRate: 0,
    calories: 0,
    distance: 0,
    sleepHours: 0,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [permissions, setPermissions] = useState({
    steps: false,
    heartRate: false,
    calories: false,
    distance: false,
    sleep: false,
  });

  // Simulate health data
  useEffect(() => {
    const generateMockData = () => {
      setHealthData({
        steps: Math.floor(Math.random() * 5000) + 5000,
        heartRate: Math.floor(Math.random() * 40) + 60,
        calories: Math.floor(Math.random() * 500) + 1500,
        distance: Math.random() * 5 + 3,
        sleepHours: Math.random() * 2 + 7,
      });
    };

    generateMockData();
    const interval = setInterval(generateMockData, 10000);
    return () => clearInterval(interval);
  }, []);

  const requestPermissions = async () => {
    try {
      // In a real app, you would request actual health permissions
      // For demo purposes, we'll simulate this
      Alert.alert('Health Permissions', 'Requesting access to health data...', [
        {
          text: 'Allow',
          onPress: () => {
            setPermissions({
              steps: true,
              heartRate: true,
              calories: true,
              distance: true,
              sleep: true,
            });
            setIsConnected(true);
            Alert.alert('Success', 'Health permissions granted!');
          },
        },
        {
          text: 'Deny',
          onPress: () => {
            setIsConnected(false);
            Alert.alert('Warning', 'Health permissions denied');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to request permissions');
      console.error('Health permissions error:', error);
    }
  };

  const refreshData = () => {
    if (isConnected) {
      setHealthData({
        steps: Math.floor(Math.random() * 5000) + 5000,
        heartRate: Math.floor(Math.random() * 40) + 60,
        calories: Math.floor(Math.random() * 500) + 1500,
        distance: Math.random() * 5 + 3,
        sleepHours: Math.random() * 2 + 7,
      });
      Alert.alert('Success', 'Health data refreshed!');
    } else {
      Alert.alert('Error', 'Please connect to health services first');
    }
  };

  const writeHealthData = (type: string) => {
    if (isConnected) {
      Alert.alert(
        'Write Health Data',
        `Writing ${type} data to health store...`,
        [{ text: 'OK' }],
      );
    } else {
      Alert.alert('Error', 'Please connect to health services first');
    }
  };

  const getHealthSummary = () => {
    if (isConnected) {
      const summary = `
Today's Health Summary:
• Steps: ${healthData.steps.toLocaleString()}
• Heart Rate: ${healthData.heartRate} bpm
• Calories: ${healthData.calories.toLocaleString()}
• Distance: ${healthData.distance.toFixed(1)} km
• Sleep: ${healthData.sleepHours.toFixed(1)} hours
      `;
      Alert.alert('Health Summary', summary, [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Please connect to health services first');
    }
  };

  const healthMetrics = [
    {
      key: 'steps',
      title: 'Steps',
      value: healthData.steps.toLocaleString(),
      unit: 'steps',
      icon: '👣',
      color: '#FF6B6B',
    },
    {
      key: 'heartRate',
      title: 'Heart Rate',
      value: healthData.heartRate.toString(),
      unit: 'bpm',
      icon: '❤️',
      color: '#4ECDC4',
    },
    {
      key: 'calories',
      title: 'Calories',
      value: healthData.calories.toLocaleString(),
      unit: 'kcal',
      icon: '🔥',
      color: '#45B7D1',
    },
    {
      key: 'distance',
      title: 'Distance',
      value: healthData.distance.toFixed(1),
      unit: 'km',
      icon: '📍',
      color: '#96CEB4',
    },
    {
      key: 'sleep',
      title: 'Sleep',
      value: healthData.sleepHours.toFixed(1),
      unit: 'hours',
      icon: '😴',
      color: '#FFEAA7',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>❤️ Health Demo</Text>
          <Text style={styles.subtitle}>
            {Platform.OS === 'ios' ? 'HealthKit' : 'Google Fit'} Integration
          </Text>
        </View>

        {/* Connection Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Connection Status</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isConnected ? '#4CAF50' : '#F44336' },
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? 'Connected to Health Services' : 'Not Connected'}
            </Text>
          </View>
          {!isConnected && (
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => {
                requestPermissions().catch(console.error);
              }}
            >
              <Text style={styles.connectButtonText}>Connect to Health</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Health Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.metricsTitle}>📊 Health Metrics</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map(metric => (
              <View key={metric.key} style={styles.metricCard}>
                <Text style={styles.metricIcon}>{metric.icon}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={[styles.metricValue, { color: metric.color }]}>
                  {metric.value}
                </Text>
                <Text style={styles.metricUnit}>{metric.unit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>⚡ Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={refreshData}>
              <Text style={styles.actionButtonIcon}>🔄</Text>
              <Text style={styles.actionButtonText}>Refresh Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={getHealthSummary}
            >
              <Text style={styles.actionButtonIcon}>📋</Text>
              <Text style={styles.actionButtonText}>Get Summary</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => writeHealthData('Steps')}
            >
              <Text style={styles.actionButtonIcon}>✏️</Text>
              <Text style={styles.actionButtonText}>Write Steps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => writeHealthData('Weight')}
            >
              <Text style={styles.actionButtonIcon}>⚖️</Text>
              <Text style={styles.actionButtonText}>Write Weight</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Permissions Status */}
        <View style={styles.permissionsContainer}>
          <Text style={styles.permissionsTitle}>🔐 Permissions</Text>
          <View style={styles.permissionsList}>
            {Object.entries(permissions).map(([key, granted]) => (
              <View key={key} style={styles.permissionItem}>
                <Text style={styles.permissionName}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <View style={styles.permissionStatus}>
                  <Text
                    style={[
                      styles.permissionText,
                      { color: granted ? '#4CAF50' : '#F44336' },
                    ]}
                  >
                    {granted ? 'Granted' : 'Denied'}
                  </Text>
                  <Text style={styles.permissionIcon}>
                    {granted ? '✅' : '❌'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Health Features Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>🚀 Health Features</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>
                {Platform.OS === 'ios' ? 'HealthKit' : 'Google Fit'}
              </Text>
              <Text style={styles.featureItem}>• Read health data</Text>
              <Text style={styles.featureItem}>• Write health data</Text>
              <Text style={styles.featureItem}>• Request permissions</Text>
              <Text style={styles.featureItem}>• Real-time updates</Text>
              <Text style={styles.featureItem}>• Multiple data types</Text>
            </View>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>Data Types</Text>
              <Text style={styles.featureItem}>• Steps & Activity</Text>
              <Text style={styles.featureItem}>• Heart Rate</Text>
              <Text style={styles.featureItem}>• Calories burned</Text>
              <Text style={styles.featureItem}>• Distance traveled</Text>
              <Text style={styles.featureItem}>• Sleep analysis</Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>⚠️ Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This is a demo implementation using mock data. In a real app, you
            would integrate with actual health services like HealthKit (iOS) or
            Google Fit (Android) to read and write real health data.
          </Text>
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
  statusContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  metricsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricUnit: {
    fontSize: 12,
    color: '#999',
  },
  actionsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  permissionsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  permissionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  permissionsList: {
    gap: 10,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  permissionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  permissionIcon: {
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
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
  disclaimerContainer: {
    backgroundColor: '#fff3cd',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});

export default HealthScreen;
