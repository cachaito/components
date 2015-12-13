var eventName = 'validate';

function addValidation(elem, observer) {
    if (elem.validate && elem.validators.length) {
        observer.on(eventName, validate);
    }
    return elem;
};

function validate(data, eventName) {
    // przeprowadź walidację!
    debugger;
}

module.exports = addValidation;
