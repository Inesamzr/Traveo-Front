import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { getCityFromCoordinates } from '../../services/Nominatim';
import { getThemeById } from '../../services/themeService';

const Activity = ({ ...activity }) => {

  const [adresse, setAdresse] = useState("");
  const [theme, setTheme] = useState("");


  useEffect(() => {
    const fetchAdressLoc = async () => {

      const responseAdresse = await getCityFromCoordinates(activity.latitude, activity.longitude)
      setAdresse(responseAdresse)

     }
     const fetchTheme = async () => {
      const responseTheme = await getThemeById(activity.themeId)
      setTheme(responseTheme)
     }
     fetchAdressLoc()
     fetchTheme()
   }, [])

  return (
      <View style={styles.activityCard}>
        <MaterialCommunityIcons name="image-outline" size={40} color="#BC4749" />
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{activity.nomActivite}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          <Text style={styles.activityDetails}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color="#BC4749" /> {adresse}
          </Text>
          <Text style={styles.activityDetails}>
            <MaterialCommunityIcons name="calendar-outline" size={14} color="#BC4749" /> {activity.dateDebut} / {activity.dateFin}
          </Text>
          <Text style={styles.activityDetails}>
            <MaterialCommunityIcons name={theme.image_default} size={16} color="#BC4749" /> {theme.label}
          </Text>
        </View>
        <View style={styles.activityRight}>
          <Text style={styles.activityPrice}>{activity.prix}€</Text>
          <Text style={styles.activityParticipants}>x / {activity.nbPlaces}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FADCD9',
    borderRadius:30,
    marginBottom: 10,
    padding: 15,
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
    color: '#510D0A',
  },
  activityDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  activityDetails: {
    fontSize: 12,
    color: '#510D0A',
    marginBottom: 5,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  activityParticipants: {
    fontSize: 12,
    color: '#510D0A',
  },
});

export default Activity;