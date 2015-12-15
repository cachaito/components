var elementManager = require('./elementManager');
var moduleManager = require('./moduleManager');
var mapping = {
    TEXT: require('../components/input'),
    DICTIONARY: require('../components/dictionary'),
    BUTTON: require('../components/button')
};

function formBuilder(structure) {
    try {
        elementManager.addElements(createComponents(structure));
    } catch (e) {
        throw new Error('Error in building a form ' + e);
    }

    renderComponents();
}

function createComponents(structure) {
    var readyComponents = structure.map(function(component) {
        try {
            return moduleManager.applyModules(new mapping[component.type](component));
        } catch (e) {
            throw new Error('Error in creating a component ' + e);
        }
    });

    return readyComponents;
}

function renderComponents() {
    var sorted = sortElements(elementManager.getElements());

    sorted.forEach(function(elem) {
        document.body.appendChild(elem.element);
    });
}

function sortElements(array) {
    var clonedArray = array.concat();

    clonedArray.sort(function(a, b) {
        return a.order - b.order;
    });

    return clonedArray;
}

// debug purpose
window.APP = {};
APP.elementManager = elementManager;

module.exports = formBuilder;
