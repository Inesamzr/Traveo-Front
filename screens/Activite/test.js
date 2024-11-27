import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header';
import Popup from '../../Components/Accueil/Popup';
import { getThemes } from '../../services/themeService';
import { createActivity } from '../../services/activityService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreerActivitePage() {
  const navigation = useNavigation();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [themeId, setThemeId] = useState(null);
  const [themes, setThemes] = useState([]);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [nombreDePlace, setNombreDePlace] = useState('');
  const [prix, setPrix] = useState('');
  const [altitude, setAltitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [tags, setTags] = useState('');
  const [isThemeDropdownVisible, setThemeDropdownVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Récupérer les thèmes depuis l'API
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await getThemes();
        setThemes(response);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les thèmes.');
      }
    };
    fetchThemes();
  }, []);

  // Convertir une date au format dd/MM/yyyy en ISO-8601 (yyyy-MM-dd)
  const convertDateToISO = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  };

  // Gestion de la soumission du formulaire
  const handleCreateActivity = async () => {
    if (!nom || !description || !themeId || !dateDebut || !dateFin || !nombreDePlace || !prix || !altitude || !longitude) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Convertir les dates en format ISO-8601
    const dateDebutISO = convertDateToISO(dateDebut);
    const dateFinISO = convertDateToISO(dateFin);
    if (!dateDebutISO || !dateFinISO) {
      Alert.alert('Erreur', 'Les dates entrées sont invalides. Utilisez le format JJ/MM/AAAA.');
      return;
    }

    const userId = await AsyncStorage.getItem('userId'); // Récupère le userId
    if (!userId) {
      Alert.alert('Erreur', 'Utilisateur non identifié.');
      return;
    }

    const newActivity = {
      nomActivite: nom,
      description,
      themeId,
      dateDebut: dateDebutISO,
      dateFin: dateFinISO,
      nbPlaces: parseInt(nombreDePlace),
      prix: parseFloat(prix),
      latitude: parseFloat(altitude),
      longitude: parseFloat(longitude),
      tags: tags || '',
      image: 'https://example.com/default-image.jpg',
      userId: parseInt(userId),
    };

    try {
      await createActivity(newActivity);
      setPopupVisible(true); // Affiche le popup en cas de succès
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer l\'activité.');
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#510D0A" />
        </TouchableOpacity>
        <Header title="Créer une activité" />

        <View style={styles.form}>
          <Text style={styles.label}>Nom*</Text>
          <TextInput
            style={styles.input}
            placeholder="Balade en vélo"
            value={nom}
            onChangeText={setNom}
          />

          <Text style={styles.label}>Description*</Text>
          <TextInput
            style={[styles.inputdesc, styles.textarea]}
            placeholder="Nous allons nous balader en groupe..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Thème*</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setThemeDropdownVisible(!isThemeDropdownVisible)}
          >
            <Text style={styles.dropdownText}>
              {themeId ? themes.find(theme => theme.idTheme === themeId)?.label || 'Choisir...' : 'Choisir...'}
            </Text>

            <Ionicons
              name={isThemeDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#510D0A"
            />
          </TouchableOpacity>
          {isThemeDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {themes.map((item) => (
                <TouchableOpacity
                  key={item.idTheme}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setThemeId(item.idTheme);
                    setThemeDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Dates */}
          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Date Début*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AAAA"
                value={dateDebut}
                onChangeText={setDateDebut}
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Date Fin*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AAAA"
                value={dateFin}
                onChangeText={setDateFin}
              />
            </View>
          </View>

          {/* Nombre de Place et Prix */}
          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Nombre de Place*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="3"
                value={nombreDePlace}
                onChangeText={setNombreDePlace}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Prix*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="50"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Altitude et Longitude */}
          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Latitude*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="Latitude"
                value={altitude}
                onChangeText={setAltitude}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Longitude*</Text>
              <TextInput
                style={styles.rowInput}
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="nature,randonnee,montagne"
            value={tags}
            onChangeText={setTags}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreateActivity}>
            <Text style={styles.createButtonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Popup
        visible={isPopupVisible}
        onClose={() => {
          setPopupVisible(false);
          navigation.goBack();
        }}
        message="Votre activité a été créée avec succès !"
      />
    </>
  );
}

const styles = StyleSheet.create({
  // Vos styles ici
});
