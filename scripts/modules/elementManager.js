var moduleManager = require('./moduleManager');
var observer = require('./observer');
var elements = [];

function getElements() {
    return elements;
}

function addElements(components) {
    components.map(function(elem) {
        elements.push(moduleManager(elem, observer));
    });
}

function manageEvents(data) {
    if (data.detail.hasOwnProperty('validate')) {
        observer.trigger('validate', data);
    }
}

module.exports = {
    getElements: getElements,
    addElements: addElements,
    manageEvents: manageEvents
};
