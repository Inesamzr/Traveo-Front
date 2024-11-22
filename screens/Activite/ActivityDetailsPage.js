import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const themeIcons = {
  Aventure: <MaterialCommunityIcons name="hiking" size={16} color="#BC4749" />,
  Cuisine: <FontAwesome5 name="utensils" size={14} color="#BC4749" />,
  Spiritualité: <MaterialCommunityIcons name="meditation" size={16} color="#BC4749" />,
  Créativité: <MaterialCommunityIcons name="brush" size={16} color="#BC4749" />,
};

export default function ActivityDetailsPage({ route, navigation }) {
  const { activity } = route.params;

  return (
    <View style={styles.container}>
      {/* Image avec l'icône de retour */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/activity-image-placeholder.png')} // Remplacez par une vraie image si disponible
          style={styles.image}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Détails de l'activité */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{activity.nom}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Ionicons name="person-circle-outline" size={16} color="#510D0A" /> Ines.A10
          </Text>
          <Text style={styles.infoText}>
            <Ionicons name="people-outline" size={16} color="#510D0A" /> {activity.participants}
          </Text>
          <Text style={styles.infoText}>
            {themeIcons[activity.theme]} {activity.theme}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionContent}>{activity.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lieu de RDV</Text>
          <Text style={styles.sectionContent}>{activity.adresse}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#F2E8CF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#510D0A',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#510D0A',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
  },
});
