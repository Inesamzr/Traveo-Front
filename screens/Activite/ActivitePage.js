import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header';
import Activity from '../../Components/Activite/Activity';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { getAllActivities } from '../../services/activityService';
import { getCityFromCoordinates } from '../../services/Nominatim';
import { getThemes } from '../../services/themeService';

export default function ActivitePage() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adresse, setAdresse] = useState("");
  const [addresses, setAddresses] = useState({}); 
  const [themes, setThemes] = useState([]); 


  useEffect(() => {
    // Récupérer la ville basée sur les coordonnées
    const fetchAdressLoc = async () => {
      try {
        const responseAdresse = await getCityFromCoordinates(activity.latitude, activity.longitude);
        setAdresse(responseAdresse);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de récupérer l'adresse.");
      }
    };
  })

  const defaultRegion = {
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 6.0,
    longitudeDelta: 6.0,
  };
   // Récupérer les activités depuis l'API
   useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllActivities();
        setActivities(data);

        // Récupérer les adresses pour chaque activité
        const addressPromises = data.map(async (activity) => {
          const address = await getCityFromCoordinates(activity.latitude, activity.longitude);
          return { id: activity.idActivite, address };
        });

        // Récupérer tous les thèmes
        const themesData = await getThemes();
        const themesMap = themesData.reduce((acc, theme) => {
          acc[theme.idTheme] = theme; 
          return acc;
        }, {});
        setThemes(themesMap);

        const resolvedAddresses = await Promise.all(addressPromises);
        const addressMap = resolvedAddresses.reduce((acc, { id, address }) => {
          acc[id] = address;
          return acc;
        }, {});

        setAddresses(addressMap);
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger les activités.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = activities.filter((activity) =>
    activity.nomActivite.toLowerCase().includes(searchText.toLowerCase()) 
    //||activity.adresse.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#510D0A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header 
        title="Carte"
        
      />
      <TouchableOpacity 
        style={styles.iconList} 
        onPress={() => navigation.navigate('ActivityList', { filteredData, searchText })}
      >
        <Ionicons name="list-outline" size={24} color="#510D0A" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.iconadd} 
        onPress={() => navigation.navigate('CreerActivite')}
      >
        <Ionicons name="add" size={24} color="#510D0A" />
      </TouchableOpacity>



      {/* Carte */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={defaultRegion}
          showsUserLocation={true}
        >
          {filteredData.map((activity) => {
            const theme = themes[activity.themeId] || {};
            return (
              <Marker
                key={activity.idActivite}
                coordinate={{
                  latitude: activity.latitude,
                  longitude: activity.longitude,
                }}
                title={activity.nomActivite}
              >
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.activityTitle}>{activity.nomActivite}</Text>
                    <Text style={styles.activityDetails}>{activity.description}</Text>
                    <Text style={styles.activityDetails}>
                      <Ionicons name="location-outline" size={14} color="#BC4749" />{' '}
                      {addresses[activity.idActivite] || 'Adresse inconnue'}
                    </Text>
                    <Text style={styles.activityDetails}>
                      <Ionicons name="calendar-outline" size={14} color="#BC4749" />{' '}
                      {activity.dateDebut} / {activity.dateFin}
                    </Text>
                    <Text style={styles.activityDetails}>
                      <MaterialCommunityIcons
                        name={theme.image_default || 'help-circle-outline'}
                        size={16}
                        color="#BC4749"
                      />{' '}
                      {theme.label || 'Thème inconnu'}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>

      {/* Liste d'activités */}
      <View style={styles.activitiesContainer}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Activité, ville..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#510D0A" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.activitiesList}>
          {filteredData.map((activity) => (
            <TouchableOpacity key={activity.idActivite} onPress={() => navigation.navigate('ActivityDetails', { activity })}>
              <Activity  {...activity} />
            </TouchableOpacity>
          ))}
          {filteredData.length === 0 && (
            <Text style={styles.noActivitiesText}>Aucune activité trouvée</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconList:{
    position: 'absolute',
    top: 50, 
    right: 20, 
    zIndex: 3, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconadd:{
    position: 'absolute',
    top: 50, 
    left: 20, 
    zIndex: 3, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapContainer: {
    flex: 2,
  },
  activitiesContainer: {
    flex: 1.5, 
    backgroundColor: '#F2E8CF', 
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 20,
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
    paddingBottom: 60,
  },
  callout: {
    padding: 5,
    maxWidth: 200,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  activityDetails: {
    fontSize: 12,
    color: '#555',
  },
});
