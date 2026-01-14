// ================================================
// UNOVA - Réseau Social
// Fichier JavaScript principal
// ================================================

// ================================================
// GESTION DU LOCALSTORAGE
// ================================================

// Clés de stockage
const STORAGE_KEYS = {
    USERS: 'unova_users',
    CURRENT_USER: 'unova_current_user',
    POSTS: 'unova_posts',
    COMMENTS: 'unova_comments',
    LIKES: 'unova_likes',
    STORIES: 'unova_stories',
    MESSAGES: 'unova_messages',
    CONVERSATIONS: 'unova_conversations',
    NOTIFICATIONS: 'unova_notifications',
    FRIEND_REQUESTS: 'unova_friend_requests',
    FRIENDS: 'unova_friends',
    NOTIFICATION_SETTINGS: 'unova_notification_settings'
};

// Fonctions utilitaires pour le stockage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erreur de sauvegarde:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erreur de récupération:', error);
        return null;
    }
}

function initializeStorage() {
    // Initialiser les données si elles n'existent pas
    if (!getFromStorage(STORAGE_KEYS.USERS)) saveToStorage(STORAGE_KEYS.USERS, []);
    if (!getFromStorage(STORAGE_KEYS.POSTS)) saveToStorage(STORAGE_KEYS.POSTS, []);
    if (!getFromStorage(STORAGE_KEYS.COMMENTS)) saveToStorage(STORAGE_KEYS.COMMENTS, []);
    if (!getFromStorage(STORAGE_KEYS.LIKES)) saveToStorage(STORAGE_KEYS.LIKES, []);
    if (!getFromStorage(STORAGE_KEYS.STORIES)) saveToStorage(STORAGE_KEYS.STORIES, []);
    if (!getFromStorage(STORAGE_KEYS.MESSAGES)) saveToStorage(STORAGE_KEYS.MESSAGES, []);
    if (!getFromStorage(STORAGE_KEYS.CONVERSATIONS)) saveToStorage(STORAGE_KEYS.CONVERSATIONS, []);
    if (!getFromStorage(STORAGE_KEYS.NOTIFICATIONS)) saveToStorage(STORAGE_KEYS.NOTIFICATIONS, []);
    if (!getFromStorage(STORAGE_KEYS.FRIEND_REQUESTS)) saveToStorage(STORAGE_KEYS.FRIEND_REQUESTS, []);
    if (!getFromStorage(STORAGE_KEYS.FRIENDS)) saveToStorage(STORAGE_KEYS.FRIENDS, []);
    if (!getFromStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS)) {
        saveToStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, {
            push: true,
            likes: true,
            comments: true,
            friendRequests: true,
            messages: true
        });
    }
}

// Initialiser le stockage au chargement
initializeStorage();

// ================================================
// GÉNÉRATION D'ID UNIQUE
// ================================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ================================================
// AUTHENTIFICATION
// ================================================

