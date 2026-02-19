const gameGrid = document.getElementById('game-grid');

// Load games from JSON
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        window.allGames = data;
        displayGames(data);
    });

function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail || 'https://via.placeholder.com/150'}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

function openGame(url) {
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function closeGame() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
}

function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
}
