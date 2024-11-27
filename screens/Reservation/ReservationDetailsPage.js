import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { fetchReviewsByReservationId } from '../../services/reviewService'; // Remplacez par votre service d'API pour les avis

const themeIcons = {
  Aventure: <MaterialCommunityIcons name="hiking" size={16} color="#BC4749" />,
  Cuisine: <FontAwesome5 name="utensils" size={14} color="#BC4749" />,
  Spiritualité: <MaterialCommunityIcons name="meditation" size={16} color="#BC4749" />,
  Créativité: <MaterialCommunityIcons name="brush" size={16} color="#BC4749" />,
};

export default function ReservationDetailsPage({ route, navigation }) {
  const { reservation } = route.params;

  const handleAvisPress = async () => {
    try {
      // Récupérer les avis à partir de l'ID de réservation
      const reviewsData = await fetchReviewsByReservationId(1); // ID par défaut : 1
  
      if (!reviewsData || reviewsData.length === 0) {
        Alert.alert('Avis', 'Aucun avis disponible pour cette réservation.');
        return;
      }  
      // Naviguer vers la page ActivityReviews avec les avis et la moyenne
      navigation.navigate('ActivityReviews', {
        reviews: reviewsData,
      });
    } catch (error) {
      Alert.alert('Erreur', "Impossible de charger les avis pour cette réservation.");
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contenu}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/activity-image-placeholder.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="#510D0A" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{reservation.nom}</Text>
        </View>

        <View style={styles.detailsContainer}>
          {/* Détails de la réservation */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person-circle-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{reservation.hote}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{reservation.participants}</Text>
            </View>
            <View style={styles.infoItem}>
              {themeIcons[reservation.theme]}
              <Text style={styles.infoText}>{reservation.theme}</Text>
            </View>
          </View>

          {/* Sections supplémentaires */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{reservation.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lieu de RDV</Text>
            <Text style={styles.sectionContent}>{reservation.lieu}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date et Heure</Text>
            <Text style={styles.sectionContent}>{reservation.date}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prix</Text>
            <Text style={styles.sectionContent}>{reservation.prix}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places Disponibles</Text>
            <Text style={styles.sectionContent}>
              {reservation.placesDisponibles} place(s) restante(s)
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {reservation.tags.split(',').map((tag, index) => (
                <View
                  key={index}
                  style={[styles.tag, index % 2 === 0 ? styles.tagEven : styles.tagOdd]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      index % 2 === 0 ? styles.tagTextEven : styles.tagTextOdd,
                    ]}
                  >
                    #{tag.trim()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler ma réservation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avisButton} onPress={handleAvisPress}>
            <Text style={styles.avisButtonText}>Avis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  contenu: {
    marginBottom: 90,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  titleContainer: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    backgroundColor: '#510D0A',
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F2E8CF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  infoRow: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#510D0A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleContainer: {
    backgroundColor: '#F2D0C9',
    alignSelf: 'flex-start',
    paddingRight: 10,
    paddingLeft: 30,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
    marginLeft: -30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#510D0A',
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#F2D0C9',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagEven: {
    backgroundColor: '#F2D0C9',
  },
  tagOdd: {
    backgroundColor: '#DBBBBA',
  },
  tagTextEven: {
    color: '#510D0A',
  },
  tagTextOdd: {
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avisButton: {
    backgroundColor: '#DBBBBA',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    margin: 20
  },
  avisButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});





























