var elements = [];

function getElements() {
    return elements;
}

function addElements(components) {
    components.map(function(elem) {
        elements.push(elem);
    });
}

function findParent(name) {
    var result;

    elements.forEach(function(component) {
        var path = component.path.split('.');
        var index = path.indexOf(name);

        if (index !== -1) {
            result = findElement(path[index - 1]);
        }
    });

    if (result) {
        return result;
    }
}

function findElement(name) {
    var result = elements.filter(function(component) {
        var path = component.path.split('.');
        var index = path.indexOf(name);
        return index === (path.length - 1) ? component : null;
    });

    if (result) {
        return result[0];
    }
}

module.exports = {
    getElements: getElements,
    addElements: addElements,
    findParent: findParent,
    findElement: findElement
};
