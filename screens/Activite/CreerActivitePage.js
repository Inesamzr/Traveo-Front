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
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header';
import Popup from '../../Components/Accueil/Popup';

export default function CreerActivitePage() {
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState('');
    const [nombreDePlace, setNombreDePlace] = useState('');
    const [prix, setPrix] = useState('');
    const [heureDepart, setHeureDepart] = useState('');
    const [heureArrive, setHeureArrive] = useState('');
    const [altitude, setAltitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isThemeDropdownVisible, setThemeDropdownVisible] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false); 

    const themes = ['Cuisine', 'Créativité', 'Spiritualité','Aventure'];


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
            {theme || 'Choisir...'}
          </Text>
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

        {/* Date */}
        <Text style={styles.label}>Date*</Text>
        <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={24} color="#510D0A" style={styles.dateIcon} />
        <TextInput
            style={styles.dateInput}
            placeholder="JJ/MM/AA"
            value={date}
            onChangeText={setDate}
        />
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



        {/* Heure de Départ et Heure d'Arrivée */}
        <View style={styles.rowContainer}>
        {/* Heure de Départ */}
        <View style={styles.rowSection}>
            <Text style={styles.label}>Heure Départ*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="time-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="6:00"
                value={heureDepart}
                onChangeText={setHeureDepart}
            />
            </View>
        </View>
        {/* Heure d'Arrivée */}
        <View style={[styles.rowSection, styles.rowSectionMargin]}>
            <Text style={styles.label}>Heure Retour*</Text>
            <View style={styles.rowInputContainer}>
            <Ionicons name="time-outline" size={24} color="#510D0A" style={styles.rowIcon} />
            <TextInput
                style={styles.rowInput}
                placeholder="12:00"
                value={heureArrive}
                onChangeText={setHeureArrive}
            />
            </View>
        </View>
        </View>


        {/* Altitude et Longitude */}
        <View style={styles.rowContainer}>
        {/* Altitude */}
        <View style={styles.rowSection}>
            <Text style={styles.label}>Altitude*</Text>
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
      
    <TouchableOpacity
            style={styles.createButton}
            onPress={() => setPopupVisible(true)}
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
    padding: 15,
    borderRadius: 60,
    alignItems: 'center',
    marginBottom:80,
  },
  createButtonText: {
    color: '#510D0A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