function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const terms = document.getElementById('terms').checked;
    
    const errorDiv = document.getElementById('registerError');
    const successDiv = document.getElementById('registerSuccess');
    
    // Réinitialiser les messages
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Validations
    if (!fullName || !email || !username || !password || !birthdate || !gender || !terms) {
        errorDiv.textContent = 'Veuillez remplir tous les champs obligatoires.';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Vérifier si l'email ou le nom d'utilisateur existe déjà
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const existingUser = users.find(u => u.email === email || u.username === username);
    
    if (existingUser) {
        errorDiv.textContent = 'Cet email ou nom d\'utilisateur est déjà utilisé.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
        id: generateId(),
        fullName,
        email,
        username,
        password, // En production, il faudrait hasher le mot de passe
        birthdate,
        gender,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4267B2&color=fff`,
        createdAt: Date.now(),
        bio: '',
        friends: [],
        friendRequests: []
    };
    
    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    
    // Afficher le message de succès
    successDiv.textContent = 'Compte créé avec succès ! Redirection...';
    successDiv.style.display = 'block';
    
    // Rediriger vers la page de connexion après 2 secondes
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    errorDiv.style.display = 'none';
    
    if (!email || !password) {
        errorDiv.textContent = 'Veuillez remplir tous les champs.';
        errorDiv.style.display = 'block';
        return;
    }
    
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorDiv.textContent = 'Email ou mot de passe incorrect.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Sauvegarder l'utilisateur connecté
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
    
    // Rediriger vers la page d'accueil
    window.location.href = 'homme.html';
}

function handleLogout() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
    }
}

function getCurrentUser() {
    return getFromStorage(STORAGE_KEYS.CURRENT_USER);
}

function checkAuth() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
    }
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ================================================
// INTERFACE UTILISATEUR
// ================================================

function loadUserInfo() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Mettre à jour tous les éléments avec les infos utilisateur
    const elements = {
        navUserAvatar: currentUser.avatar,
        navUserName: currentUser.fullName,
        sidebarUserAvatar: currentUser.avatar,
        sidebarUserName: currentUser.fullName,
        sidebarUserEmail: currentUser.email,
        createPostAvatar: currentUser.avatar,
        modalUserAvatar: currentUser.avatar,
        modalUserName: currentUser.fullName
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            if (id.includes('Avatar')) {
                element.src = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Mettre à jour le placeholder
    const createPostInput = document.getElementById('createPostInput');
    if (createPostInput) {
        createPostInput.placeholder = `Quoi de neuf, ${currentUser.fullName.split(' ')[0]} ?`;
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Fermer le dropdown si on clique ailleurs
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');
    
    if (dropdown && !userMenu?.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// ================================================
// PUBLICATIONS
// ================================================

let selectedPostImage = null;

function openCreatePostModal(type = null) {
    const modal = document.getElementById('createPostModal');
    modal.classList.add('show');
    document.getElementById('postContent').focus();
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.remove('show');
    document.getElementById('postContent').value = '';
    removePostImage();
}

function handlePostImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedPostImage = e.target.result;
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('postImagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removePostImage() {
    selectedPostImage = null;
    document.getElementById('postImagePreview').style.display = 'none';
    document.getElementById('postImageInput').value = '';
}

function submitPost() {
    const content = document.getElementById('postContent').value.trim();
    const visibility = document.getElementById('postVisibility').value;
    const currentUser = getCurrentUser();
    
    if (!content && !selectedPostImage) {
        alert('Veuillez écrire quelque chose ou ajouter une image.');
        return;
    }
    
    const newPost = {
        id: generateId(),
        userId: currentUser.id,
        author: currentUser.fullName,
        avatar: currentUser.avatar,
        content,
        image: selectedPostImage,
        visibility,
        likes: [],
        comments: [],
        timestamp: Date.now()
    };
    
    const posts = getFromStorage(STORAGE_KEYS.POSTS) || [];
    posts.unshift(newPost);
    saveToStorage(STORAGE_KEYS.POSTS, posts);
    
    closeCreatePostModal();
    loadPosts();
    showToast('Publication créée avec succès !');
}

function loadPosts() {
    const posts = getFromStorage(STORAGE_KEYS.POSTS) || [];
    const postsList = document.getElementById('postsList');
    const noPostsMessage = document.getElementById('noPostsMessage');
    
    if (!postsList) return;
    
    if (posts.length === 0) {
        postsList.innerHTML = '';
        if (noPostsMessage) noPostsMessage.style.display = 'block';
        return;
    }
    
    if (noPostsMessage) noPostsMessage.style.display = 'none';
    
    postsList.innerHTML = posts.map(post => `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}">
                <div class="post-author-info">
                    <h4>${post.author}</h4>
                    <p>${formatTimestamp(post.timestamp)}</p>
                </div>
                <div class="post-options">
                    <button class="btn-icon" onclick="showPostOptions('${post.id}')">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
            <div class="post-content">
                ${post.content ? `<p class="post-text">${post.content}</p>` : ''}
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-stats">
                <span onclick="showLikes('${post.id}')">
                    ${post.likes.length} J'aime
                </span>
                <span onclick="showComments('${post.id}')">
                    ${post.comments.length} Commentaires
                </span>
            </div>
            <div class="post-actions">
                <button class="post-action-btn ${post.likes.includes(getCurrentUser().id) ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                    <i class="fas fa-heart"></i>
                    J'aime
                </button>
                <button class="post-action-btn" onclick="focusComment('${post.id}')">
                    <i class="fas fa-comment"></i>
                    Commenter
                </button>
                <button class="post-action-btn">
                    <i class="fas fa-share"></i>
                    Partager
                </button>
            </div>
            <div class="post-comments" id="comments-${post.id}">
                ${renderComments(post.comments, post.id)}
                <div class="comment-form">
                    <img src="${getCurrentUser().avatar}" alt="Avatar">
                    <input 
                        type="text" 
                        placeholder="Écrivez un commentaire..." 
                        id="comment-input-${post.id}"
                        onkeypress="handleCommentKeyPress(event, '${post.id}')"
                    >
                    <button onclick="submitComment('${post.id}')">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderComments(comments, postId) {
    if (!comments || comments.length === 0) return '';
    
    return comments.map(comment => `
        <div class="comment-item" data-comment-id="${comment.id}">
            <img src="${comment.avatar}" alt="${comment.author}">
            <div>
                <div class="comment-content">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text">${comment.text}</div>
                </div>
                <div class="comment-actions">
                    <span onclick="likeComment('${postId}', '${comment.id}')">
                        ${comment.likes?.includes(getCurrentUser().id) ? '❤️' : 'J\'aime'} 
                        ${comment.likes?.length > 0 ? `(${comment.likes.length})` : ''}
                    </span>
                    <span>${formatTimestamp(comment.timestamp)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleLike(postId) {
    const posts = getFromStorage(STORAGE_KEYS.POSTS) || [];
    const post = posts.find(p => p.id === postId);
    const currentUser = getCurrentUser();
    
    if (!post) return;
    
    const likeIndex = post.likes.indexOf(currentUser.id);
    
    if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1);
    } else {
        post.likes.push(currentUser.id);
        
        // Créer une notification si ce n'est pas notre propre post
        if (post.userId !== currentUser.id) {
            createNotification({
                userId: post.userId,
                type: 'like',
                fromUser: currentUser,
                postId: post.id,
                message: `${currentUser.fullName} a aimé votre publication`
            });
        }
    }
    
    saveToStorage(STORAGE_KEYS.POSTS, posts);
    loadPosts();
}

function focusComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    if (input) input.focus();
}

function handleCommentKeyPress(event, postId) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitComment(postId);
    }
}

function submitComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    
    if (!text) return;
    
    const posts = getFromStorage(STORAGE_KEYS.POSTS) || [];
    const post = posts.find(p => p.id === postId);
    const currentUser = getCurrentUser();
    
    if (!post) return;
    
    const newComment = {
        id: generateId(),
        userId: currentUser.id,
        author: currentUser.fullName,
        avatar: currentUser.avatar,
        text,
        likes: [],
        timestamp: Date.now()
    };
    
    post.comments.push(newComment);
    saveToStorage(STORAGE_KEYS.POSTS, posts);
    
    // Créer une notification si ce n'est pas notre propre post
    if (post.userId !== currentUser.id) {
        createNotification({
            userId: post.userId,
            type: 'comment',
            fromUser: currentUser,
            postId: post.id,
            message: `${currentUser.fullName} a commenté votre publication`
        });
    }
    
    input.value = '';
    loadPosts();
}

function likeComment(postId, commentId) {
    const posts = getFromStorage(STORAGE_KEYS.POSTS) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;
    
    const currentUser = getCurrentUser();
    if (!comment.likes) comment.likes = [];
    
    const likeIndex = comment.likes.indexOf(currentUser.id);
    
    if (likeIndex > -1) {
        comment.likes.splice(likeIndex, 1);
    } else {
        comment.likes.push(currentUser.id);
    }
    
    saveToStorage(STORAGE_KEYS.POSTS, posts);
    loadPosts();
}

function showPostOptions(postId) {
    alert('Options du post : Modifier, Supprimer, Signaler (à implémenter)');
}

function showLikes(postId) {
    alert('Liste des personnes qui aiment ce post (à implémenter)');
}

function showComments(postId) {
    focusComment(postId);
}

// ================================================
// STORIES
// ================================================

let selectedStoryType = null;
let selectedStoryImage = null;
let selectedBackground = 'gradient1';

function openCreateStoryModal() {
    const modal = document.getElementById('createStoryModal');
    modal.classList.add('show');
}

function closeCreateStoryModal() {
    const modal = document.getElementById('createStoryModal');
    modal.classList.remove('show');
    selectedStoryType = null;
    selectedStoryImage = null;
    document.getElementById('textStoryCreator').style.display = 'none';
    document.getElementById('imageStoryCreator').style.display = 'none';
    document.getElementById('storyTextContent').value = '';
    document.getElementById('submitStoryBtn').disabled = true;
}

function selectStoryType(type) {
    selectedStoryType = type;
    
    if (type === 'text') {
        document.getElementById('textStoryCreator').style.display = 'block';
        document.getElementById('imageStoryCreator').style.display = 'none';
    } else if (type === 'image') {
        document.getElementById('textStoryCreator').style.display = 'none';
        document.getElementById('imageStoryCreator').style.display = 'block';
    }
}

function selectBackground(bg) {
    selectedBackground = bg;
    // Mettre à jour visuellement la sélection
    document.querySelectorAll('.bg-option').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

function handleStoryImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedStoryImage = e.target.result;
        document.getElementById('storyPreviewImg').src = e.target.result;
        document.getElementById('storyImagePreview').style.display = 'block';
        document.getElementById('submitStoryBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

function removeStoryImage() {
    selectedStoryImage = null;
    document.getElementById('storyImagePreview').style.display = 'none';
    document.getElementById('storyImageInput').value = '';
    document.getElementById('submitStoryBtn').disabled = true;
}

function submitStory() {
    const currentUser = getCurrentUser();
    let storyData = {};
    
    if (selectedStoryType === 'text') {
        const text = document.getElementById('storyTextContent').value.trim();
        if (!text) {
            alert('Veuillez écrire quelque chose.');
            return;
        }
        
        storyData = {
            id: generateId(),
            userId: currentUser.id,
            author: currentUser.fullName,
            avatar: currentUser.avatar,
            type: 'text',
            content: text,
            background: selectedBackground,
            timestamp: Date.now(),
            views: [],
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
        };
    } else if (selectedStoryType === 'image') {
        if (!selectedStoryImage) {
            alert('Veuillez sélectionner une image.');
            return;
        }
        
        storyData = {
            id: generateId(),
            userId: currentUser.id,
            author: currentUser.fullName,
            avatar: currentUser.avatar,
            type: 'image',
            image: selectedStoryImage,
            timestamp: Date.now(),
            views: [],
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
        };
    }
    
    const stories = getFromStorage(STORAGE_KEYS.STORIES) || [];
    stories.unshift(storyData);
    saveToStorage(STORAGE_KEYS.STORIES, stories);
    
    closeCreateStoryModal();
    loadAllStories();
    showToast('Story publiée avec succès !');
}

function loadAllStories() {
    let stories = getFromStorage(STORAGE_KEYS.STORIES) || [];
    const currentTime = Date.now();
    
    // Filtrer les stories expirées
    stories = stories.filter(story => story.expiresAt > currentTime);
    saveToStorage(STORAGE_KEYS.STORIES, stories);
    
    // Charger sur la page d'accueil
    const storiesList = document.getElementById('storiesList');
    if (storiesList) {
        storiesList.innerHTML = stories.slice(0, 5).map(story => `
            <div class="story-card" style="background-image: url('${story.type === 'image' ? story.image : ''}');" onclick="viewStory('${story.id}')">
                <img src="${story.avatar}" alt="${story.author}" style="width: 40px; height: 40px; border-radius: 50%; position: absolute; top: 10px; left: 10px; border: 2px solid white;">
                <div style="position: absolute; bottom: 10px; left: 10px; color: white; font-size: 12px; font-weight: 600;">${story.author}</div>
            </div>
        `).join('');
    }
    
    // Charger sur la page stories
    const friendsStoriesList = document.getElementById('friendsStoriesList');
    if (friendsStoriesList) {
        if (stories.length === 0) {
            friendsStoriesList.innerHTML = '<p class="no-data">Aucune story disponible</p>';
        } else {
            friendsStoriesList.innerHTML = stories.map(story => `
                <div class="story-item" onclick="viewStory('${story.id}')">
                    <div class="story-item-avatar">
                        <img src="${story.avatar}" alt="${story.author}">
                    </div>
                    <div class="story-item-info">
                        <h4>${story.author}</h4>
                        <p>${formatTimestamp(story.timestamp)}</p>
                    </div>
                </div>
            `).join('');
        }
    }
}

function viewStory(storyId) {
    const stories = getFromStorage(STORAGE_KEYS.STORIES) || [];
    const story = stories.find(s => s.id === storyId);
    
    if (!story) return;
    
    // Marquer la story comme vue
    const currentUser = getCurrentUser();
    if (!story.views.includes(currentUser.id)) {
        story.views.push(currentUser.id);
        saveToStorage(STORAGE_KEYS.STORIES, stories);
    }
    
    const storyViewer = document.getElementById('storyViewer');
    const noStorySelected = document.getElementById('noStorySelected');
    const storyContent = document.getElementById('storyContent');
    const storyAuthorAvatar = document.getElementById('storyAuthorAvatar');
    const storyAuthorName = document.getElementById('storyAuthorName');
    const storyTime = document.getElementById('storyTime');
    
    if (!storyViewer) return;
    
    noStorySelected.style.display = 'none';
    storyAuthorAvatar.src = story.avatar;
    storyAuthorName.textContent = story.author;
    storyTime.textContent = formatTimestamp(story.timestamp);
    
    if (story.type === 'text') {
        const gradients = {
            gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            gradient5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        };
        
        storyContent.innerHTML = `
            <div class="story-text-content" style="background: ${gradients[story.background]}">
                ${story.content}
            </div>
        `;
    } else if (story.type === 'image') {
        storyContent.innerHTML = `<img src="${story.image}" alt="Story">`;
    }
    
    // Démarrer la barre de progression (5 secondes)
    startStoryProgress();
}

function startStoryProgress() {
    const progressBar = document.getElementById('storyProgress');
    if (!progressBar) return;
    
    progressBar.style.width = '0%';
    
    let width = 0;
    const interval = setInterval(() => {
        width += 2;
        progressBar.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            nextStory();
        }
    }, 100); // 5 secondes total
}

function previousStory() {
    // À implémenter : naviguer vers la story précédente
    alert('Story précédente (à implémenter)');
}

function nextStory() {
    // À implémenter : naviguer vers la story suivante
    alert('Story suivante (à implémenter)');
}

function closeStoryViewer() {
    window.location.href = 'homme.html';
}

function sendStoryReply() {
    const input = document.getElementById('storyReplyInput');
    const reply = input.value.trim();
    
    if (!reply) return;
    
    alert('Réponse envoyée : ' + reply);
    input.value = '';
}

// ================================================
// MESSAGERIE
// ================================================

function loadConversations() {
    const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS) || [];
    const conversationsList = document.getElementById('conversationsList');
    const noConversations = document.getElementById('noConversations');
    
    if (!conversationsList) return;
    
    if (conversations.length === 0) {
        conversationsList.innerHTML = '';
        if (noConversations) noConversations.style.display = 'block';
        return;
    }
    
    if (noConversations) noConversations.style.display = 'none';
    
    conversationsList.innerHTML = conversations.map(conv => `
        <div class="conversation-item ${currentConversation?.userId === conv.userId ? 'active' : ''}" onclick="openConversation('${conv.userId}')">
            <img src="${conv.avatar}" alt="${conv.name}">
            <div class="conversation-info">
                <h4>${conv.name}</h4>
                <p>${conv.lastMessage || 'Aucun message'}</p>
            </div>
            <div class="conversation-meta">
                <div class="conversation-time">${conv.lastMessageTime ? formatTimestamp(conv.lastMessageTime) : ''}</div>
                ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function openConversation(userId) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    currentConversation = {
        userId: user.id,
        name: user.fullName,
        avatar: user.avatar
    };
    
    document.getElementById('noChatSelected').style.display = 'none';
    document.getElementById('chatHeader').style.display = 'flex';
    document.getElementById('chatInputArea').style.display = 'flex';
    
    document.getElementById('chatUserAvatar').src = user.avatar;
    document.getElementById('chatUserName').textContent = user.fullName;
    
    loadMessages(userId);
    loadConversations();
}

function loadMessages(userId) {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES) || [];
    const currentUser = getCurrentUser();
    
    const conversationMessages = messages.filter(m => 
        (m.senderId === currentUser.id && m.receiverId === userId) ||
        (m.senderId === userId && m.receiverId === currentUser.id)
    );
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = conversationMessages.map(msg => `
        <div class="message-item ${msg.senderId === currentUser.id ? 'sent' : ''}">
            <img src="${msg.senderAvatar}" alt="${msg.senderName}">
            <div class="message-content">
                <div class="message-bubble">${msg.text}</div>
                <div class="message-time">${formatTimestamp(msg.timestamp)}</div>
            </div>
        </div>
    `).join('');
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text || !currentConversation) return;
    
    const currentUser = getCurrentUser();
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES) || [];
    
    const newMessage = {
        id: generateId(),
        senderId: currentUser.id,
        senderName: currentUser.fullName,
        senderAvatar: currentUser.avatar,
        receiverId: currentConversation.userId,
        text,
        timestamp: Date.now(),
        read: false
    };
    
    messages.push(newMessage);
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    
    // Mettre à jour la conversation
    updateConversation(currentConversation.userId, text);
    
    // Créer une notification
    createNotification({
        userId: currentConversation.userId,
        type: 'message',
        fromUser: currentUser,
        message: `${currentUser.fullName} vous a envoyé un message`
    });
    
    input.value = '';
    loadMessages(currentConversation.userId);
}

