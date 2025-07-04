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
import Svg, {
  Circle,
  Defs,
  Ellipse,
  Line,
  LinearGradient,
  Path,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText,
  TSpan,
} from 'react-native-svg';
import {
  Canvas,
  Fill,
  Group,
  Circle as SkiaCircle,
  Rect as SkiaRect,
} from '@shopify/react-native-skia';

const { width } = Dimensions.get('window');

const UIComponentsScreen = () => {
  const [selectedDemo, setSelectedDemo] = useState('svg');

  const renderSVGDemo = () => (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>🎨 SVG Graphics Demo</Text>

      {/* Basic Shapes */}
      <View style={styles.svgSection}>
        <Text style={styles.sectionTitle}>Basic Shapes</Text>
        <Svg height="120" width={width - 60}>
          <Rect x="10" y="10" width="50" height="50" fill="#FF6B6B" rx="5" />
          <Circle cx="100" cy="35" r="25" fill="#4ECDC4" />
          <Ellipse cx="170" cy="35" rx="30" ry="20" fill="#45B7D1" />
          <Line
            x1="220"
            y1="10"
            x2="270"
            y2="60"
            stroke="#96CEB4"
            strokeWidth="3"
          />
          <Polygon points="290,10 310,50 270,50" fill="#FFEAA7" />
        </Svg>
      </View>

      {/* Gradient Demo */}
      <View style={styles.svgSection}>
        <Text style={styles.sectionTitle}>Gradients</Text>
        <Svg height="100" width={width - 60}>
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="1" />
              <Stop offset="100%" stopColor="#4ECDC4" stopOpacity="1" />
            </LinearGradient>
            <RadialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#45B7D1" stopOpacity="1" />
              <Stop offset="100%" stopColor="#96CEB4" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect
            x="10"
            y="10"
            width="120"
            height="60"
            fill="url(#grad1)"
            rx="10"
          />
          <Rect
            x="150"
            y="10"
            width="120"
            height="60"
            fill="url(#grad2)"
            rx="10"
          />
        </Svg>
      </View>

      {/* Path Demo */}
      <View style={styles.svgSection}>
        <Text style={styles.sectionTitle}>Complex Paths</Text>
        <Svg height="100" width={width - 60}>
          <Path
            d="M10,50 Q50,10 90,50 T170,50"
            stroke="#FF6B6B"
            strokeWidth="3"
            fill="none"
          />
          <Path
            d="M200,20 L220,20 L230,40 L220,60 L200,60 L190,40 Z"
            fill="#4ECDC4"
          />
        </Svg>
      </View>

      {/* Text Demo */}
      <View style={styles.svgSection}>
        <Text style={styles.sectionTitle}>SVG Text</Text>
        <Svg height="80" width={width - 60}>
          <SvgText x="10" y="30" fontSize="20" fill="#333" fontWeight="bold">
            SVG Text Demo
          </SvgText>
          <SvgText x="10" y="60" fontSize="14" fill="#666">
            <TSpan>Multi-line </TSpan>
            <TSpan fill="#FF6B6B" fontWeight="bold">
              colored{' '}
            </TSpan>
            <TSpan>text support</TSpan>
          </SvgText>
        </Svg>
      </View>
    </View>
  );

  const renderSkiaDemo = () => (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>⚡ Skia Graphics Demo</Text>

      {/* Basic Skia Canvas */}
      <View style={styles.skiaSection}>
        <Text style={styles.sectionTitle}>Skia Canvas</Text>
        <Canvas style={styles.skiaCanvas}>
          <Fill color="#f0f0f0" />
          <Group>
            <SkiaCircle cx={60} cy={60} r={40} color="#FF6B6B" />
            <SkiaRect x={120} y={20} width={80} height={80} color="#4ECDC4" />
            <SkiaCircle cx={260} cy={60} r={35} color="#45B7D1" />
          </Group>
        </Canvas>
      </View>

      {/* Animated Skia Demo */}
      <View style={styles.skiaSection}>
        <Text style={styles.sectionTitle}>Skia with Effects</Text>
        <Canvas style={styles.skiaCanvas}>
          <Fill color="#1a1a1a" />
          <Group>
            <SkiaCircle cx={80} cy={60} r={30} color="#FF6B6B" opacity={0.8} />
            <SkiaCircle cx={120} cy={60} r={30} color="#4ECDC4" opacity={0.8} />
            <SkiaCircle cx={160} cy={60} r={30} color="#45B7D1" opacity={0.8} />
          </Group>
        </Canvas>
      </View>

      {/* Info about Skia */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🚀 Skia Features</Text>
        <Text style={styles.infoText}>
          • High-performance 2D graphics{'\n'}• GPU acceleration{'\n'}• Complex
          animations{'\n'}• Custom drawing operations{'\n'}• Declarative API
        </Text>
      </View>
    </View>
  );

  const renderComponentsDemo = () => (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>🧩 Custom Components</Text>

      {/* Custom Button */}
      <View style={styles.componentSection}>
        <Text style={styles.sectionTitle}>Custom Button</Text>
        <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>Press Me!</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Card */}
      <View style={styles.componentSection}>
        <Text style={styles.sectionTitle}>Custom Card</Text>
        <View style={styles.customCard}>
          <Text style={styles.cardTitle}>Feature Card</Text>
          <Text style={styles.cardDescription}>
            This is a custom card component with shadow and rounded corners.
          </Text>
        </View>
      </View>

      {/* Custom Progress Bar */}
      <View style={styles.componentSection}>
        <Text style={styles.sectionTitle}>Custom Progress Bar</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%' }]} />
          </View>
          <Text style={styles.progressText}>70%</Text>
        </View>
      </View>

      {/* Custom Tag */}
      <View style={styles.componentSection}>
        <Text style={styles.sectionTitle}>Custom Tags</Text>
        <View style={styles.tagContainer}>
          <View style={[styles.tag, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.tagText}>React Native</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.tagText}>TypeScript</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: '#45B7D1' }]}>
            <Text style={styles.tagText}>Mobile</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧩 UI Components</Text>
          <Text style={styles.subtitle}>SVG, Skia & Custom Components</Text>
        </View>

        {/* Demo Selector */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              selectedDemo === 'svg' && styles.selectedButton,
            ]}
            onPress={() => setSelectedDemo('svg')}
          >
            <Text
              style={[
                styles.selectorText,
                selectedDemo === 'svg' && styles.selectedText,
              ]}
            >
              SVG
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              selectedDemo === 'skia' && styles.selectedButton,
            ]}
            onPress={() => setSelectedDemo('skia')}
          >
            <Text
              style={[
                styles.selectorText,
                selectedDemo === 'skia' && styles.selectedText,
              ]}
            >
              Skia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              selectedDemo === 'components' && styles.selectedButton,
            ]}
            onPress={() => setSelectedDemo('components')}
          >
            <Text
              style={[
                styles.selectorText,
                selectedDemo === 'components' && styles.selectedText,
              ]}
            >
              Components
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo Content */}
        {selectedDemo === 'svg' && renderSVGDemo()}
        {selectedDemo === 'skia' && renderSkiaDemo()}
        {selectedDemo === 'components' && renderComponentsDemo()}
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
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  selectorText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  demoContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  svgSection: {
    marginBottom: 20,
  },
  skiaSection: {
    marginBottom: 20,
  },
  componentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  skiaCanvas: {
    height: 120,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  customButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  customCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
  },
  progressText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UIComponentsScreen;
