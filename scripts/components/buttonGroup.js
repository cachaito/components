var BaseComponent = require('./baseComponent');
var template = require('./buttonGroup_template.jade');

function ButtonGroup(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        options: this.options,
        disabled: this.disabled ? this.disabled : undefined
    };

    this.template = template;
    this.coreElementName = 'button';
    this.build(context);
    this.attachEvents('click');
}

ButtonGroup.prototype = new BaseComponent();

var _build = BaseComponent.prototype.build;

BaseComponent.prototype.build = function(context) {
    _build.call(this, context);

    this.selected = this.element.querySelector('button.selected');
};

ButtonGroup.prototype.getValue = function() {
    return this.selected !== null ? this.selected.innerText : null;
};

ButtonGroup.prototype.handler = function(e) {
    if (this.element.contains(e.target) && e.target.tagName.toLowerCase() === this.coreElementName) {
        console.log(e);

        this.toggleSelected(e.target);
    }
};

ButtonGroup.prototype.toggleSelected = function(node) {
    if (this.selected) {
        if (node !== this.selected) {
            node.classList.add('selected');
            this.selected.classList.remove('selected');
            this.selected = node;
        }
    } else {
        node.classList.add('selected');
        this.selected = node;
    }

    this.fire('value-change', this);
};

module.exports = ButtonGroup;
