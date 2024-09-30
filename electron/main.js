import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Підключаємо preload.js
        nodeIntegration: false, // Вимикаємо Node.js у рендерінговому процесі для безпеки
        contextIsolation: true  // Включаємо ізоляцію контексту для додаткового захисту
      }
    });
  
    win.loadFile(path.join(__dirname, 'index.html')); // Заміна на ваш HTML файл
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
