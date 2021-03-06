var BaseComponent = require('./baseComponent');
var template = require('./dictionary_template.jade');

function Dictionary(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        defaultOption: this.defaultOption,
        options: this.options,
        disabled: this.disabled ? this.disabled : undefined
    };

    this.template = template;
    this.coreElementName = 'select';
    this.build(context);
    this.attachEvents();
}

Dictionary.prototype = new BaseComponent();

module.exports = Dictionary;
