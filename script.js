const gameGrid = document.getElementById('game-grid');

// 1. Fetch & Display Games
fetch('games.json')
    .then(res => res.json())
    .then(games => {
        window.allGames = games;
        displayGames(games);
    });

function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = `game-card ${game.status === 'offline' ? 'offline' : ''}`;
        
        // Adds the "Offline" tag if needed
        const statusHTML = game.status === 'offline' ? '<span class="status-tag">OFFLINE</span>' : '<span class="status-tag online">ONLINE</span>';
        
        card.innerHTML = `
            ${statusHTML}
            <h3>${game.title}</h3>
        `;
        
        card.onclick = () => {
            if (game.launch === 'tab') {
                launchStealthTab(game.url);
            } else {
                openGame(game.url);
            }
        };
        gameGrid.appendChild(card);
    });
}

// 2. The "Stealth Tab" Fix (about:blank)
function launchStealthTab(url) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = url;
    win.document.body.appendChild(iframe);
}

// 3. Normal Overlay Launch
function openGame(url) {
    const overlay = document.getElementById('game-overlay');
    const frame = document.getElementById('game-frame');
    overlay.classList.remove('hidden');
    frame.src = url;
}

function closeGame() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
}
