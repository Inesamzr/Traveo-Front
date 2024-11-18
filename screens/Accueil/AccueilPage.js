import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ThemesSection from '../../Components/Accueil/ThemesSection';

export default function AccueilPage() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground 
        source={require('../../assets/Image_fond.png')} 
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('../../assets/Traveo_logo.png')} 
              style={styles.logo}
            />
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Bienvenue sur Traveo</Text>
            </View>
          </View>

          {/* Section Bienvenue */}
          <View style={styles.textSection}>
            <View style={styles.sloganContainer}>
              <Text style={styles.sloganText}>
                Explorez, créez et partagez des expériences inoubliables.
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Trouvez des séjours personnalisés pour vivre des moments inoubliables, où aventure et sérénité se rencontrent.
              </Text>
            </View>
          </View>

          {/* Autres sections */}
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

          <ThemesSection />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  welcomeSection: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#386641',
    fontWeight: 'bold',
    marginTop: 20,
  },
  textSection: {
    position: 'relative',
    height: 150,
  },
  sloganContainer: {
    position: 'absolute',
    top: 0,
    left: -40,
    backgroundColor: '#CDD993',
    borderRadius: 15,
    paddingRight: 20,
    paddingLeft: 50,
    paddingVertical: 10,
  },
  sloganText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 0,
    right: -40,
    backgroundColor: '#DBBBBA',
    borderRadius: 15,
    paddingRight: 50,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'italic',
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
});
