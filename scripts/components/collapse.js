var BaseComponent = require('./baseComponent');
var Container = require('./container');
var template = require('./collapse_template.jade');

function Collapse(meta) {
    Container.call(this, meta);

    this.template = template;
    this.coreElement = '.header';
    this.build();
    this.attachEvents('click');
    this.commonActions();
}

Collapse.prototype = new BaseComponent();

Collapse.prototype.build = function() {

    Container.prototype.build.call(this);
    this.handler = this.handler.bind(this);
};

Collapse.prototype.setCollapse = function(type) {
    this.collapsed = type || !this.collapsed;

    if (type) {
        this.element.classList.add('collapsed');
    } else {
        this.element.classList.toggle('collapsed');
    }
};

Collapse.prototype.handler = function(e) {
    if (e.target === this.coreElement || this.coreElement.contains(e.target)) {
        console.log(e);
        this.fire('toggle', this);
    }
};

module.exports = Collapse;
