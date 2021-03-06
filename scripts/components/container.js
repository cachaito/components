var BaseComponent = require('./baseComponent');
var template = require('./container_template.jade');

function Container(meta) {
    BaseComponent.call(this, meta);

    this.template = template;
    this.build();
}

Container.prototype = new BaseComponent();

Container.prototype.build = function() {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = this.template();
    this.element = tempElement.firstChild;
    tempElement = null;
    this.commonActions();
};

module.exports = Container;
