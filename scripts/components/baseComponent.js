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
    this.validationElement = this.element.querySelector('.validation');
    this.handler = this.handler.bind(this);
    this.commonActions();
};

BaseComponent.prototype.commonActions = function() {
    if (this.coreElement) {
        this.coreElement = this.element.querySelector(this.coreElement);
    }

    if (this.classList && this.classList.length) {
        this.classList.forEach(function(name) {
            this.element.classList.add(name);
        }, this);
    }
};

BaseComponent.prototype.setError = function(messages) {
    if (messages.length) {
        this.coreElement.classList.add('error');
        this.validationElement.innerHTML = messages.map(function(error) {
            return '<li>' + error + '</li>';
        }).join('');
    } else {
        this.coreElement.classList.remove('error');
        this.validationElement.innerHTML = '';
    }
};

BaseComponent.prototype.setDisable = function(value) {
    value === true ? this.coreElement.setAttribute('disabled', value) : this.coreElement.removeAttribute('disabled');
    this.fire('disable-element', this);
};

BaseComponent.prototype.addChild = function(child) {
    // if (this.disabled) { //TODO: move functionality to deactivation module ?
    //     child.setDisable(this.disabled);
    // }
    this.element.appendChild(child.element);
};

BaseComponent.prototype.handler = function(e) {
    if (e.target === this.coreElement) {
        console.log(e);
        this.fire('value-change', this);
    }
};

BaseComponent.prototype.fire = function(eventName, data) {
    return this.element.dispatchEvent(new CustomEvent(eventName, {detail: data, bubbles: true}));
};

BaseComponent.prototype.attachEvents = function(eventType) {
    this.element.addEventListener(eventType ? eventType : 'change', this.handler);
};

module.exports = BaseComponent;
