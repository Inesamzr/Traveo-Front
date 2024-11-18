import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const Map = ({ commercants, region, onMarkerPress }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        customMapStyle={mapStyle}
      >
        {commercants.map((commercant) => (
          <Marker
            key={commercant.id}
            coordinate={{ latitude: commercant.latitude, longitude: commercant.longitude }}
            title={commercant.nom}
            description={commercant.adresse}
            onPress={() => onMarkerPress(commercant)}
          >
            <Ionicons name="pin-sharp" size={33} color="#BD4F6C" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const mapStyle = [
  {
    "featureType": "water",
    "stylers": [{ "color": "#B8CBDC" }],
  },
  {
    "featureType": "landscape",
    "stylers": [{ "color": "#A2A2A2" }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
