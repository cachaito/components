var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'deactivate'; // TODO move to config

function addDeactivation(component) {
    observer.on(eventName, deactivate);

    return component;
}

function deactivate(component) {
    if (component.hasOwnProperty('enabled') && elementManager.hasChildren(component)) {
        // return component.disabled === true ? component.setDisable(true) : component.setDisable(false)
    }
}

module.exports = addDeactivation;
