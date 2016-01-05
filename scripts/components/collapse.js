var BaseComponent = require('./baseComponent');
var Container = require('./container');
var template = require('./collapse_template.jade');

function Collapse(meta) {
    Container.call(this, meta);

    this.template = template;
    this.coreElement = '.header';
    this.build();
    this.attachEvents('click');
}

Collapse.prototype = new BaseComponent();

Collapse.prototype.build = function() {
    Container.prototype.build.call(this);
    this.handler = this.handler.bind(this);
};

Collapse.prototype.setCollapse = function(type) {
    if (type && this.collapsed === true) {
        return;
    }

    this.element.classList.toggle('collapsed');
    this.collapsed = type || !this.collapsed;
};

Collapse.prototype.handler = function(e) {
    if (e.target === this.coreElement || this.coreElement.contains(e.target)) {
        console.log(e);
        this.fire('toggle', this);
    }
};

module.exports = Collapse;
