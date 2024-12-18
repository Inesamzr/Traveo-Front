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
    if (!day || !month || !year) return null; // Vérifiez si la date est valide
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  };

  // Gestion de la soumission du formulaire
  const handleCreateActivity = async () => {
    if (!nom || !description || !themeId || !dateDebut || !dateFin || !nombreDePlace || !prix || !altitude || !longitude) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Convertir la date en format ISO-8601
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
      setPopupVisible(true); 
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
      {/* Header */}
      <Header title ='Créer une activité'/>

      {/* Form */}
      <View style={styles.form}>
        {/* Nom */}
        <Text style={styles.label}>Nom*</Text>
        <TextInput
          style={styles.input}
          placeholder="Balade en vélo"
          value={nom}
          onChangeText={setNom}
        />

        {/* Description */}
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={[styles.inputdesc, styles.textarea]}
          placeholder="Nous allons nous balader en groupe..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Thème */}
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
                setThemeId(item.idTheme); // Utilisez l'ID du thème
                setThemeDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          </View>
        )}

        {/* Date */}
        <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Date Début*</Text>
              <View style={styles.rowInputContainer}>
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AAAA"
                value={dateDebut}
                onChangeText={setDateDebut}
              />
            </View>
            </View>

            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Date Fin*</Text>
              <View style={styles.rowInputContainer}>
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AAAA"
                value={dateFin}
                onChangeText={setDateFin}
              />
            </View>
          </View>
          </View>


        {/* Nombre de Place et Prix */}
        <View style={styles.rowContainer}>
        {/* Nombre de Place */}
        <View style={styles.rowSection}>
            <Text style={styles.label}>Nombre de Place*</Text>
            <View style={styles.rowInputContainer}>
            <FontAwesome5 name="users" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="3"
                value={nombreDePlace}
                onChangeText={setNombreDePlace}
                keyboardType="numeric"
            />
            </View>
        </View>
        {/* Prix */}
        <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Prix*</Text>
            <View style={styles.rowInputContainer}>
            <FontAwesome5 name="euro-sign" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="50"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
            />
            </View>
        </View>
        </View>


        {/* Altitude et Longitude */}
        <View style={styles.rowContainer}>
        {/* Altitude */}
        <View style={styles.rowSection}>
            <Text style={styles.label}>Latitude*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="locate-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="1234678"
                value={altitude}
                onChangeText={setAltitude}
                keyboardType="numeric"
            />
            </View>
        </View>
        {/* Longitude */}
        <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Longitude*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="compass-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="1234678"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
            />
            </View>
        </View>
        </View>


        {/* Image */}
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imageUpload}>
          <Text style={styles.imageUploadText}>Glisser et déposer ou charger l'image</Text>
          <Ionicons name="cloud-upload-outline" size={24} color="#510D0A" />
        </TouchableOpacity>
        {/* Tags */}
        <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="nature,randonnee,montagne"
            value={tags}
            onChangeText={setTags}
          />
      
    <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateActivity}
          >
            <Text style={styles.createButtonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Popup */}
      <Popup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        navigation={navigation}
        targetScreen="Activite"
        message="Votre activité a été créée avec succès !"
      />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
  },
  form: {
    padding: 20,
    marginTop:80
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#510D0A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 60,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  inputdesc: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  textarea: {
    height: 80,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 60,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 14,
    color: '#510D0A',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#510D0A',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageUploadText: {
    fontSize: 14,
    color: '#510D0A',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 60,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  dateIcon: {
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowSection: {
    flex: 1,
  },
  rowSectionMargin: {
    marginLeft: 10, 
  },
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5AFAF',
    borderRadius: 60,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 5, 
  },
  rowInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  rowIcon: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#510D0A',
    marginBottom: 5, 
  },
  createButton: {
    backgroundColor: '#DBBBBA',
    paddingVertical: 15, 
    paddingHorizontal: 80, 
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'center', 
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  
  createButtonText: {
    color: '#510D0A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
