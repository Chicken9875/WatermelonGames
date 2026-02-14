// Function to show/hide settings
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// Tab Cloak Function
function changeTabName(name) {
    document.title = name || "Watermelon Games";
}

// Panic Key Listener
window.addEventListener('keydown', function(e) {
    const pKey = document.getElementById('panic-key').value;
    const pUrl = document.getElementById('panic-url').value;
    
    if (pKey && e.key === pKey) {
        window.location.href = pUrl || "https://google.com";
    }
});

// ... Keep your other game fetching and display functions below this ...