function updateConversation(userId, lastMessage) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    let conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS) || [];
    const convIndex = conversations.findIndex(c => c.userId === userId);
    
    const convData = {
        userId: user.id,
        name: user.fullName,
        avatar: user.avatar,
        lastMessage,
        lastMessageTime: Date.now(),
        unread: 0
    };
    
    if (convIndex > -1) {
        conversations[convIndex] = convData;
    } else {
        conversations.push(convData);
    }
    
    saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
    loadConversations();
}

function openNewMessageModal() {
    const modal = document.getElementById('newMessageModal');
    modal.classList.add('show');
    loadFriendsForMessage();
}

function closeNewMessageModal() {
    const modal = document.getElementById('newMessageModal');
    modal.classList.remove('show');
}

function loadFriendsForMessage() {
    const currentUser = getCurrentUser();
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const friends = users.filter(u => u.id !== currentUser.id);
    
    const friendsList = document.getElementById('friendsListForMessage');
    if (!friendsList) return;
    
    friendsList.innerHTML = friends.map(friend => `
        <div class="friend-request-item" onclick="startNewConversation('${friend.id}')">
            <img src="${friend.avatar}" alt="${friend.fullName}">
            <div class="friend-request-info">
                <h4>${friend.fullName}</h4>
                <p>@${friend.username}</p>
            </div>
        </div>
    `).join('');
}

