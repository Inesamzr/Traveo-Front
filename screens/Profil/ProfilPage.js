import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text } from 'react-native';
import ProfilHeader from '../../Components/Profil/ProfilHeader';
import ProfilField from '../../Components/Profil/ProfilField';
import ProfilButton from '../../Components/Profil/ProfilButton';
import ReviewsSection from '../../Components/Review/ReviewsSection';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';

export default function ProfilPage({ navigation }) {
  const { language } = useLanguage();
  const currentTexts = texts[language];
  const [searchText, setSearchText] = useState('');


  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [isModified, setIsModified] = useState(false); // Ajouter l'état pour suivre les modifications
  const [reviews] = useState([
    { name: 'Francisco Maia', rating: 5, comment: 'Une expérience extraordinaire à refaire.' },
    { name: 'Kita Chinhoko', rating: 4, comment: "J'ai appris beaucoup de chose pendant cette activité." },
    { name: 'Kita Chinhoko', rating: 4, comment: "J'ai appris beaucoup de chose pendant cette activité." },
  ]);

  const filteredData = [
    {
      id: 1,
      nom: 'Vélo en groupe',
      description: 'Un joli tour de vélo groupé en plein air.',
      adresse: 'Nîmes',
      date: '24/06/2024 06:00-12:00',
      theme: 'Aventure',
      participants: '2/6',
      prix: '3€',
      latitude: 43.8372,
      longitude: 4.3601,
    },
    {
      id: 2,
      nom: 'Cours de cuisine',
      description: 'Apprenez à cuisiner des plats délicieux.',
      adresse: 'Marseille',
      date: '01/07/2024 14:00-18:00',
      theme: 'Cuisine',
      participants: '5/10',
      prix: '6€',
      latitude: 43.2965,
      longitude: 5.3698,
    },
  ];


  const handleFieldChange = (field, value) => {
    if (field === 'firstName') setFirstName(value);
    if (field === 'lastName') setLastName(value);
    if (field === 'email') setEmail(value);
    setIsModified(true); // Activer l'état de modification
  };

  const handleSave = () => {
    console.log('Modifications enregistrées :', { firstName, lastName, email });
    setIsModified(false); // Réinitialiser après sauvegarde
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfilHeader name={`${firstName} ${lastName}`} onEdit={() => console.log('Edit profile clicked')} />
      <View style={styles.fields}>
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
      {isModified && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      )}
      <ProfilButton
        label="Mes activités"
        onPress={() => navigation.navigate('ActivityList', { filteredData, searchText: '' })}
      />      <ProfilButton label="Mes réservations" onPress={() => navigation.navigate('Reservations')} />
      <ReviewsSection
        reviews={reviews}
        rating={4.8}
        reviewsCount={reviews.length}
      />
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
