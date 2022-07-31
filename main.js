const { app, BrowserWindow } = require('electron');
const { truncate } = require('fs');
const path = require("path");
const url = require('url');
const serve = require('electron-serve')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
const loadURL = serve({directory: 'dist'});

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        frame: true,
        transparent:true,
        webPreferences:{nodeIntegration:truncate},
        title:'Flash Card App',

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true, 
            useContentSize: true,
            preload: path.join(__dirname, 'preload.js')
            
        },
        icon: `file://${__dirname}/dist/assets/fuji.png`,
    })
    // win.setMenuBarVisibility(false);
    loadURL(win);
    // win.loadFile(path.join(__dirname, `/dist/index.html`));
}
/** Application prête, on charge un  */
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }

});