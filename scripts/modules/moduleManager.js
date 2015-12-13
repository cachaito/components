var modules = [
    require('./validation')
];

function applyModules(elem) {
    modules.forEach(function(module) {
        module.call(null, elem);
    });

    return elem;
}

function getModuleList() {
    return modules;
}

module.exports = {
    applyModules: applyModules,
    getModulesList: getModuleList
};
