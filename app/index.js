const { app, BrowserWindow, shell } = require("electron");
const { fork } = require("child_process");
let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    // webPreferences: {
    //   nodeIntegration: true,
    // },
  });

  win.setMenu(null);

  // Charger votre fichier HTML
  win.loadFile("../frontend/build/index.html");

  // Ouvrir les outils de développement
  // win.webContents.openDevTools();

  // Créer une instance du processus Node.js pour exécuter le serveur
  backendProcess = fork("../backend/server.js");

}

app.whenReady().then(() => {
  createWindow();
});

// Quitter l'application lorsque toutes les fenêtres sont fermées
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
