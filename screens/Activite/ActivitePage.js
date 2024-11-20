import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Map from '../../Components/Activite/Map';
import Activity from '../../Components/Activite/Activity';
import Header from '../../Components/Header';


export default function ActivitePage() {
  const dummyData = [
    {
      id: 1,
      nom: 'Vélo en groupe',
      description: 'Un joli tour de vélo groupé en plein air.',
      adresse: 'Nîmes',
      date: '24/06/2024 06:00-12:00',
      theme: 'Aventure',
      prix: '3€',
      participants: '2/6',
    },
    {
      id: 2,
      nom: 'Cours de cuisine',
      description: 'Apprenez à cuisiner des plats délicieux.',
      adresse: 'Marseille',
      date: '01/07/2024 14:00-18:00',
      theme: 'Cuisine',
      prix: '10€',
      participants: '5/10',
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
      {/* Carte */}
      <View style={styles.mapContainer}>
        <Map 
          commercants={dummyData} 
          region={{
            latitude: 46.603354,
            longitude: 1.888334,
            latitudeDelta: 5.0,
            longitudeDelta: 5.0,
          }} 
        />
      </View>

      {/* Liste d'activités */}
      <View style={styles.activitiesContainer}>
        <ScrollView contentContainerStyle={styles.activitiesList}>
          {dummyData.map((activity) => (
            <Activity key={activity.id} {...activity} />
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
  mapContainer: {
    flex: 2, 
  },
  activitiesContainer: {
    flex: 1, 
    backgroundColor: 'rgba(81, 13, 10, 0.5)', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activitiesList: {
    paddingBottom: 60,
  },
});


