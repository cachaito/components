var BaseComponent = require('./baseComponent');
var template = require('./button_template.jade');

function Button(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        model: this.model
    };

    this.template = template;
    this.coreElement = 'button';
    this.build(context);
    this.attachEvents('click');
}

Button.prototype.handler = function(e) {
    console.log(e);
};

Button.prototype = new BaseComponent();

module.exports = Button;
