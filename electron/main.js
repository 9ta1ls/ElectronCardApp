import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import isDev from 'electron-is-dev'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Підключаємо preload.js
        nodeIntegration: false, // Вимикаємо Node.js у рендерінговому процесі для безпеки
        contextIsolation: true,  // Включаємо ізоляцію контексту для додаткового захисту
        devTools: true, // Дозволити DevTools

      }
    }); 
    
    const startUrl = isDev
    ? 'http://localhost:5173' // Переконайтесь, що це ваш порт Vite
    : `file://${path.join(__dirname, '../dist/index.html')}`; // Завантажуємо збірку у продакшні

   mainWindow.loadURL(startUrl, {
    extraHeaders: 'Content-Security-Policy: default-src \'self\'; connect-src \'self\' http://localhost:3000;'
  });
  
    mainWindow.webContents.openDevTools();
  }


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
