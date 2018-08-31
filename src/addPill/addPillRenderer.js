const electron = require('electron');
const remote = require('electron').remote;
const { ipcRenderer } = require('electron');

(function handleWindowControls() {
    // When document has loaded, initialise
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init(){
        let window = remote.getCurrentWindow();
        closeButton = document.getElementById('close-button');

        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.close();
        });
    }
})();