function startNewConversation(userId) {
    closeNewMessageModal();
    openConversation(userId);
}

function searchConversations() {
    const searchTerm = document.getElementById('searchConversations').value.toLowerCase();
    const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS) || [];
    
    const filtered = conversations.filter(conv => 
        conv.name.toLowerCase().includes(searchTerm)
    );
    
    // Recharger avec les résultats filtrés (à implémenter complètement)
    console.log('Recherche:', filtered);
}

function searchFriendsForMessage() {
    const searchTerm = document.getElementById('searchFriends').value.toLowerCase();
    const currentUser = getCurrentUser();
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    
    const filtered = users.filter(u => 
        u.id !== currentUser.id && 
        (u.fullName.toLowerCase().includes(searchTerm) || u.username.toLowerCase().includes(searchTerm))
    );
    
    const friendsList = document.getElementById('friendsListForMessage');
    if (!friendsList) return;
    
    friendsList.innerHTML = filtered.map(friend => `
        <div class="friend-request-item" onclick="startNewConversation('${friend.id}')">
            <img src="${friend.avatar}" alt="${friend.fullName}">
            <div class="friend-request-info">
                <h4>${friend.fullName}</h4>
                <p>@${friend.username}</p>
            </div>
        </div>
    `).join('');
}

// ================================================
// NOTIFICATIONS
// ================================================

