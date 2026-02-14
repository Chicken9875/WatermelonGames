const gameGrid = document.getElementById('game-grid');

// Fetch and display games
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games; // Save for filtering
        displayGames(games);
    });

function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// Search Logic
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
}

// Dark/Light Mode Logic
function toggleMode() {
    document.body.classList.toggle('light-mode');
    const btn = document.getElementById('mode-toggle');
    btn.innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
}

function openGame(url) {
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

document.getElementById('close-btn').onclick = () => {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
};
