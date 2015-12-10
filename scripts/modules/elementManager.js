var elements = [];

function getElements() {
    return elements;
}

function addElements(components) {
    components.map(function(elem) {
        elements.push(elem);
    });
}

module.exports = {
    getElements: getElements,
    addElements: addElements
};
