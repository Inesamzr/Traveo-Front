# 🚀 Guide de Démarrage du Frontend : Traveo_Front

Bienvenue dans le guide d'installation et de lancement du frontend de l'application **Traveo_Front**. Ce guide vous accompagnera pas à pas pour configurer votre environnement et lancer l'application sur votre appareil mobile. Let's get started! 🎉

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

1. **Node.js** version **18.17+** (nous recommandons l'installation via [NVM](https://github.com/nvm-sh/nvm) pour une gestion simplifiée des versions de Node.js).
2. **npm** (généralement installé avec Node.js).
3. **Expo Go** installé sur votre smartphone (disponible sur [iOS](https://apps.apple.com/us/app/expo-go/id982107779) et [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)) pour scanner le QR code et lancer l'application.

---

## 🛠️ Installation des Outils

### 1️⃣ Installer Node.js via NVM

Si vous n'avez pas encore NVM (Node Version Manager) installé, suivez les instructions sur le [référentiel officiel de NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

Une fois NVM installé, exécutez les commandes suivantes pour installer Node.js version 18 :

```
nvm install 18
nvm use 18
```

### 2️⃣ Vérifier les Versions Installées

Assurez-vous que Node.js et npm sont correctement installés en vérifiant leurs versions :

```
node -v  # Attendu : v18.x.x
npm -v   # Attendu : 8.x.x ou supérieur
```

---

## 📥 Cloner le Projet

Clonez le dépôt Git du projet sur votre machine locale :

```
git clone https://github.com/Inesamzr/Traveo-Front.git
cd Traveo-Front
```

---

## 📦 Installation des Dépendances

Dans le répertoire du projet, installez toutes les dépendances nécessaires en exécutant :

```
npm install
```

---

## ▶️ Lancer le Projet

### 1️⃣ Démarrer le Serveur Expo

Pour lancer l'application en mode développement, exécutez :

```
npx expo start --clear
```

*Le drapeau `--clear` permet de vider le cache, ce qui peut aider à résoudre certains problèmes.*

### 2️⃣ Scanner le QR Code avec Expo Go

1. **Assurez-vous que votre ordinateur et votre smartphone sont connectés au même réseau Wi-Fi.**
2. Ouvrez l'application **Expo Go** sur votre téléphone.
3. Scannez le QR code affiché dans le terminal ou dans le navigateur web qui s'est ouvert après avoir lancé Expo.
4. L'application devrait se lancer automatiquement sur votre appareil.

---

## 🆘 Dépannage

Si vous rencontrez des problèmes lors de l'installation ou du lancement, voici quelques solutions courantes :

### 🔄 Nettoyer les Modules et Réinstaller

Parfois, les modules peuvent être corrompus ou mal installés. Pour les réinstaller :

```
rm -rf node_modules package-lock.json
npm install
```

### 🩺 Vérifier les Dépendances avec Expo Doctor

Expo fournit un outil pour diagnostiquer les problèmes :

```
npx expo doctor
```

Si des problèmes sont détectés, vous pouvez tenter de les corriger automatiquement :

```
npx expo doctor --fix-dependencies
```

### 💡 Autres Conseils

- **Vérifiez les messages d'erreur** dans le terminal pour obtenir des indices sur les problèmes rencontrés.
- **Assurez-vous que vous avez une connexion internet stable** lors de l'installation des dépendances et du lancement de l'application.
- **Redémarrez votre ordinateur et votre smartphone** si les problèmes persistent.

---

## ⌨️ Raccourcis Utiles dans le Terminal Expo

Lorsque le serveur Expo est en cours d'exécution, vous pouvez utiliser les raccourcis suivants dans le terminal :

- **`r`** : Recharge l'application (équivalent d'un rafraîchissement).
- **`m`** : Affiche le menu Expo dans le navigateur.
- **`a`** : Lance l'application sur un émulateur Android connecté.
- **`i`** : Lance l'application sur un simulateur iOS (Mac uniquement).
- **`w`** : Ouvre l'application dans le navigateur web (version web de l'application).
---

## ⌨️ Structure de code 

Voici une structure textuelle de votre projet React Native basée sur l'image fournie. J'ai ajouté une description pour chaque dossier et fichier :

```plaintext
📂 TRAVEO-FRONT
├── 📂 .expo                     # Dossier interne utilisé par Expo, ne pas modifier.
├── 📂 assets                   # Contient les ressources statiques (images, icônes, etc.).
├── 📂 Components               # Composants réutilisables.
│   ├── 📂 Accueil              # Composants liés à l'écran d'accueil.
│   ├── 📂 Activite             # Composants pour gérer les activités (listes, détails, etc.).
│   ├── 📂 Profil               # Composants pour l'affichage et la gestion du profil utilisateur.
│   ├── 📂 Reservation          # Composants liés aux réservations.
│   ├── 📂 Review               # Composants pour la gestion des avis utilisateurs.
│   └── 📄 Header.js            # Composant pour afficher un en-tête commun dans plusieurs pages.
├── 📂 localization             # Gestion des textes multilingues pour l'application.
├── 📂 Navigation               # Gestion des routes et de la navigation entre les écrans.
├── 📂 node_modules             # Dépendances du projet, générées par npm ou yarn.
├── 📂 screens                  # Dossier contenant les différentes pages (écrans) de l'application.
│   ├── 📂 Accueil              # Pages liées à l'accueil.
│   ├── 📂 Activite             # Pages pour afficher et gérer les activités.
│   ├── 📂 Profil               # Pages pour afficher et modifier le profil.
│   ├── 📂 Reservation          # Pages pour la gestion des réservations.
│   └── 📂 Theme                # Pages dédiées à la gestion des thèmes.
├── 📂 services                 # Dossier pour les appels API et la gestion des données.
├── 📂 Utils                    # Contient des utilitaires et des fonctions globales.
│   └── 📄 logoOptions.js       # Options ou configurations liées au logo.
├── 📄 .gitignore               # Fichier pour exclure certains fichiers/dossiers de Git.
├── 📄 App.js                   # Point d'entrée principal de l'application.
├── 📄 app.json                 # Configuration d'Expo pour l'application.
├── 📄 index.js                 # Point d'entrée principal pour React Native.
├── 📄 package-lock.json        # Fichier généré par npm, contient les dépendances exactes installées.
├── 📄 package.json             # Fichier de configuration pour le projet Node.js/React Native.
```

### Explication des dossiers principaux :
1. **Components** : Contient les éléments d'interface utilisateur réutilisables. Chaque sous-dossier regroupe des composants liés à une fonctionnalité spécifique (ex. : activités, réservations, profil, etc.).
2. **screens** : Définit les pages principales de l'application. Chaque sous-dossier représente une section ou une fonctionnalité de l'application.
3. **services** : Gère les appels API pour communiquer avec le backend et récupérer ou envoyer des données.
4. **localization** : Support multilingue pour l'application, gère les traductions de textes.
5. **Utils** : Fichiers utilitaires partagés dans le projet (ex. : options ou fonctions communes).

Vous pouvez copier cette architecture directement dans votre terminal ou éditeur de texte pour l'ajouter à votre documentation.

---

## 🎉 Félicitations !

Vous avez maintenant configuré et lancé avec succès le frontend de **Traveo_Front** sur votre appareil. Profitez de l'application et n'hésitez pas à contribuer ou à signaler des problèmes sur le dépôt GitHub.

Si vous avez des questions ou besoin d'aide supplémentaire, n'hésitez pas à contacter l'équipe de développement.

Bon développement ! 🚀

---
