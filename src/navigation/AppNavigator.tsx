import React from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import Features
import DashboardScreen from '@/features/dashboard/DashboardScreen';
import AnimationScreen from '@/features/animation/AnimationScreen';
import UIComponentsScreen from '@/features/ui-components/UIComponentsScreen';
import CameraScreen from '@/features/camera/CameraScreen';
import MapsScreen from '@/features/maps/MapsScreen';
import ChartsScreen from '@/features/charts/ChartsScreen';
import StorageScreen from '@/features/storage/StorageScreen';
import MediaScreen from '@/features/media/MediaScreen';
import HealthScreen from '@/features/health/HealthScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Move tabBarIcon outside of TabNavigator
const tabBarIcon =
  (route: RouteProp<ParamListBase, string>) =>
  ({ color, size }: { color: string; size: number }) => {
    let iconName = '';

    switch (route.name) {
      case 'Dashboard':
        iconName = 'dashboard';
        break;
      case 'Animation':
        iconName = 'animation';
        break;
      case 'UI':
        iconName = 'widgets';
        break;
      case 'Camera':
        iconName = 'camera-alt';
        break;
      case 'Maps':
        iconName = 'map';
        break;
    }

    return <Icon name={iconName} size={size} color={color} />;
  };

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: tabBarIcon(route),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Animation" component={AnimationScreen} />
      <Tab.Screen name="UI" component={UIComponentsScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Maps" component={MapsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Charts"
        component={ChartsScreen}
        options={{ title: '📊 Charts & Graphs' }}
      />
      <Stack.Screen
        name="Storage"
        component={StorageScreen}
        options={{ title: '💾 Storage & MMKV' }}
      />
      <Stack.Screen
        name="Media"
        component={MediaScreen}
        options={{ title: '🎬 Media Player' }}
      />
      <Stack.Screen
        name="Health"
        component={HealthScreen}
        options={{ title: '🏃‍♂️ Health & Fitness' }}
      />
    </Stack.Navigator>
  );
}
