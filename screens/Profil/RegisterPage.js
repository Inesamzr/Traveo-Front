import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../localization/LanguageContext';
import texts from '../../localization/localization';
import { login, register } from '../../services/authService'; 

export default function RegisterPage() {
  const { language } = useLanguage();
  const currentTexts = texts[language];
  const navigation = useNavigation();

  // États pour les champs d'inscription
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null)
  

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    console.log(firstName)


    //setLoading(true);
    setUsername(`${firstName}.${lastName.substring(0, 2).toLowerCase()}`);
    console.log(username)

    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password,
        role: 'user'
      };

      const response = await register(userData);
      setUserId(response.id)
      console.log("user idddddd : ", userId)

      console.log('Succès', 'Compte créé avec succès.');
      navigation.navigate('Profil', {userId: response.id}); // Redirection vers la page de connexion après l'inscription
    } catch (error) {
      console.error(error);
      console.log('Erreur', "Impossible de créer l'utilisateur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/Login_asset.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Image 
        source={require('../../assets/Login_asset_2.png')} 
        style={styles.bottomLeftImage}
      />

      <View style={styles.contenu}>
        <Image 
          source={require('../../assets/Traveo_logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>{currentTexts.welcomenew}</Text>
        <Text style={styles.connectText}>{currentTexts.registerTitle}</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Prénom" 
            placeholderTextColor="#aaa" 
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Nom" 
            placeholderTextColor="#aaa" 
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#aaa" 
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Numéro de téléphone" 
            placeholderTextColor="#aaa" 
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Mot de passe" 
            placeholderTextColor="#aaa" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>
            {currentTexts.register}
          </Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.alreadyAccountText}>{currentTexts.alreadyAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>{currentTexts.login}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8CF',
  },
  backgroundImage: {
    width: '100%',
    height: '70%', 
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex:0,
  },
  contenu:{
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    zIndex:2,
    marginTop:-400,
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#111',
    fontWeight: '300',
    textAlign: 'center',
  },
  connectText: {
    fontSize: 24,
    color: '#386641',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#D9A5B3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontSize: 14,
    color: '#111',
  },
  loginText: {
    fontSize: 14,
    color: '#510D0A',
    fontWeight: 'bold',
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: '20%',
  },
});
