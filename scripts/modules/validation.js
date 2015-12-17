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

function addValidation(component) {
    if (component.validate && component.validators.length) {
        observer.on(eventName, validate);
    }
    return component;
}

function validateAll() {
    elementManager.getElements().forEach(function(component) {
        if (component.validate && component.validators.length) {
            validate(component);
        }
    });
}

function validate(component, eventName) {
    var result = [];

    if (component.model === 'submit') {
        validateAll();

        return; // TODO consider add class error for button
    }

    component.validators.forEach(function(toCheck) {
        Object.keys(toCheck).forEach(function(validator) {
            if (validator in validators) {
                var messages = validators[validator](component.coreElement, toCheck);

                if (messages) {
                    result.push(messages);
                }
            }
        });
    });

    return component.setError(result);
}

module.exports = addValidation;
