var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'validate'; // TODO move to config

function addValidation(elem) {
    if (elem.validate && elem.validators.length) {
        observer.on(eventName, validate);
    }
    return elem;
}

function validateAll() {
    elementManager.getElements().forEach(function(elem) {
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
