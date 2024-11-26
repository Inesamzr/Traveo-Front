import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ThemesSection from "../../Components/Accueil/ThemesSection";
import { useNavigation } from '@react-navigation/native';
import { getThemes } from '../../services/themeService'; // Import du service
import Header from '../../Components/Header';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


export default function ThemesPage() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des thèmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title='Thèmes activité'/>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <ScrollView style={styles.themeSection}>
        <ThemesSection themes={themes} />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTheme')}
      >
        <Text style={styles.addButtonText}>Ajouter une activité</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#510D0A',
  },
  themeSection: {
    marginTop: 80,
  },
  addButton: {
    backgroundColor: '#386641',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
