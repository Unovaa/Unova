# 🌟 Unova - Réseau Social

Bienvenue sur **Unova**, un réseau social moderne et complet inspiré de Facebook, développé avec HTML, CSS et JavaScript pur.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Technologies utilisées](#technologies-utilisées)
- [Fonctionnalités détaillées](#fonctionnalités-détaillées)
- [Stockage des données](#stockage-des-données)
- [Améliorations futures](#améliorations-futures)

---

## 🎯 Aperçu

**Unova** est un réseau social complet qui permet aux utilisateurs de :
- Se connecter et créer un compte
- Publier des contenus (texte, images)
- Interagir avec les publications (likes, commentaires)
- Créer et visualiser des stories temporaires
- Échanger des messages privés
- Recevoir des notifications en temps réel
- Gérer leurs amis et demandes d'amis

---

## ✨ Fonctionnalités

### 🔐 Authentification
- ✅ Inscription avec validation complète
- ✅ Connexion sécurisée
- ✅ Déconnexion
- ✅ Validation des formulaires
- ✅ Gestion des erreurs

### 📱 Fil d'actualité
- ✅ Créer des publications (texte + image)
- ✅ Aimer les publications
- ✅ Commenter les publications
- ✅ Aimer les commentaires
- ✅ Affichage chronologique
- ✅ Visibilité des publications (Public, Amis, Privé)

### 📖 Stories
- ✅ Créer des stories texte avec fonds colorés
- ✅ Créer des stories photo
- ✅ Visualisation avec barre de progression
- ✅ Expiration automatique après 24h
- ✅ Compteur de vues
- ✅ Répondre aux stories

### 💬 Messagerie
- ✅ Chat en temps réel
- ✅ Liste des conversations
- ✅ Recherche de conversations
- ✅ Indicateur de messages non lus
- ✅ Démarrer une nouvelle conversation
- ✅ Interface de chat moderne

### 🔔 Notifications
- ✅ Notifications pour les likes
- ✅ Notifications pour les commentaires
- ✅ Notifications pour les messages
- ✅ Notifications pour les demandes d'amis
- ✅ Filtres par type
- ✅ Marquer comme lu
- ✅ Paramètres de notifications

### 👥 Gestion des amis
- ✅ Envoyer des demandes d'amis
- ✅ Accepter/Refuser les demandes
- ✅ Liste des amis
- ✅ Contacts en ligne

---

## 📁 Structure du projet

```
unova/
│
├── index.html           # Page de connexion
├── inscription.html     # Page d'inscription
├── homme.html          # Page d'accueil / Fil d'actualité
├── story.html          # Page des stories
├── message.html        # Page de messagerie
├── notification.html   # Page des notifications
├── styl.css           # Fichier CSS principal
├── scripts.js         # Fichier JavaScript principal
└── README.md          # Documentation du projet
```

---

## 🚀 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un éditeur de code (VS Code recommandé)
- Un serveur local (optionnel mais recommandé)

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   # Si vous avez git
   git clone [url-du-repo]
   
   # Ou téléchargez simplement les fichiers
   ```

2. **Ouvrir le projet dans VS Code**
   ```bash
   cd unova
   code .
   ```

3. **Lancer un serveur local**
   
   **Option A : Avec l'extension Live Server (VS Code)**
   - Installez l'extension "Live Server" dans VS Code
   - Clic droit sur `index.html`
   - Sélectionnez "Open with Live Server"
   
   **Option B : Avec Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option C : Avec Node.js**
   ```bash
   npx http-server
   ```

4. **Accéder à l'application**
   - Ouvrez votre navigateur
   - Allez sur `http://localhost:8000` (ou le port indiqué)

---

## 💻 Utilisation

### Première connexion

1. **Créer un compte**
   - Cliquez sur "Créer un compte" sur la page de connexion
   - Remplissez tous les champs du formulaire
   - Acceptez les conditions d'utilisation
   - Cliquez sur "Créer mon compte"

2. **Se connecter**
   - Utilisez l'email et le mot de passe créés
   - Cliquez sur "Se connecter"

3. **Découvrir l'interface**
   - Fil d'actualité : Créez votre première publication
   - Stories : Partagez une story
   - Messages : Discutez avec d'autres utilisateurs
   - Notifications : Suivez toutes vos interactions

---

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes et responsive
  - Variables CSS
  - Flexbox & Grid
  - Animations
  - Media Queries
- **JavaScript (Vanilla)** : Logique applicative
  - ES6+
  - LocalStorage API
  - DOM Manipulation
  - Event Handling

### Bibliothèques externes
- **Font Awesome 6.4.0** : Icônes
- **Google Fonts** : Non utilisé actuellement (peut être ajouté)

---

## 🔍 Fonctionnalités détaillées

### Système d'authentification

Le système utilise le LocalStorage pour stocker les utilisateurs et gérer les sessions :

```javascript
// Structure d'un utilisateur
{
  id: "unique-id",
  fullName: "Jean Dupont",
  email: "jean@example.com",
  username: "jeandupont",
  password: "password123", // En production, utilisez un hashage
  birthdate: "1990-01-01",
  gender: "homme",
  avatar: "url-avatar",
  createdAt: 1234567890,
  bio: "",
  friends: [],
  friendRequests: []
}
```

### Gestion des publications

```javascript
// Structure d'une publication
{
  id: "unique-id",
  userId: "author-id",
  author: "Jean Dupont",
  avatar: "url-avatar",
  content: "Texte de la publication",
  image: "data:image/...", // Base64
  visibility: "public", // public, friends, private
  likes: ["user-id-1", "user-id-2"],
  comments: [...],
  timestamp: 1234567890
}
```

### Système de stories

```javascript
// Structure d'une story
{
  id: "unique-id",
  userId: "author-id",
  author: "Jean Dupont",
  avatar: "url-avatar",
  type: "text" | "image",
  content: "Texte" (si type === "text"),
  image: "data:image/..." (si type === "image"),
  background: "gradient1" (si type === "text"),
  timestamp: 1234567890,
  views: ["user-id-1", "user-id-2"],
  expiresAt: 1234567890 + 86400000 // 24 heures
}
```

### Messagerie

```javascript
// Structure d'un message
{
  id: "unique-id",
  senderId: "sender-id",
  senderName: "Jean Dupont",
  senderAvatar: "url-avatar",
  receiverId: "receiver-id",
  text: "Contenu du message",
  timestamp: 1234567890,
  read: false
}
```

### Notifications

```javascript
// Structure d'une notification
{
  id: "unique-id",
  userId: "receiver-id",
  type: "like" | "comment" | "friend_request" | "message",
  fromUserId: "sender-id",
  fromUserName: "Jean Dupont",
  fromUserAvatar: "url-avatar",
  message: "Jean Dupont a aimé votre publication",
  postId: "post-id" (optionnel),
  timestamp: 1234567890,
  read: false,
  seen: false
}
```

---

## 💾 Stockage des données

L'application utilise le **LocalStorage** du navigateur pour stocker toutes les données :

| Clé | Description |
|-----|-------------|
| `unova_users` | Liste de tous les utilisateurs |
| `unova_current_user` | Utilisateur actuellement connecté |
| `unova_posts` | Liste de toutes les publications |
| `unova_comments` | Commentaires (stockés dans les posts) |
| `unova_likes` | Likes (stockés dans les posts) |
| `unova_stories` | Liste de toutes les stories |
| `unova_messages` | Liste de tous les messages |
| `unova_conversations` | Conversations actives |
| `unova_notifications` | Liste des notifications |
| `unova_friend_requests` | Demandes d'amis |
| `unova_friends` | Liste des amis |
| `unova_notification_settings` | Paramètres de notifications |

### Limitations du LocalStorage
- **Capacité** : ~5-10 MB selon les navigateurs
- **Sécurité** : Les données ne sont pas chiffrées
- **Persistance** : Les données restent jusqu'à suppression manuelle

---

## 🎨 Personnalisation

### Couleurs principales

Les couleurs peuvent être modifiées dans `styl.css` :

```css
:root {
  --primary-color: #4267B2;      /* Bleu principal */
  --primary-dark: #365899;        /* Bleu foncé */
  --secondary-color: #42b72a;     /* Vert */
  --accent-color: #f02849;        /* Rouge/Rose */
  --bg-primary: #f0f2f5;          /* Fond gris clair */
  --bg-secondary: #ffffff;        /* Fond blanc */
}
```

### Responsive Design

L'application est entièrement responsive avec des breakpoints :
- **Mobile** : < 480px
- **Tablet** : 480px - 768px
- **Desktop** : 768px - 1024px
- **Large Desktop** : > 1024px

---

## 🔮 Améliorations futures

### Fonctionnalités à ajouter
- [ ] Système de backend (Node.js + MongoDB)
- [ ] Authentification JWT
- [ ] Upload d'images vers un serveur
- [ ] Appels vidéo/audio (WebRTC)
- [ ] Recherche globale d'utilisateurs
- [ ] Groupes et pages
- [ ] Événements
- [ ] Partage de publications
- [ ] Réactions multiples (😂, 😮, 😢, etc.)
- [ ] Système de tags et mentions
- [ ] Mode sombre
- [ ] Support multilingue
- [ ] Compression d'images
- [ ] Lazy loading
- [ ] Progressive Web App (PWA)

### Optimisations techniques
- [ ] Minification des fichiers CSS/JS
- [ ] Code splitting
- [ ] Service Worker pour le mode hors ligne
- [ ] Optimisation des images
- [ ] Chargement différé des modules
- [ ] Tests unitaires et d'intégration

---

## 📝 Notes importantes

### Sécurité
⚠️ **Attention** : Cette application est un prototype éducatif. En production :
- Ne stockez JAMAIS les mots de passe en clair
- Utilisez un backend sécurisé
- Implémentez le HTTPS
- Validez toutes les entrées côté serveur
- Utilisez des tokens JWT pour l'authentification
- Protégez contre les injections XSS et CSRF

### Performance
- Les images sont stockées en Base64, ce qui peut ralentir l'application
- Le LocalStorage a des limites de taille
- Pour une application en production, utilisez un backend

### Compatibilité
- Testé sur Chrome, Firefox, Safari et Edge
- Nécessite JavaScript activé
- Fonctionne mieux avec un serveur local

---

## 👨‍💻 Développement

### Structure du code

**scripts.js** est organisé en sections :
1. **Gestion du LocalStorage** : Fonctions de sauvegarde/récupération
2. **Authentification** : Login, Register, Logout
3. **Interface utilisateur** : Mise à jour de l'UI
4. **Publications** : CRUD des posts
5. **Stories** : Gestion des stories
6. **Messagerie** : Chat en temps réel
7. **Notifications** : Système de notifications
8. **Amis** : Gestion des relations
9. **Utilitaires** : Fonctions helpers

### Conventions de code
- **Nommage** : camelCase pour les variables et fonctions
- **Commentaires** : Sections bien documentées
- **Indentation** : 4 espaces
- **Séparation** : Sections clairement délimitées

---

## 🐛 Débogage

### Console du navigateur
Ouvrez les DevTools (F12) pour :
- Voir les logs
- Inspecter le LocalStorage
- Déboguer JavaScript
- Analyser les performances

### Commandes utiles
```javascript
// Dans la console du navigateur
localStorage.clear(); // Effacer toutes les données
console.log(localStorage); // Voir toutes les données
```

---

## 📧 Support

Pour toute question ou problème :
- Consultez ce README
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que JavaScript est activé

---

## 📜 Licence

Ce projet est un prototype éducatif. Utilisez-le librement pour apprendre et expérimenter.

---

## 🙏 Remerciements

- **Font Awesome** pour les icônes
- **UI Avatars** pour les avatars générés automatiquement
- La communauté des développeurs web

---

## 🎓 Ressources pour apprendre

Si vous souhaitez améliorer ce projet :
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [W3Schools](https://www.w3schools.com/)

---

**Fait avec ❤️ pour l'apprentissage du développement web**

*Version 1.0.0 - Janvier 2026*
