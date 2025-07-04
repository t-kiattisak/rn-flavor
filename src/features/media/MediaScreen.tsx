import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  MediaType,
  PhotoQuality,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Sound from 'react-native-sound';

const { width } = Dimensions.get('window');

const MediaScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFiles] = useState([
    { id: 1, name: 'Sample Sound 1', duration: '00:30' },
    { id: 2, name: 'Sample Sound 2', duration: '01:15' },
    { id: 3, name: 'Sample Sound 3', duration: '00:45' },
  ]);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const soundRef = useRef<Sound | null>(null);

  // Initialize Sound
  useEffect(() => {
    Sound.setCategory('Playback');

    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  // Image Picker Functions
  const pickImageFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 600,
    };

    launchImageLibrary(options, response => {
      if (response.assets?.[0]) {
        setSelectedImage(response.assets[0].uri ?? null);
      }
    });
  };

  const takePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as PhotoQuality,
      maxWidth: 800,
      maxHeight: 600,
    };

    launchCamera(options, response => {
      if (response.assets?.[0]) {
        setSelectedImage(response.assets[0].uri ?? null);
      }
    });
  };

  const pickVideoFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'video' as MediaType,
      quality: 0.8 as PhotoQuality,
      videoQuality: 'medium',
    };

    launchImageLibrary(options, response => {
      if (response.assets?.[0]) {
        Alert.alert('Video Selected', `Video URI: ${response.assets[0].uri}`, [
          { text: 'OK' },
        ]);
      }
    });
  };

  const recordVideo = () => {
    const options: CameraOptions = {
      mediaType: 'video' as MediaType,
      quality: 0.8 as PhotoQuality,
      videoQuality: 'medium',
      durationLimit: 30,
    };

    launchCamera(options, response => {
      if (response.assets?.[0]) {
        Alert.alert('Video Recorded', `Video URI: ${response.assets[0].uri}`, [
          { text: 'OK' },
        ]);
      }
    });
  };

  // Audio Functions
  const playSound = (trackId: number) => {
    try {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.release();
      }

      // In a real app, you would load actual audio files
      // For demo purposes, we'll simulate playing
      setCurrentTrack(trackId);
      setIsPlaying(true);

      // Simulate audio duration
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentTrack(null);
      }, 3000);

      Alert.alert('Audio Player', `Playing track ${trackId}...`, [
        { text: 'OK' },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to play audio');
      console.error('Audio play error:', error);
    }
  };

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎵 Media Demo</Text>
          <Text style={styles.subtitle}>Image, Video & Audio</Text>
        </View>

        {/* Image Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📸 Image Picker</Text>
          <Text style={styles.sectionDescription}>
            Select or capture images using the device camera
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImageFromGallery}
            >
              <Text style={styles.buttonText}>📁 Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>📷 Camera</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <TouchableOpacity style={styles.clearButton} onPress={clearImage}>
                <Text style={styles.clearButtonText}>Clear Image</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Video Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🎬 Video Picker</Text>
          <Text style={styles.sectionDescription}>
            Select or record videos using the device camera
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={pickVideoFromGallery}
            >
              <Text style={styles.buttonText}>📁 Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={recordVideo}>
              <Text style={styles.buttonText}>🎥 Record</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.videoInfo}>
            <Text style={styles.videoInfoText}>
              📹 Video files will be handled by the system video player
            </Text>
          </View>
        </View>

        {/* Audio Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🎵 Audio Player</Text>
          <Text style={styles.sectionDescription}>
            Play audio files using React Native Sound
          </Text>

          <View style={styles.audioList}>
            {audioFiles.map(audio => (
              <View key={audio.id} style={styles.audioItem}>
                <View style={styles.audioInfo}>
                  <Text style={styles.audioTitle}>{audio.name}</Text>
                  <Text style={styles.audioDuration}>{audio.duration}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    currentTrack === audio.id &&
                      isPlaying &&
                      styles.playButtonActive,
                  ]}
                  onPress={() => {
                    if (currentTrack === audio.id && isPlaying) {
                      stopSound();
                    } else {
                      playSound(audio.id);
                    }
                  }}
                >
                  <Text style={styles.playButtonText}>
                    {currentTrack === audio.id && isPlaying ? '⏸️' : '▶️'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {isPlaying && (
            <View style={styles.playingStatus}>
              <Text style={styles.playingStatusText}>
                🎵 Playing Track {currentTrack}...
              </Text>
              <TouchableOpacity style={styles.stopButton} onPress={stopSound}>
                <Text style={styles.stopButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Media Features Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>🚀 Media Features</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>Image & Video</Text>
              <Text style={styles.featureItem}>• Image picker library</Text>
              <Text style={styles.featureItem}>• Camera integration</Text>
              <Text style={styles.featureItem}>• Gallery access</Text>
              <Text style={styles.featureItem}>• Image compression</Text>
              <Text style={styles.featureItem}>• Video recording</Text>
            </View>
            <View style={styles.featureColumn}>
              <Text style={styles.featureColumnTitle}>Audio</Text>
              <Text style={styles.featureItem}>• React Native Sound</Text>
              <Text style={styles.featureItem}>• Audio playback</Text>
              <Text style={styles.featureItem}>• Multiple formats</Text>
              <Text style={styles.featureItem}>• Background audio</Text>
              <Text style={styles.featureItem}>• Audio controls</Text>
            </View>
          </View>
        </View>

        {/* Media Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>📊 Media Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Images</Text>
              <Text style={styles.statValue}>{selectedImage ? '1' : '0'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Audio Tracks</Text>
              <Text style={styles.statValue}>{audioFiles.length}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Playing</Text>
              <Text style={styles.statValue}>{isPlaying ? '✅' : '❌'}</Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  selectedImage: {
    width: width - 80,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  videoInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  videoInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  audioList: {
    marginBottom: 15,
  },
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  audioDuration: {
    fontSize: 12,
    color: '#666',
  },
  playButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  playButtonText: {
    fontSize: 20,
  },
  playingStatus: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  playingStatusText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  statsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MediaScreen;
