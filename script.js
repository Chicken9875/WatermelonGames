function launchProxy() {
    let input = document.getElementById('url-input').value;
    
    // Auto-search if it's not a URL
    if (!input.includes('.') && input !== "") {
        input = "https://www.google.com/search?q=" + input;
    } else if (!input.startsWith('http')) {
        input = "https://" + input;
    }

    // Proxy Engine (Using the one you liked)
    const proxyBase = "https://mehmetgayalo.southern.com.my/main/";
    const finalUrl = proxyBase + input;

    // FIX: Launch about:blank correctly
    const win = window.open('about:blank', '_blank');
    if (!win) {
        alert("Please allow pop-ups for this research tool to work.");
        return;
    }

    // Force the document content so it doesn't stay white
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Research Portal | ReadifyELA</title>
            <style>
                body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
                iframe { width: 100%; height: 100%; border: none; }
            </style>
        </head>
        <body>
            <iframe src="${finalUrl}"></iframe>
        </body>
        </html>
    `);
    win.document.close();
}

// Enter key support
document.getElementById("url-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") launchProxy();
});
