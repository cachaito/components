function BaseComponent(meta) {
    for (var prop in meta) {
        this[prop] = meta[prop];
    }
}

BaseComponent.prototype.build = function(context) {
    var element = document.createElement('div');

    element.setAttribute('id', this.id);
    element.innerHTML = this.template(context);
    this.element = element;
    this.handler = this.handler.bind(this);
};

BaseComponent.prototype.handler = function(e) {
    if (e.target.tagName.toLowerCase() === this.coreElement) {
        console.log(e);
    }
};

BaseComponent.prototype.attachEvents = function(eventType) {
    this.element.addEventListener(eventType ? eventType : 'change', this.handler);
};

module.exports = BaseComponent;
