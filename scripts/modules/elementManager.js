var elements = [];

function getElements() {
    return elements;
}

function addElements(components) {
    components.map(function(elem) {
        elements.push(elem);
    });
}

function hasChildren(component) {
    // first way iterate through DOM elements and check if component contains children - preferable solution; component know nothing about other components
    // when build elements save reference in component
}

function getChildren() {} // TODO

module.exports = {
    getElements: getElements,
    addElements: addElements,
    hasParent: hasChildren,
    getParent: getChildren
};
