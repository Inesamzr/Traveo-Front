import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import texts from '../../localization/localization';
import { useLanguage } from '../../localization/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThemesSection({ themes }) {
  const { language } = useLanguage();
  const currentTexts = texts[language].themes;
  const currentText = texts[language];
  const [flippedCards, setFlippedCards] = useState({});
  const [userRole, setUserRole] = useState("");
  const navigation = useNavigation();


  const handleCardPress = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleEditPress = (theme) => {
    navigation.navigate('EditTheme', { theme });
  };

  useEffect(()=> {
    const fetchedData = async () => {
      try {
        const fetchUser = await AsyncStorage.getItem("userRole"); // Récupération des thèmes depuis l'API
        setUserRole(fetchUser);
        console.log(userRole)
      } catch (error) {
        console.log('Erreur', 'Impossible de charger le userRole');
      } finally {
        setLoading(false);
      }
    };

    fetchedData()
  }, [])

  return (
    <View style={styles.themesSection}>
      <Text style={styles.sectionTitle}>{currentText.themesTitle}</Text>
      <View style={styles.themes}>
        {themes &&
          themes.map((theme) => (
            <View key={theme.idTheme} style={styles.themeContainer}>
              <TouchableOpacity
                style={styles.themeCard}
                onPress={() => handleCardPress(theme.idTheme)}
              >
                {!flippedCards[theme.idTheme] ? (
                  <View style={styles.cardFront}>
                    <MaterialCommunityIcons
                      name={theme.image_default}
                      size={30}
                      color="#510D0A"
                    />
                    <Text style={styles.themeText}>{theme.label}</Text>
                  </View>
                ) : (
                  <View style={styles.cardBack}>
                    <Text style={styles.descriptionText}>{theme.description}</Text>
                  </View>
                )}
              </TouchableOpacity>
              {userRole && userRole === "admin"  && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditPress(theme)}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#FFF" />
                  </TouchableOpacity>
                )}
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  themesSection: {
    padding: 20,
    marginTop: 20,
    marginBottom: 80,
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
  themeContainer: {
    width: '45%',
    marginBottom: 15,
    position: 'relative',
  },
  themeCard: {
    height: 150,
    backgroundColor: '#F2E8CF',
    borderRadius: 10,
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
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#510D0A',
    borderRadius: 50,
    padding: 8,
  },
});
