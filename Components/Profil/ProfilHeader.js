import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfilHeader({ name, onEdit }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={onEdit}>
        <Image
          source={require('../../assets/avatar.png')} // Remplacez par votre image d'avatar
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDE6C7',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 60,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A5C49F',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
  },
  icon: {
    width: 15,
    height: 15,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#386641',
  },
});
