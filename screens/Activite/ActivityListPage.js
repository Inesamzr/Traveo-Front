import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Activity from '../../Components/Activite/Activity';
import Header from '../../Components/Header';

export default function ActivityListPage({ route, navigation }) {
  const { filteredData, searchText: initialSearchText } = route.params;
  const [searchText, setSearchText] = useState(initialSearchText);

  return (
    <View style={styles.container}>
      {/* Icône de retour */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>

      <Header title='Activités'/>

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
        {filteredData.map((activity) => (
          <Activity key={activity.id} {...activity} />
        ))}
        {filteredData.length === 0 && (
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
  backIcon: {
    position: 'absolute',
    top: 45,
    left: 15,
    zIndex: 1,
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
