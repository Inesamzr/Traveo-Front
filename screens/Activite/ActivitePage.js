import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../Components/Header';
import Map from '../../Components/Activite/Map';
import Activity from '../../Components/Activite/Activity';
import { Ionicons } from '@expo/vector-icons';

export default function ActivitePage() {
  const dummyData = [
    {
      id: 1,
      latitude: 48.8566,
      longitude: 2.3522,
      nom: 'Vélo en groupe',
      adresse: 'Nîmes',
      date: '24/06/2024 06:00-12:00',
      theme: 'Aventure',
      prix: '3€',
      participants: '2/6',
    },
    {
      id: 2,
      latitude: 45.764,
      longitude: 4.8357,
      nom: 'Vélo en groupe',
      adresse: 'Nîmes',
      date: '24/06/2024 06:00-12:00',
      theme: 'Aventure',
      prix: '3€',
      participants: '2/6',
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
      {/* Carte en arrière-plan */}
      <Map 
        commercants={dummyData} 
        region={defaultRegion} 
        onMarkerPress={(commercant) => {
          alert(`Vous avez cliqué sur : ${commercant.nom}`);
        }}
      />

      {/* Contenu au-dessus de la carte */}
      <View style={styles.overlay}>
        <Header title="Carte" />
        
        {/* Search Container en bas */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Adresse"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#510D0A" />
          </TouchableOpacity>
        </View>

        {/* Liste des activités */}
        <ScrollView contentContainerStyle={styles.activitiesList}>
          {dummyData.map((item) => (
            <Activity key={item.id} data={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  activitiesList: {
    padding: 20,
    paddingBottom: 70,
  },
});
