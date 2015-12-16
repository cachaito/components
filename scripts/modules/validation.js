var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'validate'; // TODO move to config
var validators = {
    maxLength: function(elem, validator) {
        if (elem.value.length > validator.maxLength) {
            alert('Error!');
        }
    }
};

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
    if (data.model === 'submit') {
        validateAll();
    }

    data.validators.forEach(function(toCheck) {
        Object.keys(toCheck).forEach(function(validator) {
            if (validator in validators) {
                validators[validator](data.coreElement, toCheck);
            }
        });
    });
}

module.exports = addValidation;
