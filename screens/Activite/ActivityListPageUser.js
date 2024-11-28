import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Activity from '../../Components/Activite/Activity';
import Header from '../../Components/Header';

export default function ActivityListPageUser({ route, navigation }) {
  const {activities} = route.params || {};
  const [allActivities, setAllActivities] = useState(activities);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(false);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#510D0A" />
        <Text style={styles.loadingText}>Chargement des activités...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Icône de retour */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>

      <Header title="Activités" />

      <TouchableOpacity
        style={styles.iconadd}
        onPress={() => navigation.navigate('CreerActivite')}
      >
        <Ionicons name="add" size={26} color="#510D0A" />
      </TouchableOpacity>

      {/* Liste des activités */}
      <ScrollView contentContainerStyle={styles.activitiesList}>
        {filteredActivities.map((activity) => (
          <TouchableOpacity
            key={activity.idActivite}
            onPress={() => navigation.navigate('ActivityDetails', { activity })}
          >
            <Activity {...activity} />
          </TouchableOpacity>
        ))}
        {filteredActivities.length === 0 && (
          <Text style={styles.noActivitiesText}>Aucune activité trouvée</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E8CF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#510D0A',
  },
  iconadd: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 3,
    padding: 8,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
  },
  filterButton: {
    padding: 5,
  },
  activitiesList: {
    padding: 20,
  },
  noActivitiesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 80,
  },
});
