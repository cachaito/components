var BaseComponent = require('./baseComponent');
var template = require('./input_template.jade');

function Input(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc
    };

    this.template = template;
    this.coreElement = 'input';
    this.build(context);
    this.attachEvents();

    // this.element.querySelector(this.coreElement).setAttribute('class', 'field');
}

Input.prototype = new BaseComponent();

module.exports = Input;
