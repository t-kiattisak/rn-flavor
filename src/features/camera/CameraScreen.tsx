import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'not-determined'
  >('not-determined');
  const [isActive, setIsActive] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d =>
    cameraType === 'back' ? d.position === 'back' : d.position === 'front',
  );

  // Frame processor for real-time processing
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // Here you can add real-time frame processing
    // For example, barcode scanning, face detection, etc.
    console.log('Processing frame:', frame.width, 'x', frame.height);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    setCameraPermission(permission);

    if (permission === 'denied') {
      Alert.alert(
        'Camera Permission Denied',
        'Camera permission is required to use this feature. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Settings',
            onPress: () => {
              Linking.openSettings().catch(console.error);
            },
          },
        ],
      );
    }
  }, []);

  const checkPermission = useCallback(async () => {
    const permission = Camera.getCameraPermissionStatus();
    // Map different permission statuses to our expected types
    if (permission === 'granted') {
      setCameraPermission('granted');
    } else if (permission === 'denied' || permission === 'restricted') {
      setCameraPermission('denied');
    } else {
      setCameraPermission('not-determined');
    }

    if (permission === 'not-determined') {
      await requestCameraPermission();
    } else if (permission === 'denied' || permission === 'restricted') {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera permission in settings to use this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Settings',
            onPress: () => {
              Linking.openSettings().catch(console.error);
            },
          },
        ],
      );
    }
  }, [requestCameraPermission]);

  const takePicture = useCallback(async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          flash: flashMode,
          enableShutterSound: true,
        });

        Alert.alert('Photo Taken!', `Photo saved to: ${photo.path}`, [
          { text: 'OK' },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
        console.error('Photo capture error:', error);
      }
    }
  }, [flashMode]);

  const toggleRecording = useCallback(async () => {
    if (camera.current) {
      try {
        if (isRecording) {
          camera.current.stopRecording();
          setIsRecording(false);
        } else {
          setIsRecording(true);
          camera.current.startRecording({
            flash: flashMode,
            onRecordingFinished: video => {
              Alert.alert('Video Recorded!', `Video saved to: ${video.path}`, [
                { text: 'OK' },
              ]);
              setIsRecording(false);
            },
            onRecordingError: error => {
              Alert.alert('Error', 'Failed to record video');
              console.error('Video recording error:', error);
              setIsRecording(false);
            },
          });
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to start/stop recording');
        console.error('Recording error:', error);
        setIsRecording(false);
      }
    }
  }, [isRecording, flashMode]);

  const toggleFlash = useCallback(() => {
    setFlashMode(prev => (prev === 'off' ? 'on' : 'off'));
  }, []);

  const toggleCameraType = useCallback(() => {
    setCameraType(prev => (prev === 'back' ? 'front' : 'back'));
  }, []);

  React.useEffect(() => {
    checkPermission().catch(console.error);
  }, [checkPermission]);

  React.useEffect(() => {
    setIsActive(cameraPermission === 'granted');
  }, [cameraPermission]);

  if (cameraPermission === 'not-determined') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>📷 Camera Demo</Text>
          <Text style={styles.subtitle}>Checking camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cameraPermission === 'denied') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>📷 Camera Demo</Text>
          <Text style={styles.subtitle}>Camera permission denied</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              requestCameraPermission().catch(console.error);
            }}
          >
            <Text style={styles.buttonText}>Request Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>📷 Camera Demo</Text>
          <Text style={styles.subtitle}>No camera device available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={isActive}
          photo={true}
          video={true}
          frameProcessor={frameProcessor}
        />

        {/* Camera Controls Overlay */}
        <View style={styles.controlsOverlay}>
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              <Text style={styles.controlButtonText}>
                {flashMode === 'off' ? '⚡' : '⚡️'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCameraType}
            >
              <Text style={styles.controlButtonText}>🔄</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => {
                takePicture().catch(console.error);
              }}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.recordButton,
                isRecording && styles.recordButtonActive,
              ]}
              onPress={() => {
                toggleRecording().catch(console.error);
              }}
            >
              <Text style={styles.recordButtonText}>
                {isRecording ? '⏹️' : '🎥'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Info Panel */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>📷 Vision Camera Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• High-performance camera API</Text>
          <Text style={styles.featureItem}>• Real-time frame processing</Text>
          <Text style={styles.featureItem}>• Photo & video capture</Text>
          <Text style={styles.featureItem}>• Flash & camera switching</Text>
          <Text style={styles.featureItem}>• Face detection (extensible)</Text>
          <Text style={styles.featureItem}>
            • Barcode scanning (extensible)
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Camera: {cameraType}</Text>
          <Text style={styles.statusText}>Flash: {flashMode}</Text>
          <Text style={styles.statusText}>
            Recording: {isRecording ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 2,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
  },
  captureButtonInner: {
    backgroundColor: '#000',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  recordButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
  },
  recordButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  infoPanel: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;
