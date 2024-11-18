import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ThemesSection from '../../Components/Accueil/ThemesSection'; 

export default function AccueilPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/Traveo_logo.png')} 
          style={styles.logo}
        />
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Bienvenue sur Traveo</Text>
        <Text style={styles.slogan}>Explorez, créez et partagez des expériences inoubliables.</Text>
        <Text style={styles.description}>Trouvez des séjours personnalisés pour vivre des moments inoubliables, où aventure et sérénité se rencontrent.</Text>
      </View>

      <View style={styles.shortcutsSection}>
        <Text style={styles.sectionTitle}>Accès rapide</Text>
        <View style={styles.shortcuts}>
          <TouchableOpacity style={styles.shortcutButton}>
            <FontAwesome5 name="plus-circle" size={30} color="#510D0A" />
            <Text style={styles.shortcutText}>Créer une activité</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutButton}>
            <Ionicons name="calendar-outline" size={30} color="#510D0A" />
            <Text style={styles.shortcutText}>Mes réservations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutButton}>
            <Ionicons name="search-outline" size={30} color="#510D0A" />
            <Text style={styles.shortcutText}>Explorer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Activités en vedette</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {/* Activité vitrine */}
          <View style={styles.activityCard}>
            <Image source={require('../../assets/Traveo_logo.png')} style={styles.activityImage} />
            <Text style={styles.activityTitle}>Randonnée en montagne</Text>
            <Text style={styles.activityDate}>25 novembre 2024</Text>
          </View>
          <View style={styles.activityCard}>
            <Image source={require('../../assets/Traveo_logo.png')} style={styles.activityImage} />
            <Text style={styles.activityTitle}>Atelier de peinture</Text>
            <Text style={styles.activityDate}>1 décembre 2024</Text>
          </View>
          <View style={styles.activityCard}>
            <Image source={require('../../assets/Traveo_logo.png')} style={styles.activityImage} />
            <Text style={styles.activityTitle}>Yoga en pleine nature</Text>
            <Text style={styles.activityDate}>10 décembre 2024</Text>
          </View>
        </ScrollView>
      </View>

      <ThemesSection /> 

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Aide/FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>CGU</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop:20,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#111',
    fontWeight: 'bold',
  },
  slogan: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  shortcutsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#510D0A',
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  shortcutText: {
    marginTop: 5,
    fontSize: 12,
    color: '#510D0A',
    textAlign: 'center',
  },
  featuredSection: {
    padding: 20,
  },
  featuredScroll: {
    marginTop: 10,
  },
  activityCard: {
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    width: 150,
  },
  activityImage: {
    width: '100%',
    height: 100,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    color: '#111',
  },
  activityDate: {
    fontSize: 12,
    padding: 5,
    color: '#555',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerText: {
    fontSize: 14,
    color: '#510D0A',
    marginBottom:80,
  },
});
