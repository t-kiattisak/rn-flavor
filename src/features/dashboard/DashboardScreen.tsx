import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onPress,
  color,
}) => (
  <TouchableOpacity
    style={[styles.card, { borderLeftColor: color }]}
    onPress={onPress}
  >
    <View style={styles.cardContent}>
      <Icon name={icon} size={24} color={color} style={styles.cardIcon} />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  const navigation = useNavigation();

  const features = [
    {
      title: '📊 Charts & Analytics',
      description: 'ECharts, Chart Kit, SVG Charts demos',
      icon: 'bar-chart',
      screen: 'Charts',
      color: '#FF6B6B',
    },
    {
      title: '💾 Storage & MMKV',
      description: 'AsyncStorage, MMKV, EncryptedStorage',
      icon: 'storage',
      screen: 'Storage',
      color: '#4ECDC4',
    },
    {
      title: '🎬 Media Player',
      description: 'Video player, Audio, Lottie animations',
      icon: 'play-circle-filled',
      screen: 'Media',
      color: '#45B7D1',
    },
    {
      title: '🏃‍♂️ Health & Fitness',
      description: 'Google Fit, Health data integration',
      icon: 'fitness-center',
      screen: 'Health',
      color: '#96CEB4',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🚀 React Native 0.80.0</Text>
          <Text style={styles.headerSubtitle}>Feature Showcase</Text>
        </View>

        {/* Environment Info */}
        <View style={styles.envContainer}>
          <Text style={styles.envTitle}>Environment Info</Text>
          <Text style={styles.envInfo}>
            📱 Environment: {Config.ENV ?? 'development'}
          </Text>
          <Text style={styles.envInfo}>
            🌐 API URL: {Config.API_URL ?? 'Not configured'}
          </Text>
          <Text style={styles.envInfo}>
            📦 Version: {Config.ANDROID_VERSION_NAME ?? '1.0.0'}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>80+</Text>
            <Text style={styles.statLabel}>Libraries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Features</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>TypeScript</Text>
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>🎯 Explore Features</Text>

          {features.map(feature => (
            <FeatureCard
              key={feature.screen}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              onPress={() => navigation.navigate(feature.screen as never)}
            />
          ))}
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>⚡ Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity style={styles.quickAccessItem}>
              <Icon name="camera-alt" size={24} color="#007AFF" />
              <Text style={styles.quickAccessText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <Icon name="map" size={24} color="#007AFF" />
              <Text style={styles.quickAccessText}>Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <Icon name="animation" size={24} color="#007AFF" />
              <Text style={styles.quickAccessText}>Animations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessItem}>
              <Icon name="widgets" size={24} color="#007AFF" />
              <Text style={styles.quickAccessText}>UI Kit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  envContainer: {
    margin: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  envTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  envInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  featuresContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  quickAccessContainer: {
    margin: 20,
    marginTop: 0,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickAccessText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontWeight: '500',
  },
});
