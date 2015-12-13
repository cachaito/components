var modules = [
    require('./validation')
];

function applyModules(elem, observer) {
    modules.forEach(function(module) {
        module.call(null, elem, observer);
    });

    return elem;
}

module.exports = applyModules;
