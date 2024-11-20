import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const themeIcons = {
  Aventure: <MaterialCommunityIcons name="hiking" size={16} color="#BC4749" />,
  Cuisine: <FontAwesome5 name="utensils" size={14} color="#BC4749" />,
  Spiritualité: <MaterialCommunityIcons name="meditation" size={16} color="#BC4749" />,
  Créativité: <MaterialCommunityIcons name="brush" size={16} color="#BC4749" />,
};

const Activity = ({ nom, description, adresse, date, theme, prix, participants }) => {
  return (
    <View style={styles.activityCard}>
      <MaterialCommunityIcons name="image-outline" size={40} color="#BC4749" />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{nom}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
        <Text style={styles.activityDetails}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#BC4749" /> {adresse}
        </Text>
        <Text style={styles.activityDetails}>
          <MaterialCommunityIcons name="calendar-outline" size={14} color="#BC4749" /> {date}
        </Text>
        <Text style={styles.activityDetails}>
          {themeIcons[theme] || <MaterialCommunityIcons name="help-circle-outline" size={16} color="#510D0A" />} {theme}
        </Text>
      </View>
      <View style={styles.activityRight}>
        <Text style={styles.activityPrice}>{prix}</Text>
        <Text style={styles.activityParticipants}>{participants}</Text>
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
