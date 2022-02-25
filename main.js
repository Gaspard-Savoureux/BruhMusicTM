const {
  //
  BrowserWindow,
  app,
  ipcMain,
  Notification,
} = require('electron');
const path = require('path');
const Store = require('electron-store');
const isDev = !app.isPackaged;

const store = new Store();

// IPC listener
ipcMain.on('electron-store-get', async (e, val) => {
  e.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // win.setMenu(null);
  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show();
});

app.commandLine.appendSwitch('no-sandbox');
app.whenReady().then(createWindow);
