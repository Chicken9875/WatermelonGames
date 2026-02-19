const gameGrid = document.getElementById('game-grid');

// 1. Fetch Games
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games;
        displayGames(games);
    })
    .catch(err => console.error("Error loading games:", err));

// 2. Display "Cool Buttons"
function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<h3>${game.title}</h3>`;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// 3. The "Launch" Fix
function openGame(url) {
    const overlay = document.getElementById('game-overlay');
    const frame = document.getElementById('game-frame');
    
    // Show the overlay
    overlay.classList.remove('hidden');
    
    // Set the source
    frame.src = url;

    // Check if the game is failing to load (common with proxies)
    frame.onerror = function() {
        alert("This game is being blocked by the school filter. Opening in Stealth Mode...");
        window.open(url, '_blank');
    };
}

function closeGame() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = ""; // Stops audio
}

function fullscreenGame() {
    const frame = document.getElementById('game-frame');
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen(); // iPad support
}

// 4. Tab Cloak & Panic Key
window.addEventListener('keydown', (e) => {
    if (e.key === "q") { // Set your panic key here
        window.location.href = "https://classroom.google.com";
    }
});
