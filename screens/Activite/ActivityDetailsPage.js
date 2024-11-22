import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const themeIcons = {
  Aventure: <MaterialCommunityIcons name="hiking" size={16} color="#BC4749" />,
  Cuisine: <FontAwesome5 name="utensils" size={14} color="#BC4749" />,
  Spiritualité: <MaterialCommunityIcons name="meditation" size={16} color="#BC4749" />,
  Créativité: <MaterialCommunityIcons name="brush" size={16} color="#BC4749" />,
};

export default function ActivityDetailsPage({ route, navigation }) {
  const { activity } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style = {styles.contenu}>
        {/* Image avec l'icône de retour */}
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

        {/* Conteneur avec le titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activity.nom}</Text>
        </View>

        {/* Détails de l'activité */}
        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="person-circle-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{activity.hote}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={20} color="#BC4749" />
              <Text style={styles.infoText}>{activity.participants}</Text>
            </View>
            <View style={styles.infoItem}>
              {themeIcons[activity.theme]}
              <Text style={styles.infoText}>{activity.theme}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.description}</Text>
            </View>
          <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Lieu de RDV</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.adresse}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Date et Heure</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.date}</Text>
            </View>
            <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Prix</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.prix}</Text>
            </View>
            
            <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Place Diponibles</Text>
            </View>
            <Text style={styles.sectionContent}>{activity.participants}</Text>
            </View>
            <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Tags</Text>
            </View>
            <View style={styles.tagsContainer}>
                {activity.tags.split(',').map((tag, index) => (
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  contenu:{
    marginBottom:40,
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
    padding: 20,
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
});
