var BaseComponent = require('./baseComponent');
var template = require('./input_template.jade');

function Input(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        disabled: this.disabled ? this.disabled : undefined
    };

    this.template = template;
    this.coreElementName = 'input';
    this.build(context);
    this.attachEvents();
}

Input.prototype = new BaseComponent();

module.exports = Input;
