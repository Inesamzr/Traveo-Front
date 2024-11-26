import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { createTheme } from '../../services/themeService';
import Header from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logoOptions } from '../../Utils/logoOptions';

export default function AddActivityThemePage() {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [image_default, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(logoOptions);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!label || !description || !image_default) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    await createTheme({ label, description, image_default });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header title="Ajouter un Thème" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#510D0A" />
      </TouchableOpacity>
      <ScrollView style={styles.containInput} contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'activité"
          value={label}
          onChangeText={setLabel}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description de l'activité"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={image_default}
            items={items}
            setOpen={setOpen}
            setValue={setImage}
            setItems={setItems}
            placeholder="Sélectionnez un logo"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
          />
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
    padding: 20,
  },
  containInput: {
    marginTop: 80,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#510D0A',
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: '#386641',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
