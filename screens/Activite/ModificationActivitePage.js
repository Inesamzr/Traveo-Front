import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../Components/Header';
import Popup from '../../Components/Accueil/Popup';
import { getThemes } from '../../services/themeService';
import { editActivity } from '../../services/activityService';
import { getThemeById } from '../../services/themeService';

export default function ModificationActivitePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const activity = route.params?.activity || {};

  const [nom, setNom] = useState(activity.nomActivite || '');
    const [themes, setThemes] = useState([]);
    const [description, setDescription] = useState(activity.description || '');
    const [themeId, setThemeId] = useState(activity.themeId || 'Choisir...');
    const [dateDebut, setDateDebut] = useState(activity.dateDebut || '');
    const [dateFin, setDateFin] = useState(activity.dateFin || '');
    const [nombreDePlace, setNombreDePlace] = useState(activity.nbPlaces ? String(activity.nbPlaces) : ''); // Convertir en chaîne
    const [prix, setPrix] = useState(activity.prix ? String(activity.prix) : ''); // Convertir en chaîne
    const [tags, setTags] = useState(activity.tags || '');
    const [altitude, setAltitude] = useState(activity.latitude ? String(activity.latitude) : ''); // Convertir en chaîne
    const [longitude, setLongitude] = useState(activity.longitude ? String(activity.longitude) : ''); // Convertir en chaîne
    const [currentThemeLabel, setCurrentThemeLabel] = useState('');
    const [isThemeDropdownVisible, setThemeDropdownVisible] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchThemeAndThemes = async () => {
      try {
        // Charger le thème actuel
        const currentTheme = await getThemeById(activity.themeId);
        setThemeId(currentTheme.idTheme);
        setCurrentThemeLabel(currentTheme.label);
  
        // Charger tous les thèmes
        const allThemes = await getThemes();
        setThemes(allThemes);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les thèmes.');
      }
    };
    fetchThemeAndThemes();
  }, [activity.themeId]);

  const convertDateToISO = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return null; // Vérifiez si la date est valide
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  };



  const handleSave = async () => {
    if (!nom || !description || !themeId || !dateDebut || !dateFin || !nombreDePlace || !prix || !altitude || !longitude) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    const updatedActivity = {
      idActivite: activity.idActivite,
      nomActivite: nom,
      description,
      themeId, 
      dateDebut: convertDateToISO(dateDebut),
      dateFin: convertDateToISO(dateFin),
      nbPlaces: parseInt(nombreDePlace), 
      prix: parseFloat(prix), 
      latitude: parseFloat(altitude), 
      longitude: parseFloat(longitude), 
      tags: tags || '',
      image: activity.image || 'https://example.com/default-image.jpg',
      userId: activity.userId,
    };
  
    try {
      await editActivity(updatedActivity); // Assurez-vous que cette fonction est définie dans votre service API
      setPopupVisible(true); // Affiche le popup en cas de succès
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de modifier l\'activité.');
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#510D0A" />
        </TouchableOpacity>
        {/* Header */}
        <Header title="Modifier l'activité" />

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Nom*</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
          />

          <Text style={styles.label}>Description*</Text>
          <TextInput
            style={[styles.inputdesc, styles.textarea]}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Thème*</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setThemeDropdownVisible(!isThemeDropdownVisible)}
          >
            <Text style={styles.dropdownText}>{currentThemeLabel || 'Choisir...'}</Text>
            <Ionicons
              name={isThemeDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#510D0A"
            />
          </TouchableOpacity>
          {isThemeDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.idTheme}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setThemeId(theme.idTheme); // Définit l'ID du thème sélectionné
                    setCurrentThemeLabel(theme.label); // Définit le label sélectionné
                    setThemeDropdownVisible(false); // Ferme le menu déroulant
                  }}
                >
                  <Text style={styles.dropdownItemText}>{theme.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Dates de début et fin */}
        <View style={styles.rowContainer}>
          {/* Date de début */}
          <View style={styles.rowSection}>
            <Text style={styles.label}>Date Début</Text>
            <View style={styles.rowInputContainer}>
              <Ionicons name="calendar-outline" size={24} color="#510D0A" style={styles.dateIcon} />
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AA"
                value={dateDebut}
                onChangeText={setDateDebut}
              />
            </View>
          </View>
          {/* Date de fin */}
          <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Date Fin</Text>
            <View style={styles.rowInputContainer}>
              <Ionicons name="calendar-outline" size={24} color="#510D0A" style={styles.dateIcon} />
              <TextInput
                style={styles.rowInput}
                placeholder="JJ/MM/AA"
                value={dateFin}
                onChangeText={setDateFin}
              />
            </View>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowSection}>
            <Text style={styles.label}>Nombre de Place*</Text>
            <View style={styles.rowInputContainer}>
            <FontAwesome5 name="users" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
              style={styles.rowInput}
              placeholder="Nombre de places"
              value={nombreDePlace}
              onChangeText={setNombreDePlace}
              keyboardType="numeric"
            />
          </View>
          </View>
          <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Prix*</Text>
            <View style={styles.rowInputContainer}>
            <FontAwesome5 name="euro-sign" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
              style={styles.rowInput}
              placeholder="Prix"
              value={prix}
              onChangeText={setPrix}
              keyboardType="numeric"
            />
          </View>
        </View>
        </View>


        <View style={styles.rowContainer}>
          <View style={styles.rowSection}>
            <Text style={styles.label}>Latitude*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="locate-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
              style={styles.rowInput}
              placeholder="Latitude"
              value={altitude}
              onChangeText={setAltitude}
              keyboardType="numeric"
            />
          </View>
          </View>
          <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Longitude*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="compass-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
              style={styles.rowInput}
              placeholder="Longitude"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
            />
          </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tags*</Text>
          <TextInput
            style={styles.input}
            placeholder="Tags, séparés par des virgules"
            value={tags}
            onChangeText={setTags}
          />
        </View>


          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Popup */}
      <Popup
        visible={isPopupVisible}
        onClose={() => {
          setPopupVisible(false);
          navigation.goBack();
        }}
        message="Activité modifiée avec succès !"
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