function createNotification(data) {
    const notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    
    const notification = {
        id: generateId(),
        userId: data.userId,
        type: data.type,
        fromUserId: data.fromUser.id,
        fromUserName: data.fromUser.fullName,
        fromUserAvatar: data.fromUser.avatar,
        message: data.message,
        postId: data.postId || null,
        timestamp: Date.now(),
        read: false,
        seen: false
    };
    
    notifications.unshift(notification);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
}

function loadNotifications() {
    const currentUser = getCurrentUser();
    let notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    
    // Filtrer les notifications de l'utilisateur actuel
    notifications = notifications.filter(n => n.userId === currentUser.id);
    
    const notificationsList = document.getElementById('notificationsList');
    const noNotifications = document.getElementById('noNotifications');
    
    if (!notificationsList) return;
    
    // Appliquer le filtre actuel
    let filteredNotifications = notifications;
    if (currentFilter === 'unread') {
        filteredNotifications = notifications.filter(n => !n.read);
    } else if (currentFilter !== 'all') {
        const typeMap = {
            'likes': 'like',
            'comments': 'comment',
            'friends': 'friend_request',
            'messages': 'message'
        };
        filteredNotifications = notifications.filter(n => n.type === typeMap[currentFilter]);
    }
    
    if (filteredNotifications.length === 0) {
        notificationsList.innerHTML = '';
        if (noNotifications) noNotifications.style.display = 'block';
        return;
    }
    
    if (noNotifications) noNotifications.style.display = 'none';
    
    const iconMap = {
        'like': { icon: 'fa-heart', class: 'like' },
        'comment': { icon: 'fa-comment', class: 'comment' },
        'friend_request': { icon: 'fa-user-plus', class: 'friend' },
        'message': { icon: 'fa-envelope', class: 'message' }
    };
    
    notificationsList.innerHTML = filteredNotifications.map(notif => {
        const icon = iconMap[notif.type] || { icon: 'fa-bell', class: '' };
        
        return `
            <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="handleNotificationClick('${notif.id}')">
                <div class="notification-icon">
                    <img src="${notif.fromUserAvatar}" alt="${notif.fromUserName}">
                    <div class="notification-badge ${icon.class}">
                        <i class="fas ${icon.icon}"></i>
                    </div>
                </div>
                <div class="notification-content">
                    <p>
                        <strong>${notif.fromUserName}</strong> ${notif.message.replace(notif.fromUserName, '')}
                    </p>
                    <div class="notification-time">${formatTimestamp(notif.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function handleNotificationClick(notificationId) {
    const notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification) return;
    
    // Marquer comme lu
    notification.read = true;
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    
    // Rediriger selon le type
    if (notification.type === 'like' || notification.type === 'comment') {
        window.location.href = 'homme.html';
    } else if (notification.type === 'message') {
        window.location.href = 'message.html';
    } else if (notification.type === 'friend_request') {
        showFriends();
    }
    
    loadNotifications();
}

function filterNotifications(filter) {
    currentFilter = filter;
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadNotifications();
}

function markAllAsRead() {
    const currentUser = getCurrentUser();
    let notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    
    notifications.forEach(n => {
        if (n.userId === currentUser.id) {
            n.read = true;
        }
    });
    
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    loadNotifications();
    updateNotificationBadges();
    showToast('Toutes les notifications ont été marquées comme lues');
}

function markNotificationsAsSeen() {
    const currentUser = getCurrentUser();
    let notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    
    notifications.forEach(n => {
        if (n.userId === currentUser.id) {
            n.seen = true;
        }
    });
    
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    updateNotificationBadges();
}

function updateNotificationBadges() {
    const currentUser = getCurrentUser();
    const notifications = getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES) || [];
    
    // Compter les notifications non vues
    const unreadNotifications = notifications.filter(n => 
        n.userId === currentUser.id && !n.seen
    ).length;
    
    // Compter les messages non lus
    const unreadMessages = messages.filter(m => 
        m.receiverId === currentUser.id && !m.read
    ).length;
    
    // Mettre à jour les badges
    const notificationBadge = document.getElementById('notificationBadge');
    const messageBadge = document.getElementById('messageBadge');
    
    if (notificationBadge) {
        notificationBadge.textContent = unreadNotifications;
        notificationBadge.style.display = unreadNotifications > 0 ? 'block' : 'none';
    }
    
    if (messageBadge) {
        messageBadge.textContent = unreadMessages;
        messageBadge.style.display = unreadMessages > 0 ? 'block' : 'none';
    }
}

function saveNotificationSetting(setting, enabled) {
    const settings = getFromStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS) || {};
    settings[setting] = enabled;
    saveToStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, settings);
}

// ================================================
// AMIS
// ================================================

function loadFriendRequests() {
    const currentUser = getCurrentUser();
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    
    // Simuler quelques demandes d'amis (à remplacer par de vraies données)
    const otherUsers = users.filter(u => u.id !== currentUser.id).slice(0, 3);
    
    const friendRequestsList = document.getElementById('friendRequestsList');
    if (!friendRequestsList) return;
    
    if (otherUsers.length === 0) {
        friendRequestsList.innerHTML = '<p class="no-data">Aucune demande d\'amis</p>';
        return;
    }
    
    friendRequestsList.innerHTML = otherUsers.map(user => `
        <div class="friend-request-item">
            <img src="${user.avatar}" alt="${user.fullName}">
            <div class="friend-request-info">
                <h4>${user.fullName}</h4>
                <p>@${user.username}</p>
                <div class="friend-request-actions">
                    <button class="accept" onclick="acceptFriendRequest('${user.id}')">Accepter</button>
                    <button class="decline" onclick="declineFriendRequest('${user.id}')">Refuser</button>
                </div>
            </div>
        </div>
    `).join('');
}

function acceptFriendRequest(userId) {
    showToast('Demande d\'ami acceptée !');
    loadFriendRequests();
}

function declineFriendRequest(userId) {
    showToast('Demande d\'ami refusée');
    loadFriendRequests();
}

function loadOnlineContacts() {
    const currentUser = getCurrentUser();
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const contacts = users.filter(u => u.id !== currentUser.id).slice(0, 8);
    
    const contactsList = document.getElementById('onlineContactsList');
    if (!contactsList) return;
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p class="no-data">Aucun contact</p>';
        return;
    }
    
    contactsList.innerHTML = contacts.map(contact => `
        <div class="contact-item" onclick="openConversation('${contact.id}')">
            <img src="${contact.avatar}" alt="${contact.fullName}">
            <div class="contact-info">
                <h4>${contact.fullName}</h4>
            </div>
            <div class="contact-status"></div>
        </div>
    `).join('');
}

function showFriends() {
    alert('Page de gestion des amis (à implémenter)');
}

function showAllFriendRequests() {
    alert('Toutes les demandes d\'amis (à implémenter)');
}

// ================================================
// UTILITAIRES
// ================================================

function formatTimestamp(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showProfile() {
    alert('Page de profil (à implémenter)');
}

function showSettings() {
    alert('Page de paramètres (à implémenter)');
}

function showGroups() {
    alert('Page des groupes (à implémenter)');
}

function showPhotos() {
    alert('Page des photos (à implémenter)');
}

function showVideos() {
    alert('Page des vidéos (à implémenter)');
}

function searchContacts() {
    alert('Recherche de contacts (à implémenter)');
}

function startVideoCall() {
    alert('Appel vidéo (à implémenter)');
}

function startVoiceCall() {
    alert('Appel vocal (à implémenter)');
}

function toggleChatInfo() {
    const panel = document.getElementById('chatInfoPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

function viewProfile() {
    alert('Voir le profil (à implémenter)');
}

function muteConversation() {
    showToast('Notifications désactivées pour cette conversation');
}

function deleteConversation() {
    if (confirm('Voulez-vous vraiment supprimer cette conversation ?')) {
        showToast('Conversation supprimée');
    }
}

function openEmojiPicker() {
    alert('Sélecteur d\'émojis (à implémenter)');
}

function handleMessageImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
        alert('Envoi d\'image dans les messages (à implémenter)');
    }
}

// ================================================
// INITIALISATION
// ================================================

console.log('Unova - Scripts chargés avec succès !');
console.log('Version: 1.0.0');
console.log('Date: 2026-01-14');
