Voici la mise à jour pour ajouter un bouton **"Voir les réservations"** juste au-dessus de la section **Description** pour l'organisateur de l'activité (owner). Le bouton redirige vers une nouvelle page que vous devez créer par la suite.

### Changements :
1. Ajout d'un bouton conditionnel "Voir les réservations" (seulement pour `isOwner`).
2. Ajout d'un style spécifique pour ce bouton.

### Code mis à jour :

```javascript
<View style={styles.detailsContainer}>
  {/* Bouton Voir les réservations (seulement pour l'owner) */}
  {isOwner && (
    <TouchableOpacity
      style={styles.reservationsButton}
      onPress={() => navigation.navigate('ReservationsPage', { activityId: activity.idActivite })}
    >
      <Text style={styles.reservationsButtonText}>Voir les réservations</Text>
    </TouchableOpacity>
  )}

  {/* Sections détaillées */}
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
    <Text style={styles.sectionContent}>{adresse}</Text>
  </View>
  <View style={styles.section}>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>Dates</Text>
    </View>
    <Text style={styles.sectionContent}>
      du {activity.dateDebut} au {activity.dateFin}
    </Text>
  </View>
  <View style={styles.section}>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>Prix</Text>
    </View>
    <Text style={styles.sectionContent}>{activity.prix} €</Text>
  </View>
</View>
```

### Ajout des styles :

Ajoutez les styles suivants pour le bouton "Voir les réservations" :

```javascript
reservationsButton: {
  backgroundColor: '#F2D0C9',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 15,
  alignSelf: 'center',
  marginBottom: 15,
},
reservationsButtonText: {
  color: '#510D0A',
  fontSize: 16,
  fontWeight: 'bold',
},
```

### Navigation vers une nouvelle page :

Lorsque l'utilisateur clique sur le bouton, il est redirigé vers une nouvelle page appelée `ReservationsPage`. Vous devez la créer dans votre projet.

Exemple de route dans votre navigation :

```javascript
<Stack.Screen
  name="ReservationsPage"
  component={ReservationsPage}
/>
```

Et voici un squelette pour la page `ReservationsPage` :

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ReservationsPage({ route }) {
  const { activityId } = route.params;
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Remplacez cette ligne par l'appel à votre API pour récupérer les réservations
        const response = await fetch(`API_URL/reservations?activityId=${activityId}`);
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations', error);
      }
    };
    fetchReservations();
  }, [activityId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <Text style={styles.reservationText}>Nom : {item.name}</Text>
            <Text style={styles.reservationText}>Email : {item.email}</Text>
            <Text style={styles.reservationText}>Nombre de places : {item.places}</Text>
          </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#510D0A',
  },
  reservationItem: {
    backgroundColor: '#F2D0C9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reservationText: {
    fontSize: 14,
    color: '#510D0A',
  },
});
```

### Explication :
- Le bouton "Voir les réservations" redirige vers `ReservationsPage` avec l'identifiant de l'activité (`activityId`).
- Sur cette nouvelle page, vous pouvez afficher les réservations liées à l'activité en appelant une API spécifique.

Cela devrait répondre à vos besoins ! 😊