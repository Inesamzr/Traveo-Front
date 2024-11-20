import React from 'react';
import { View, ScrollView, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Activity from '../../Components/Activite/Activity';
import Header from '../../Components/Header';

export default function ActivityListPage({ route, navigation }) {
  const { filteredData } = route.params;

  return (
    <View style={styles.container}>
      {/* Header avec le titre "Liste des activités" */}
      <Header 
        title="Activités" 
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        }
      />

      {/* Liste des activités */}
      <ScrollView contentContainerStyle={styles.activitiesList}>
        {filteredData.length > 0 ? (
          filteredData.map((activity) => (
            <Activity key={activity.id} {...activity} />
          ))
        ) : (
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
  activitiesList: {
    padding: 20,
    marginTop:80,
  },
  noActivitiesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#510D0A',
    marginTop: 20,
  },
});
