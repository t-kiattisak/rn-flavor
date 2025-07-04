import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';

const { width: _width, height: _height } = Dimensions.get('window');

const MapsScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'hybrid'>(
    'standard',
  );
  const [showTraffic, setShowTraffic] = useState(false);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 13.7563, longitude: 100.5018 },
      title: 'Bangkok',
      description: 'Capital of Thailand',
    },
    {
      id: 2,
      coordinate: { latitude: 13.7244, longitude: 100.493 },
      title: 'Siam Square',
      description: 'Shopping district',
    },
    {
      id: 3,
      coordinate: { latitude: 13.7308, longitude: 100.5216 },
      title: 'Chatuchak Market',
      description: 'Weekend market',
    },
  ]);

  const region = {
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const polylineCoordinates = [
    { latitude: 13.7563, longitude: 100.5018 },
    { latitude: 13.7244, longitude: 100.493 },
    { latitude: 13.7308, longitude: 100.5216 },
    { latitude: 13.7563, longitude: 100.5018 },
  ];

  const toggleMapType = () => {
    setMapType(prev => {
      switch (prev) {
        case 'standard':
          return 'satellite';
        case 'satellite':
          return 'hybrid';
        case 'hybrid':
          return 'standard';
        default:
          return 'standard';
      }
    });
  };

  const toggleTraffic = () => {
    setShowTraffic(prev => !prev);
  };

  const _animateToRegion = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    mapRef.current?.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      1000,
    );
  };

  const addMarker = (coordinate: { latitude: number; longitude: number }) => {
    const newMarker = {
      id: markers.length + 1,
      coordinate,
      title: `Marker ${markers.length + 1}`,
      description: 'Custom marker',
    };
    setMarkers(prev => [...prev, newMarker]);
  };

  const resetView = () => {
    mapRef.current?.animateToRegion(region, 1000);
  };

  const zoomIn = () => {
    mapRef.current?.getMapBoundaries().then(boundaries => {
      const newRegion = {
        latitude:
          (boundaries.northEast.latitude + boundaries.southWest.latitude) / 2,
        longitude:
          (boundaries.northEast.longitude + boundaries.southWest.longitude) / 2,
        latitudeDelta:
          (boundaries.northEast.latitude - boundaries.southWest.latitude) / 2,
        longitudeDelta:
          (boundaries.northEast.longitude - boundaries.southWest.longitude) / 2,
      };
      mapRef.current?.animateToRegion(newRegion, 500);
    });
  };

  const zoomOut = () => {
    mapRef.current?.getMapBoundaries().then(boundaries => {
      const newRegion = {
        latitude:
          (boundaries.northEast.latitude + boundaries.southWest.latitude) / 2,
        longitude:
          (boundaries.northEast.longitude + boundaries.southWest.longitude) / 2,
        latitudeDelta:
          (boundaries.northEast.latitude - boundaries.southWest.latitude) * 2,
        longitudeDelta:
          (boundaries.northEast.longitude - boundaries.southWest.longitude) * 2,
      };
      mapRef.current?.animateToRegion(newRegion, 500);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ Maps Demo</Text>
        <Text style={styles.subtitle}>React Native Maps</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          mapType={mapType}
          showsTraffic={showTraffic}
          showsBuildings={true}
          showsIndoors={true}
          showsMyLocationButton={true}
          onLongPress={event => {
            addMarker(event.nativeEvent.coordinate);
          }}
        >
          {/* Markers */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                Alert.alert(marker.title, marker.description);
              }}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <Text style={styles.calloutDescription}>
                    {marker.description}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}

          {/* Circle around Bangkok */}
          <Circle
            center={region}
            radius={5000}
            strokeWidth={2}
            strokeColor="#007AFF"
            fillColor="rgba(0, 122, 255, 0.1)"
          />

          {/* Polyline connecting markers */}
          <Polyline
            coordinates={polylineCoordinates}
            strokeWidth={3}
            strokeColor="#FF6B6B"
            lineDashPattern={[5, 5]}
          />
        </MapView>

        {/* Map Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleMapType}
          >
            <Text style={styles.controlButtonText}>
              {(() => {
                let emoji = '';
                if (mapType === 'standard') {
                  emoji = '🌍';
                } else if (mapType === 'satellite') {
                  emoji = '🛰️';
                } else {
                  emoji = '🔄';
                }
                return emoji;
              })()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleTraffic}
          >
            <Text style={styles.controlButtonText}>
              {showTraffic ? '🚦' : '🚙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={resetView}>
            <Text style={styles.controlButtonText}>🏠</Text>
          </TouchableOpacity>
        </View>

        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Panel */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>🗺️ Maps Features</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <Text style={styles.featureItemTitle}>Map Type</Text>
            <Text style={styles.featureItemValue}>{mapType}</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureItemTitle}>Traffic</Text>
            <Text style={styles.featureItemValue}>
              {showTraffic ? 'On' : 'Off'}
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureItemTitle}>Markers</Text>
            <Text style={styles.featureItemValue}>{markers.length}</Text>
          </View>
        </View>
        <Text style={styles.infoDescription}>
          🔹 Long press to add markers{'\n'}
          🔹 Tap markers for info{'\n'}
          🔹 Use controls to change view{'\n'}
          🔹 Zoom in/out with + / - buttons
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  mapContainer: {
    flex: 2,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 20,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 5,
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  calloutContainer: {
    padding: 10,
    minWidth: 120,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666',
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
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  featureItemTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  featureItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default MapsScreen;
