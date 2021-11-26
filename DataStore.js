const Store = require('electron-store');
class DataStore extends Store {
    constructor(settings) {
        super(settings)
        // Initialize with JSON meds or an empty array
        this.meds = this.get('meds') || []
    }

    saveMeds() {
        // Save meds to JSON
        this.set("meds", this.meds)
        // Allows method chaining
        return this
    }

    getMeds() {
        // Load meds from JSON into meds variable
        this.meds = this.get('meds') || []
        // Allows method chaining
        return this
    }

    addMed(med) {
        // Merge new medication with existing meds
        this.meds = [...this.meds, med]
        return this.saveMeds()
    }

    deleteMed(med) {
        // Filter out the target medication
        this.meds = this.meds.filter(m => m !== med)
        return this.saveMeds()
    }
}

module.exports = DataStore;