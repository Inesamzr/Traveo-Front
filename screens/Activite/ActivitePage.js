import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Components/Header';
import Map from '../../Components/Activite/Map';

export default function ActivitePage() {
  const dummyData = [
    {
      id: 1,
      latitude: 48.8566,
      longitude: 2.3522,
      nom: 'Commerçant Paris',
      adresse: 'Adresse Paris',
    },
    {
      id: 2,
      latitude: 45.764,
      longitude: 4.8357,
      nom: 'Commerçant Lyon',
      adresse: 'Adresse Lyon',
    },
  ];

  const defaultRegion = {
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0,
  };

  return (
    <View style={styles.container}>
      <Header title="Carte" />
      <View style={styles.mapContainer}>
        <Map 
          commercants={dummyData} 
          region={defaultRegion} 
          onMarkerPress={(commercant) => {
            // Action à effectuer lors du clic sur un marker
            alert(`Vous avez cliqué sur : ${commercant.nom}`);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  mapContainer: {
    flex: 1,
  },
});
