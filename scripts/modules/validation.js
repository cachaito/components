var elementManager = require('./elementManager'); // TODO fix circular dependency???
var observer = require('./observer');
var eventName = 'validate'; // TODO move to config

function addValidation(elem) {
    if (elem.validate && elem.validators.length) {
        observer.on(eventName, validate);
    }
    return elem;
}

function validateAll() {
    APP.elementManager.getElements().forEach(function(elem) { // TODO change after circular dependency fixed
        if (elem.validate && elem.validators.length) {
            validate(elem);
        }
    });
}

function validate(data, eventName) {
    // TODO perform validation
    debugger;

    if (data.model === 'submit') {
        validateAll();
    }
}

module.exports = addValidation;
