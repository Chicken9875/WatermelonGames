// --- Existing Game Logic ---
const gameGrid = document.getElementById('game-grid');

fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games;
        displayGames(games);
    });

function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<img src="${game.thumbnail}" alt="${game.title}"><h3>${game.title}</h3>`;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// --- Search & Dark Mode ---
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
    document.getElementById('mode-toggle').innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
}

// --- Settings, Panic Key, & Tab Cloak ---
function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('hidden');
}

function changeTabName(name) {
    document.title = name || "Watermelon Games";
}

// Panic Key Listener
window.addEventListener('keydown', function(e) {
    const panicKey = document.getElementById('panic-key').value;
    const panicUrl = document.getElementById('panic-url').value;
    
    if (panicKey && e.key === panicKey) {
        window.location.href = panicUrl || "https://www.google.com";
    }
});

function openGame(url) {
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

document.getElementById('close-btn').onclick = () => {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
};
