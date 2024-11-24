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
        nodeIntegration: false,
        contextIsolation: false, // Змінюємо на false для спрощення
        devTools: true,
        enableRemoteModule: false,
        webSecurity: false, 
      }
    }); 


    
    
    const startUrl = isDev
      ? 'http://localhost:5173'
      : url.format({
          pathname: path.join(__dirname, '../dist/index.html'),
          protocol: 'file:',
          slashes: true
        });

    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
          callback({
            responseHeaders: {
              ...details.responseHeaders,
              'Content-Security-Policy': [
                "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://server-for-card-app.onrender.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
              ]
            }
          });
        });        

    mainWindow.loadURL(startUrl);

    
    mainWindow.webContents.openDevTools();

    // Налаштування CSP
    

    
    // Додаємо обробник помилок завантаження
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Failed to load:', errorCode, errorDescription);
    });

    // Перевіряємо завантаження контенту
   /*  mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.executeJavaScript(`
        try {
          console.log('Document Ready');
          console.log('Root element:', document.getElementById('root'));
          console.log('React loaded:', typeof React);
          console.log('ReactDOM loaded:', typeof ReactDOM);
          console.log('Current location:', window.location.href);
          console.log('Assets loaded:', {
            css: document.styleSheets.length,
            scripts: document.scripts.length
          });
        } catch (error) {
          console.error('Error during script execution:', error);
        }
      `).catch((error) => {
        console.error('Failed to execute script:', error);
      });
    }); */
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});