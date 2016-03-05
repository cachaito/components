function BaseComponent(meta) {
    for (var prop in meta) {
        this[prop] = meta[prop];
    }
}

BaseComponent.prototype.build = function(context) {
    if (!this.element) {
        var element = document.createElement('div');
        this.element = element;
    }

    this.element.setAttribute('id', this.id);
    this.element.innerHTML = this.template(context);
    this.validationElement = this.element.querySelector('.validation');
    this.handler = this.handler.bind(this);
    this.commonActions();

    if (this.deffered) {
        this.redraw = this.redraw.bind(this, context);
    }
};

BaseComponent.prototype.redraw = function(context, updates) {
    var merged = {};

    for (var name in context) {
        merged[name] = updates[name] || context[name];
    }

    this.deffered = false;
    this.setLoader();
    this.setDisable();
    this.build(merged);
};

BaseComponent.prototype.commonActions = function() {
    this.coreElement = this.element.querySelector(this.coreElementName);

    if (this.classList && this.classList.length) {
        this.classList.forEach(function(name) {
            this.element.classList.add(name);
        }, this);
    }

    if (this.deffered) {
        this.loader = this.element.querySelector('.loading-indicator');
        this.setLoader(true);
        this.setDisable(true);
    }
};

BaseComponent.prototype.getValue = function() {
    return this.coreElement.value || null;
};

BaseComponent.prototype.valueChanged = function(prop, action) {
    if (prop.value !== this[prop.name]) {
        this[prop.name] = prop.value;

        action && action();

        return;
    }

    return console.log('value:', prop.name, ' hasn\'t changed');
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

BaseComponent.prototype.setLoader = function(value) {
    value === true ? this.loader.classList.remove('hidden') : this.loader.classList.add('hidden');
};

BaseComponent.prototype.setDisable = function(value) {
    value === true ? this.coreElement.setAttribute('disabled', value) : this.coreElement.removeAttribute('disabled');
    this.disabled = value;
};

BaseComponent.prototype.addChild = function(child) {
    if (this.disabled) { // TODO: move functionality to deactivation module ?
        child.setDisable(this.disabled);
    }
    this.element.appendChild(child.element);
};

BaseComponent.prototype.handler = function(e) {
    if (e.target === this.coreElement) {
        console.log(e);
        this.fire('value-change', this);

        if (this.deactivate) {
            this.fire('deactivate', this);
        }
    }
};

BaseComponent.prototype.fire = function(eventName, data) {
    return this.element.dispatchEvent(new CustomEvent(eventName, {detail: data, bubbles: true}));
};

BaseComponent.prototype.attachEvents = function(eventType) {
    this.element.addEventListener(eventType ? eventType : 'change', this.handler);
};

module.exports = BaseComponent;
