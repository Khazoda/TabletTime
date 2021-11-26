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

    // target[0]: Medication Brand Name
    // target[1]: Medication Generic Name
    // target[2]: Medication Dosage
    // target[3]: Medication Take-At Time
    // target[4]: Medication AM or PM
    // target[5]: Medication Further Notes
    // target[6]: Medication Icon
    // target[7]: Medication Current Inventory
    const input = {
        brand_name: e.target[0].value,
        generic_name: e.target[1].value,
        dosage: e.target[2].value,
        take_at_time: e.target[3].value,
        am_pm: e.target[4].value,
        icon: e.target[5].value,
        current_inventory: e.target[6].value,
        further_notes: e.target[7].value,
    }
    // If user did not pick an icon, assign a default
    if (input.icon == "") {
        input.icon = "resources/default_pill.png";
    }
    ipcRenderer.send('add-med', input)

    input.value = ''
})