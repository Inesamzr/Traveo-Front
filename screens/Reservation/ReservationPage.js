import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../Components/Header';

export default function ReservationPage() {
  return (
    <View style={styles.container}>
      <Header title="Mes réservations" />
      <View style={styles.content}>
        <Text>Contenu de la page des réservations</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
