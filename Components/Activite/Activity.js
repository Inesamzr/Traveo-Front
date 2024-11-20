import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Activity({ data }) {
  return (
    <View style={styles.activityCard}>
      <MaterialCommunityIcons name="image-outline" size={40} color="#510D0A" />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{data.nom}</Text>
        <Text style={styles.activityDetails}>
        <MaterialCommunityIcons name="map-marker-outline" size={14} color="#510D0A" /> {data.adresse}</Text>
        <Text style={styles.activityDetails}>
        <Ionicons name="calendar" size={12} color="#510D0A" /> {data.date}</Text>
        <Text style={styles.activityDetails}>
         {data.theme}
        </Text>
      </View>
      <View style={styles.activityRight}>
        <Text style={styles.activityPrice}>{data.prix}</Text>
        <Text style={styles.activityParticipants}>{data.participants}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
