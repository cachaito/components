var elementManager = require('./elementManager');
var observer = require('./observer');
var eventName = 'toggle'; // TODO move to config
var state = true;

function addToggle(component) {
    observer.on(eventName, toggle);

    return component;
}

function toggle(component) {
    if (component.type === 'COLLAPSE') {
        return component.setCollapse();
    }

    if (component.type === 'COLLAPSETOGGLE') {
        toggleAll(state);
    }
}

function toggleAll(type) {
    elementManager.getElements().forEach(function(component) {
        if (component.type === 'COLLAPSE') {
            return component.setCollapse(type);
        }
    });

    return state = !state;
}

module.exports = addToggle;
