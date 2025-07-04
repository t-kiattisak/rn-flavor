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
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: _width } = Dimensions.get('window');

const AnimationScreen = () => {
  const [animationStatus, setAnimationStatus] = useState('Ready');

  // Spring Animation Values
  const springValue = useSharedValue(0);
  const rotationValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  // Animated Styles
  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(springValue.value, [0, 1], [0, 100]),
        },
      ],
    };
  });

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotationValue.value}deg`,
        },
      ],
    };
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
    };
  });

  const dragAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  // Animation Functions
  const startSpringAnimation = () => {
    setAnimationStatus('Spring Animation Running...');
    springValue.value = withSpring(
      springValue.value === 0 ? 1 : 0,
      {
        damping: 15,
        stiffness: 150,
        mass: 1,
      },
      finished => {
        if (finished) {
          runOnJS(setAnimationStatus)('Spring Animation Complete!');
        }
      },
    );
  };

  const startRotationAnimation = () => {
    setAnimationStatus('Rotation Animation Running...');
    rotationValue.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false,
    );
  };

  const stopRotationAnimation = () => {
    setAnimationStatus('Rotation Stopped');
    rotationValue.value = withTiming(0, { duration: 500 });
  };

  const startScaleAnimation = () => {
    setAnimationStatus('Scale Animation Running...');
    scaleValue.value = withSequence(
      withTiming(1.5, { duration: 500 }),
      withTiming(0.5, { duration: 500 }),
      withTiming(1, { duration: 500 }),
    );
  };

  const bounceAnimation = () => {
    setAnimationStatus('Bounce Animation Running...');
    scaleValue.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 }),
      ),
      3,
      false,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎨 Animation Demo</Text>
          <Text style={styles.subtitle}>Reanimated 3 Showcase</Text>
          <Text style={styles.status}>{animationStatus}</Text>
        </View>

        {/* Spring Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Spring Animation</Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, springAnimatedStyle]}>
              <Text style={styles.boxText}>Spring</Text>
            </Animated.View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={startSpringAnimation}
          >
            <Text style={styles.buttonText}>Start Spring</Text>
          </TouchableOpacity>
        </View>

        {/* Rotation Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Rotation Animation</Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, rotationAnimatedStyle]}>
              <Text style={styles.boxText}>Rotate</Text>
            </Animated.View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={startRotationAnimation}
            >
              <Text style={styles.buttonText}>Start Rotation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.stopButton]}
              onPress={stopRotationAnimation}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scale Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Scale Animation</Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, scaleAnimatedStyle]}>
              <Text style={styles.boxText}>Scale</Text>
            </Animated.View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={startScaleAnimation}
            >
              <Text style={styles.buttonText}>Scale Sequence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={bounceAnimation}>
              <Text style={styles.buttonText}>Bounce</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Drag Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Drag Animation</Text>
          <Text style={styles.demoDescription}>Drag the box around!</Text>
          <View style={styles.animationContainer}>
            <GestureDetector gesture={panGesture}>
              <Animated.View
                style={[styles.animatedBox, dragAnimatedStyle, styles.dragBox]}
              >
                <Text style={styles.boxText}>Drag Me!</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🚀 Features Demonstrated</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• React Native Reanimated 3</Text>
            <Text style={styles.featureItem}>
              • Spring animations with damping
            </Text>
            <Text style={styles.featureItem}>• Timing animations</Text>
            <Text style={styles.featureItem}>
              • Repeat & Sequence animations
            </Text>
            <Text style={styles.featureItem}>
              • Gesture Handler integration
            </Text>
            <Text style={styles.featureItem}>• Interpolation</Text>
            <Text style={styles.featureItem}>• runOnJS for callbacks</Text>
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
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  demoSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  demoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  animationContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  animatedBox: {
    width: 80,
    height: 80,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dragBox: {
    backgroundColor: '#FF6B6B',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default AnimationScreen;
