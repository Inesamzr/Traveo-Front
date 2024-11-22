import React from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text } from 'react-native';
import ProfilHeader from '../../Components/Profil/ProfilHeader';
import ProfilField from '../../Components/Profil/ProfilField';
import ProfilButton from '../../Components/Profil/ProfilButton';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';



export default function ProfilePage({ navigation }) {
  const { language } = useLanguage();
  const currentTexts = texts[language];


  const handleEditProfile = () => {
    console.log('Edit profile clicked');
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
      <ProfilHeader name="John.Do" onEdit={handleEditProfile} />
      <View style={styles.fields}>
        <ProfilField label={currentTexts.firstNamePlaceholder} value="John Doe" icon="person" />
        <ProfilField label={currentTexts.lastNamePlaceholder} value="John Doe" icon="person" />
        <ProfilField label="Email" value="johndoe@gmail.com" icon="mail" />
      </View>
      <TouchableOpacity
          style={styles.languageButton}
          onPress={() => navigation.navigate('LanguageSelection')}
        >
          <Text style={styles.languageText}>{currentTexts.flag}</Text>
        </TouchableOpacity>
      <ProfilButton label="Mes activités" onPress={handleActivities} />
      <ProfilButton label="Mes réservations" onPress={handleReservations} />
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
});
