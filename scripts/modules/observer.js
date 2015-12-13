var observer = {
    observerList: {},
    on: function(name, callback) {
        if (!this.observerList[name] || this.observerList[name].length === 0) {
            this.observerList[name] = [callback];
        } else {
            this.observerList[name].push(callback);
        }

    },
    off: function(name, callback) {
        if (!this.observerList[name] || this.observerList[name].length === 1) {
            return delete this.observerList[name];
        }
        for (var i = 0, len = this.observerList[name].length; i < len; i++) {
            if (this.observerList[name][i] === callback) {
                this.observerList[name].splice(i, 1);
            }
        }
    },
    trigger: function(name, data) {
        if (!this.observerList[name] || this.observerList[name].length === 0) {
            return console.warn('No one is listening');
        }
        for (var i = 0, len = this.observerList[name].length; i < len; i++) {
            this.observerList[name][i](data, name);
        }
    }
};

module.exports = observer;
