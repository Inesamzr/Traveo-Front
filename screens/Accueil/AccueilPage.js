import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ThemesSection from '../../Components/Accueil/ThemesSection';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext'; 
import { useNavigation } from '@react-navigation/native';
import { getThemes } from '../../services/themeService';


export default function AccueilPage() {
  const { language } = useLanguage();
  const currentTexts = texts[language];
  const navigation = useNavigation();
  const [themes, setThemes] = useState([])

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const fetchedThemes = await getThemes(); // Récupération des thèmes depuis l'API
        setThemes(fetchedThemes);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les thèmes depuis le serveur.');
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

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
              <Text style={styles.welcomeText}>{currentTexts.accueilWelcome}</Text>
            </View>
          </View>

          {/* Section Bienvenue */}
          <View style={styles.textSection}>
            <View style={styles.sloganContainer}>
              <Text style={styles.sloganText}>
                {currentTexts.accueilSlogan}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {currentTexts.accueilDescription}
              </Text>
            </View>
          </View>

          {/* Accès rapide */}
          <View style={styles.shortcutsSection}>
            <Text style={styles.sectionTitle}>{currentTexts.shortcutsTitle}</Text>
            <View style={styles.shortcuts}>
              <TouchableOpacity style={styles.shortcutButton}>
                <FontAwesome5 name="plus-circle" size={30} color="#510D0A" onPress={() => navigation.navigate('CreerActivite')}/>
                <Text style={styles.shortcutText}>{currentTexts.createActivity}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shortcutButton} >
                <Ionicons name="calendar-outline" size={30} color="#510D0A"/>
                <Text style={styles.shortcutText}>{currentTexts.myReservations}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('Activite')}>
                <Ionicons name="search-outline" size={30} color="#510D0A" />
                <Text style={styles.shortcutText}>{currentTexts.explore}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Thèmes populaires */}
          <ThemesSection themes={themes} />
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
