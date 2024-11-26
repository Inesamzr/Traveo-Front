import React, { useState } from 'react';
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

export default function ModificationActivitePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const activity = route.params?.activity || {};

  const [nom, setNom] = useState(activity.nom || '');
  const [description, setDescription] = useState(activity.description || '');
  const [theme, setTheme] = useState(activity.theme || '');
  const [date, setDate] = useState(activity.date || '');
  const [nombreDePlace, setNombreDePlace] = useState(activity.nombreDePlace || '');
  const [prix, setPrix] = useState(activity.prix || '');
  const [heureDepart, setHeureDepart] = useState(activity.heureDepart || '');
  const [heureArrive, setHeureArrive] = useState(activity.heureArrive || '');
  const [altitude, setAltitude] = useState(activity.altitude || '');
  const [longitude, setLongitude] = useState(activity.longitude || '');
  const [isThemeDropdownVisible, setThemeDropdownVisible] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const themes = ['Cuisine', 'Créativité', 'Spiritualité', 'Aventure'];

  const handleSave = () => {
    // Ajouter la logique pour sauvegarder les modifications ici
    setPopupVisible(true);
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
            <Text style={styles.dropdownText}>{theme || 'Choisir...'}</Text>
            <Ionicons
              name={isThemeDropdownVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#510D0A"
            />
          </TouchableOpacity>
          {isThemeDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {themes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setTheme(item);
                    setThemeDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Date*</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Nombre de Place*</Text>
              <TextInput
                style={styles.rowInput}
                value={nombreDePlace}
                onChangeText={setNombreDePlace}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Prix*</Text>
              <TextInput
                style={styles.rowInput}
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Heure Départ*</Text>
              <TextInput
                style={styles.rowInput}
                value={heureDepart}
                onChangeText={setHeureDepart}
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Heure Arrivée*</Text>
              <TextInput
                style={styles.rowInput}
                value={heureArrive}
                onChangeText={setHeureArrive}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.rowSection}>
              <Text style={styles.label}>Altitude*</Text>
              <TextInput
                style={styles.rowInput}
                value={altitude}
                onChangeText={setAltitude}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.rowSection, styles.rowSectionMargin]}>
              <Text style={styles.label}>Longitude*</Text>
              <TextInput
                style={styles.rowInput}
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
              />
            </View>
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
