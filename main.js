const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

app.on('ready', () => {
let mainWin = null;
const loadingScreen = 'src/loading/loading.html';
const mainScreen = 'src/index/index.html';

loadMain(loadingScreen, mainScreen);
});

function loadMain(loadingScreen,mainScreen) {
    mainWin = new BrowserWindow({width: 800, height: 800, minWidth: 560, minHeight: 600, frame:false, show:false, backgroundColor: '#2e2c29'});
    mainWin.loadFile(mainScreen);
    loadingWin = loadSplash(loadingScreen);
    mainWin.once('ready-to-show', () => {
        loadingWin.hide();
        loadingWin.close(); 
        mainWin.show();
    })
};

function  loadSplash (loadingScreen) {
    let loadingWin = new BrowserWindow({width: 800, height: 800, parent:mainWin,transparent:true, frame:false, show:false});
    loadingWin.loadFile(loadingScreen);
    loadingWin.once('ready-to-show', () => {
        loadingWin.show();
    })
    return loadingWin;
};

ipcMain.on('init-add-pill-window', (event) => {
    const addPillScreen = 'src/addPill/addPill.html';
    let addPillWin = new BrowserWindow({width: 400, height: 800, parent:mainWin, frame: false, show: true, backgroundColor: '#2e2c29'});
    addPillWin.loadFile(addPillScreen);
    addPillWin.once('ready-to-show', () => {
        addPillWin.show();
    })
});

app.on('window-all-closed', () => {
    app.quit();
  });