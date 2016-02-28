/* global APP */
var elementManager = require('./elementManager');
var moduleManager = require('./moduleManager');
var dictionaryManager = require('./dictionaryManager');
var mapping = {
    CONTAINER: require('../components/container'),
    COLLAPSE: require('../components/collapse'),
    TEXT: require('../components/input'),
    DICTIONARY: require('../components/dictionary'),
    MULTIPLEDICTIONARY: require('../components/multipleDictionary'),
    BUTTON: require('../components/button'),
    COLLAPSETOGGLE: require('../components/collapseToggle')
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
    return structure.map(function(component) {
        try {
            if ('dictionary' in component) {
                dictionaryManager.applyDictionary(component);
            }
            return moduleManager.applyModules(new mapping[component.type](component));
        } catch (e) {
            throw new Error('Error in creating a component ' + e);
        }
    });
}

function sortElements(array) {
    return array.concat().sort(function(a, b) {
        return a.order - b.order;
    });
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
                var parent = elementManager.findParent(prop);
                if (parent) {
                    parent.addChild(elem);
                } else {
                    document.body.appendChild(elem.element);
                }
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
