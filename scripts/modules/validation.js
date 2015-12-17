var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'validate'; // TODO move to config
var validators = {
    maxLength: function(elem, validator) {
        if (elem.value.length > validator.maxLength) {
            return validator.message;
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
    
    return;
}

function validate(data, eventName) {
    var result = [];
    if (data.model === 'submit') {
        validateAll();
    }

    data.validators.forEach(function(toCheck) {
        Object.keys(toCheck).forEach(function(validator) {
            if (validator in validators) {
                var messages = validators[validator](data.coreElement, toCheck);

                if (messages) {
                    result.push(messages);
                }
            }
        });
    });

    return result.length ? data.setError(result) : data.setError(null);
}

module.exports = addValidation;
