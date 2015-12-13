var moduleManager = require('./moduleManager');
var elements = [];

function getElements() {
    return elements;
}

function addElements(components) {
    components.map(function(elem) {
        elements.push(moduleManager.applyModules(elem));
    });
}

module.exports = {
    getElements: getElements,
    addElements: addElements
};
