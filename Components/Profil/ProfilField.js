import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilField({ label, value, icon, editable = false, onChangeText }) {
  const [isEditing, setIsEditing] = useState(false); // État local pour activer/désactiver le mode édition

  const handlePress = () => {
    if (editable) {
      setIsEditing(true); // Active le mode édition
    }
  };

  const handleBlur = () => {
    setIsEditing(false); // Désactive le mode édition lors de la perte du focus
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={editable ? 1 : 0.7} // Le clic est actif uniquement si editable est true
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#7D7D7D" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing && editable ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onBlur={handleBlur} // Désactive le mode édition après modification
            autoFocus={true} // Met automatiquement le champ en focus
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#333',
  },
});
