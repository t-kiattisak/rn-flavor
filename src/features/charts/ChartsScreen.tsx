import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const _chartWidth = width - 40;

const ChartsScreen = () => {
  const [selectedChart, setSelectedChart] = useState('line');

  // Sample data
  const _lineData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 8 },
  ];

  const _barData = [
    { x: 1, y: 13000 },
    { x: 2, y: 16500 },
    { x: 3, y: 14250 },
    { x: 4, y: 19000 },
  ];

  const _pieData = [
    { value: 35, label: 'iOS' },
    { value: 40, label: 'Android' },
    { value: 20, label: 'Web' },
    { value: 5, label: 'Desktop' },
  ];

  const _scatterData = [
    { x: 1, y: 2, amount: 30 },
    { x: 2, y: 3, amount: 40 },
    { x: 3, y: 5, amount: 25 },
    { x: 4, y: 4, amount: 60 },
    { x: 5, y: 7, amount: 35 },
    { x: 6, y: 6, amount: 45 },
    { x: 7, y: 8, amount: 50 },
  ];

  const renderSimpleChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>📈 Simple Chart Demo</Text>
      <View style={styles.chartWrapper}>
        <Text style={styles.chartPlaceholder}>
          Victory Native charts will be rendered here
        </Text>
        <Text style={styles.chartNote}>
          Chart library temporarily disabled to fix runtime errors
        </Text>
      </View>
    </View>
  );

  const renderCurrentChart = () => {
    return renderSimpleChart();
  };

  const chartButtons = [
    { key: 'line', label: 'Line', icon: '📈' },
    { key: 'area', label: 'Area', icon: '📊' },
    { key: 'bar', label: 'Bar', icon: '📊' },
    { key: 'pie', label: 'Pie', icon: '🥧' },
    { key: 'scatter', label: 'Scatter', icon: '💫' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Charts & Data Visualization</Text>
        <Text style={styles.subtitle}>
          Interactive charts with Victory Native
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.buttonContainer}
        contentContainerStyle={styles.buttonContent}
      >
        {chartButtons.map(button => (
          <TouchableOpacity
            key={button.key}
            style={[
              styles.chartButton,
              selectedChart === button.key && styles.chartButtonActive,
            ]}
            onPress={() => setSelectedChart(button.key)}
          >
            <Text style={styles.buttonIcon}>{button.icon}</Text>
            <Text
              style={[
                styles.buttonText,
                selectedChart === button.key && styles.buttonTextActive,
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {renderCurrentChart()}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>📚 Features</Text>
          <Text style={styles.infoText}>
            • Interactive charts with smooth animations{'\n'}• Real-time data
            updates{'\n'}• Multiple chart types (Line, Area, Bar, Pie, Scatter)
            {'\n'}• Customizable colors and styles{'\n'}• Touch gestures and
            zoom support{'\n'}• Responsive design for all screen sizes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  buttonContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  chartButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  chartButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  chartPlaceholder: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartNote: {
    fontSize: 12,
    color: '#adb5bd',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});

export default ChartsScreen;
