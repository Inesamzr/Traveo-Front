import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Activity from '../../Components/Activite/Activity';
import Header from '../../Components/Header';
import { getAllActivities } from '../../services/activityService';

export default function ActivityListPage({ route, navigation }) {
  const { activities: initialActivities = [], searchText: initialSearchText = '' } = route.params || {};
  const [searchText, setSearchText] = useState(initialSearchText);
  const [allActivities, setAllActivities] = useState(initialActivities);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les activités si elles ne sont pas fournies
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getAllActivities();
        setAllActivities(data);
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger les activités.");
      } finally {
        setLoading(false);
      }
    };

    if (initialActivities.length === 0) {
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, []);

  // Filtrer les activités en fonction de la recherche
  useEffect(() => {
    const filterActivities = () => {
      const filtered = allActivities.filter(activity =>
        activity.nomActivite.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredActivities(filtered);
    };

    if (allActivities.length > 0) {
      filterActivities();
    }
  }, [searchText, allActivities]);

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

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Modifier la recherche..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#510D0A" />
        </TouchableOpacity>
      </View>

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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 100,
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
  },
  noActivitiesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 20,
  },
});
