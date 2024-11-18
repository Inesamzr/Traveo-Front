import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const themes = [
  { id: 1, icon: "hiking", title: "Aventure", description: "Explorez des randonnées, des voyages et des défis excitants." },
  { id: 2, icon: "chef-hat", title: "Cuisine", description: "Apprenez, cuisinez et partagez des plats délicieux." },
  { id: 3, icon: "meditation", title: "Spiritualité", description: "Reposez votre esprit avec yoga, méditation et plus." },
  { id: 4, icon: "brush", title: "Créativité", description: "Exprimez votre art à travers la peinture, la musique et la photographie." }
];

export default function ThemesSection() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardPress = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <View style={styles.themesSection}>
      <Text style={styles.sectionTitle}>Voyagez à travers nos thèmes</Text>
      <View style={styles.themes}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={styles.themeCard}
            onPress={() => handleCardPress(theme.id)}
          >
            {!flippedCards[theme.id] ? (
              <View style={styles.cardFront}>
                <MaterialCommunityIcons name={theme.icon} size={30} color="#510D0A" />
                <Text style={styles.themeText}>{theme.title}</Text>
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
