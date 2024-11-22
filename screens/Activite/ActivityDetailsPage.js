import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
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
      <ScrollView>
        {/* Image avec l'icône de retour */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/activity-image-placeholder.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="#510D0A" />
          </TouchableOpacity>
        </View>

        {/* Conteneur avec le titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activity.nom}</Text>
        </View>

        {/* Détails de l'activité */}
        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              <Ionicons name="person-circle-outline" size={16} color="#FFF" /> Ines.A10
            </Text>
            <Text style={styles.infoText}>
              <Ionicons name="people-outline" size={16} color="#FFF" /> {activity.participants}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  imageContainer: {
    height: '350',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex:2,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
  },
  titleContainer: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    backgroundColor: '#510D0A',
    paddingTop:80,
    paddingBottom:20,
    paddingHorizontal:15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#F2E8CF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  infoRow: {
    marginTop:60,
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
