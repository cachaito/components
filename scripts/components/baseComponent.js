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

    if (this.coreElement) {
        this.coreElement = element.querySelector(this.coreElement);
    }
};

BaseComponent.prototype.handler = function(e) {
    if (e.target === this.coreElement) {
        console.log(e);
        this.fire('value-change', this);
    }
};

BaseComponent.prototype.fire = function(eventName, data) {
    var event = new CustomEvent(eventName, {detail: data, bubbles: true});
    return this.element.dispatchEvent(event);
};

BaseComponent.prototype.attachEvents = function(eventType) {
    this.element.addEventListener(eventType ? eventType : 'change', this.handler);
};

module.exports = BaseComponent;
