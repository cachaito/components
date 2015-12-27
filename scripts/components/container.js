var BaseComponent = require('./baseComponent');
var template = require('./container_template.jade');

function Container(meta) {
    BaseComponent.call(this, meta);

    this.template = template;
    this.build();
}

Container.prototype = new BaseComponent();

module.exports = Container;
