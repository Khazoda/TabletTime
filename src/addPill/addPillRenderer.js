const remote = require('@electron/remote')
const { ipcRenderer } = require('electron');


(function handleWindowControls() {

    // When document has loaded, initialise
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let win = remote.getCurrentWindow();
        closeButton = document.getElementById('close-button');

        closeButton.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.close();
        });
    }


})();