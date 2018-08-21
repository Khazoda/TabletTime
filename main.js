const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
let mainWin = null;
const loadingScreen = 'src/loading.html';
const mainScreen = 'src/index.html';
loadMain(loadingScreen, mainScreen);
});

function loadMain(loadingScreen,mainScreen) {
    mainWin = new BrowserWindow({width: 800, minWidth: 560, height: 800, minHeight: 600, frame:false, show:false, backgroundColor: '#2e2c29'});
    mainWin.loadFile(mainScreen);

    loadingWin = loadSplash(loadingScreen);
    mainWin.once('ready-to-show', () => {
        mainWin.show();
        loadingWin.hide();
        loadingWin.close(); 
    })
};

function  loadSplash (loadingScreen) {
    let loadingWin = new BrowserWindow({width: 800, height: 800,transparent:true, frame:false, show:false});

    loadingWin.loadFile(loadingScreen);
    loadingWin.once('ready-to-show', () => {
        loadingWin.show();
        return loadingWin;
    })
};



app.on('window-all-closed', () => {
    app.quit();
  });