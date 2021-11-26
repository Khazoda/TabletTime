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

// Form Handling
document.getElementById('form-container').addEventListener('submit', (e) => {
    // Prevents default form refresh behaviour
    e.preventDefault();

    const input = e.target[0]

    ipcRenderer.send('add-med', input.value)

    input.value = ''
})