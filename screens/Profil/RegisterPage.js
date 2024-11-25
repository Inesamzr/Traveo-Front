import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text } from 'react-native';
import ProfilHeader from '../../Components/Profil/ProfilHeader';
import ProfilField from '../../Components/Profil/ProfilField';
import ProfilButton from '../../Components/Profil/ProfilButton';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';

export default function ProfilePage({ navigation }) {
  const { language } = useLanguage();
  const currentTexts = texts[language];

  // États pour les champs du profil
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [isModified, setIsModified] = useState(false); // État pour vérifier si des modifications ont été faites

  const handleSave = () => {
    console.log('Enregistrement des modifications :', { firstName, lastName, email });
    setIsModified(false); // Réinitialise l'état après enregistrement
  };

  const handleFieldChange = (field, value) => {
    // Met à jour l'état correspondant et active le bouton "Enregistrer"
    if (field === 'firstName') setFirstName(value);
    if (field === 'lastName') setLastName(value);
    if (field === 'email') setEmail(value);
    setIsModified(true);
  };

  const handleLanguageChange = () => {
    navigation.navigate('LanguageSelection');
  };

  const handleActivities = () => {
    navigation.navigate('Activities'); // Remplacez par votre écran d'activités
  };

  const handleReservations = () => {
    navigation.navigate('Reservations'); // Remplacez par votre écran de réservations
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfilHeader name={`${firstName} ${lastName}`} onEdit={() => console.log('Edit profile clicked')} />

      <View style={styles.fields}>
        {/* Champs éditables */}
        <ProfilField
          label={currentTexts.firstNamePlaceholder}
          value={firstName}
          icon="person"
          editable
          onChangeText={(value) => handleFieldChange('firstName', value)}
        />
        <ProfilField
          label={currentTexts.lastNamePlaceholder}
          value={lastName}
          icon="person"
          editable
          onChangeText={(value) => handleFieldChange('lastName', value)}
        />
        <ProfilField
          label="Email"
          value={email}
          icon="mail"
          editable
          onChangeText={(value) => handleFieldChange('email', value)}
        />
      </View>

      <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange}>
        <Text style={styles.languageText}>{currentTexts.flag}</Text>
      </TouchableOpacity>

      <ProfilButton label="Mes activités" onPress={handleActivities} />
      <ProfilButton label="Mes réservations" onPress={handleReservations} />

      {/* Bouton Enregistrer conditionnel */}
      {isModified && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  content: {
    padding: 20,
  },
  fields: {
    marginTop: 30,
  },
  languageButton: {
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  languageText: {
    fontSize: 40,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#386641',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
