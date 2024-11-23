import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useLanguage } from '../../localization/LanguageContext';
import texts from '../../localization/localization';
import { Ionicons } from '@expo/vector-icons'; 
import Header from '../../Components/Header';

export default function LanguageSelection({ navigation }) {
  const { setLanguage, language } = useLanguage();
  const currentTexts = texts[language]; // Obtenez les textes en fonction de la langue

  // Générer les langues à partir de `texts`
  const languages = Object.keys(texts).map((code) => ({
    code,
    name: texts[code].language, // Texte "Welcome" basé sur la langue
    flag: texts[code].flag, // Drapeau associé à la langue
  }));

  const handleLanguageSelect = (code) => {
    setLanguage(code); // Change la langue
    navigation.goBack(); // Retourne à la page précédente
  };

  return (
    <View style={styles.container}>
      {/* Icône de retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>

      {/* Header dynamique */}
      <Header title={currentTexts.languageSelect} />

      {/* Liste des langues */}
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              language === item.code && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelect(item.code)}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.languageName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2E8CF',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    marginTop: 40,
    color: '#510D0A'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 70,
  },
  languageItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginTop: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedLanguage: {
    borderColor: '#510D0A',
  },
  flag: {
    fontSize: 50,
    marginBottom: 10,
  },
  languageName: {
    fontSize: 16,
    textAlign: 'center',
  },
});
