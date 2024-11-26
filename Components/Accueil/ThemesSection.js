import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';

export default function ThemesSection({themes}) {
    const { language } = useLanguage();
    const currentTexts = texts[language].themes;
    const currentText = texts[language];
    const [flippedCards, setFlippedCards] = useState({});
      

  const handleCardPress = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  
  return (
    <View style={styles.themesSection}>
      <Text style={styles.sectionTitle}>{currentText.themesTitle}</Text>
      <View style={styles.themes}>
        {themes && themes.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={styles.themeCard}
            onPress={() => handleCardPress(theme.idTheme)}
          >
            {!flippedCards[theme.idTheme] ? (
              <View style={styles.cardFront}>
                <MaterialCommunityIcons name={theme.image_default} size={30} color="#510D0A" />
                <Text style={styles.themeText}>{theme.label}</Text>
              </View>
            ) : (
              <View style={styles.cardBack}>
                <Text style={styles.descriptionText}>{theme.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  themesSection: {
    padding: 20,
    marginTop: 20,
    marginBottom: 80
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#510D0A',
  },
  themes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '45%',
    height: 150,
    backgroundColor: '#F2E8CF',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardFront: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#510D0A',
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  themeText: {
    marginTop: 10,
    fontSize: 14,
    color: '#510D0A',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
});
