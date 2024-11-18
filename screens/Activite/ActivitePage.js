import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Header from '../../Components/Header';
import Map from '../../Components/Activite/Map';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <MaterialCommunityIcons name="image-outline" size={40} color="#510D0A" />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.nom}</Text>
        <Text style={styles.activityDetails}>{item.adresse}</Text>
        <Text style={styles.activityDetails}>{item.date}</Text>
        <Text style={styles.activityDetails}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#510D0A" /> {item.theme}
        </Text>
      </View>
      <View style={styles.activityRight}>
        <Text style={styles.activityPrice}>{item.prix}</Text>
        <Text style={styles.activityParticipants}>{item.participants}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Carte" />
      <View style={styles.mapContainer}>
        <Map 
          commercants={dummyData} 
          region={defaultRegion} 
          onMarkerPress={(commercant) => {
            alert(`Vous avez cliqué sur : ${commercant.nom}`);
          }}
        />
      </View>
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
      <FlatList
        data={dummyData}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        style={styles.activitiesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  mapContainer: {
    flex: 1.5,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    flex: 2,
    marginHorizontal: 20,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#DDEBC8',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activityInfo: {
    flex: 1,
    marginLeft: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDetails: {
    fontSize: 12,
    color: '#555',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  activityParticipants: {
    fontSize: 12,
    color: '#555',
  },
});
