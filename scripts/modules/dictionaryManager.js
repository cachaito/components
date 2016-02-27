var CONFIG = require('../config.js');
var fetch = require('fetchival');
var elementManager = require('./elementManager');
var cache = {};
var toUpdate = {};
var dictionary;

function applyDictionary(component) {

    if (component.dicitonary in cache) { // update component with cached data
        return updateComponent(cache[component.dictionary]);
    } else if (dictionary && dictionary instanceof Promise) { // dictionary is still fetched
        // return dictionary.then(successResponse);
    } else {
        dictionary = fetch(CONFIG.serverUrl + '/' + component.dictionary).get();
        dictionary
            .then(successResponse)
            .then(updateComponent);
    }

    component.deffered = true;
    toUpdate[component.dictionary] && Array.isArray(toUpdate[component.dictionary]) ? toUpdate[component.dictionary].push(component.path) : toUpdate[component.dictionary] = [component.path];
}

function successResponse(response) {
    return response;
}

function updateComponent(dictionary) {
    toUpdate[dictionary.type].map(function(path) {
        var component = elementManager.findElement(path.split('.').pop()); // TODO: think to simplify this process of searching with path
        component.redraw(dictionary);
    });
}

module.exports = {
    applyDictionary: applyDictionary
};
