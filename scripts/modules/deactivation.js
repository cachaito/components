var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'deactivate'; // TODO move to config

function addDeactivation(component) {
    observer.on(eventName, deactivate);

    return component;
}

function deactivate(component) {
    component.deactivate.forEach(function(searchElem) {
        var toDeactivate = elementManager.findElement(searchElem.split('.').pop());

        if (toDeactivate && !toDeactivate.disabled) {
            toDeactivate.setDisable(true);
        }
    });
}

module.exports = addDeactivation;
