var BaseComponent = require('./baseComponent');
var ButtonComponent = require('./button');
var template = require('./button_template.jade');

function CollapseToggle(meta) {
    ButtonComponent.call(this, meta);
}

CollapseToggle.prototype = new BaseComponent();

CollapseToggle.prototype.handler = function(e) {
    if (e.target === this.coreElement) {
        console.log(e);
        this.fire('toggle', this);
    }
};

module.exports = CollapseToggle;
