// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('@electron/remote');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require("path");

// Window Controls
(function handleWindowControls() {
    // When document has loaded, initialise
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        win = remote.getCurrentWindow();

        // DOM Button capture
        minButton = document.getElementById('min-button'),
            maxButton = document.getElementById('max-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button'),
            homeButton = document.getElementById('home-button'),
            addPillButton = document.getElementById('add-pill-button');

        addPillButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            ipcRenderer.send('init-add-pill-window');

        });

        homeButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
        });

        minButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.minimize();
        });

        maxButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.maximize();
            toggleMaxRestoreButtons();
        });

        restoreButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.unmaximize();
            toggleMaxRestoreButtons();
        });



        // Toggle maximise/restore buttons when maximisation/unmaximisation
        // occurs by means other than button clicks e.g. double-clicking
        // the title bar:
        toggleMaxRestoreButtons();
        win.on('maximize', toggleMaxRestoreButtons);
        win.on('unmaximize', toggleMaxRestoreButtons);

        closeButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.close();
        });

        function toggleMaxRestoreButtons() {
            win = remote.getCurrentWindow();
            if (win.isMaximized()) {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
    }
})();

// Medication Handling
const deleteMed = (e) => {
    ipcRenderer.send('delete-med', e.target.textContent);
}

ipcRenderer.on('meds', (event, meds) => {
    // Get Medication List ul
    const medList = document.getElementById('medication-list');

    // Create html string
    const MedItems = meds.reduce((html, med) => {
        html += `<li class="med-item">
        <div>
            <img src='${med.icon}'></img>
            <div>${med.generic_name}</div>
        </div>
        <div class="current-inventory">${med.current_inventory}</div>
        </li>`
        return html
    }, '')
    console.log(medList);
    // populate medList with meds
    medList.innerHTML = MedItems;

    medList.querySelectorAll('.med-item').forEach(item => {
        item.addEventListener('click', deleteMed)
    })
})