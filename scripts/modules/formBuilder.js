/* global APP */
var elementManager = require('./elementManager');
var moduleManager = require('./moduleManager');
var mapping = {
    CONTAINER: require('../components/container'),
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

function sortElements(array) {
    var clonedArray = array.concat();

    clonedArray.sort(function(a, b) {
        return a.order - b.order;
    });

    return clonedArray;
}

function transformStructure(flatStructure) {
    var struct = {};

    flatStructure.forEach(function(item) {
        var path = struct;
        item.path.split('.').forEach(function(part, i, parts) {
            path = (path[part] || (path[part] = (i < (parts.length - 1)) ? {} : null));
        });
    });

    return struct;
}

function traverseTree(tree) {
    for (var prop in tree) {
        if (prop === 'root') {
            return traverseTree(tree[prop]);
        }

        var temp = Object.keys(tree).map(function(prop) {
            return elementManager.findElement(prop);
        });

        sortElements(temp).forEach(function(elem) {
            if (tree[prop] !== null) {
                document.body.appendChild(elem.element);
            } else {
                elementManager.findParent(prop).addChild(elem);
            }
        });

        traverseTree(tree[prop]);
    }
}

function renderComponents() {
    var nestedStructure = transformStructure(elementManager.getElements());

    traverseTree(nestedStructure);
}

// debug purpose
window.APP = {};
APP.elementManager = elementManager;

module.exports = formBuilder;
