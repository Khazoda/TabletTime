const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
// Initialize remote module
let remoteMain = require('@electron/remote/main');
remoteMain.initialize();

// Constants
const DataStore = require("./DataStore.js");
const medsData = new DataStore({ name: "Meds Main" })

app.on('ready', () => {
    const loadingScreen = 'src/loading/loading.html';
    const mainScreen = 'src/index/index.html';

    loadMain(loadingScreen, mainScreen);
});

function loadMain(loadingScreen, mainScreen) {

    mainWin = new BrowserWindow({
        width: 800, height: 800, minWidth: 560, minHeight: 600, frame: false, show: false, center: true, backgroundColor: '#202226', webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    remoteMain.enable(mainWin.webContents);

    mainWin.loadFile(mainScreen);
    loadingWin = loadSplash(loadingScreen);


    mainWin.once('ready-to-show', () => {
        loadingWin.hide();
        loadingWin.close();
        mainWin.show();
    })

    // Initialize mainWin with meds
    mainWin.once('show', () => {
        mainWin.webContents.send('meds', medsData.meds)
    })

};

function loadSplash(loadingScreen) {
    let loadingWin = new BrowserWindow({
        width: 800, height: 800, parent: mainWin, transparent: true, frame: false, show: false, webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    remoteMain.enable(loadingWin.webContents);

    loadingWin.loadFile(loadingScreen);
    loadingWin.once('ready-to-show', () => {
        loadingWin.show();
    })
    return loadingWin;
};

// Initialize empty var to check existence against
let addPillWin = null;

ipcMain.on('init-add-pill-window', (event) => {
    const addPillScreen = 'src/addPill/addPill.html';
    if (!addPillWin) {
        addPillWin = new BrowserWindow({
            width: 400, height: 800, minWidth: 400, minHeight: 800, parent: mainWin, transparent: false, frame: false, show: true, backgroundColor: '#202226', webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            }
        });

        remoteMain.enable(addPillWin.webContents);

        addPillWin.loadFile(addPillScreen);

        var mainWinSize = mainWin.getSize();
        var mainWinPosition = mainWin.getPosition();
        var mainCentre = [mainWinSize[0] / 2, mainWinSize[1] / 2];

        if (mainWin.isMaximized() == true) {
            addPillWin.setPosition(mainWinPosition[0] + mainWinSize[0] - 400, mainWinPosition[1] + mainWinSize[1] / 2 / 2); /*change the y value if the positioning ends up being unsatisfactory*/
        } else {
            addPillWin.setPosition(mainWinPosition[0] + mainWinSize[0], mainWinPosition[1]); /* offsetting the add pill window to the right of the main window*/
        }


        addPillWin.once('ready-to-show', () => {
            console.log("Add Pill Window Loaded.")
            addPillWin.show();
        })
        addPillWin.on('closed', () => {
            addPillWin = null;
        })
    }
});

ipcMain.on('add-med', (event, med) => {
    const updatedMeds = medsData.addMed(med).meds;
    mainWin.send('meds', updatedMeds);
})

ipcMain.on('delete-med', (event, med) => {
    const updatedMeds = medsData.deleteMed(med).meds;
    mainWin.send('meds', updatedMeds);
})


app.on('window-all-closed', () => {
    app.quit();
});