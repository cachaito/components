var observerList = {};
var observer = {
    on: function(name, callback) {
        if (!observerList[name] || observerList[name].length === 0) {
            observerList[name] = [callback];
        } else {
            observerList[name].push(callback);
        }

    },
    off: function(name, callback) {
        if (!observerList[name] || observerList[name].length === 1) {
            return delete observerList[name];
        }
        for (var i = 0, len = observerList[name].length; i < len; i++) {
            if (observerList[name][i] === callback) {
                observerList[name].splice(i, 1);
            }
        }
    },
    trigger: function(name, data) {
        if (!observerList[name] || observerList[name].length === 0) {
            return console.warn('No one is listening');
        }
        for (var i = 0, len = observerList[name].length; i < len; i++) {
            observerList[name][i](data, name);
        }
    }
};

module.exports = observer;
