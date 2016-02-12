var BaseComponent = require('./baseComponent');
var template = require('./multipleDictionary_template.jade');

function MultipleDictionary(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        selectedValues: this.selectedValues || null,
        options: this.options,
        disabled: this.disabled ? this.disabled : undefined
    };

    this.template = template;
    this.coreElement = 'input';
    this.build(context);
    this.attachEvents();
}

MultipleDictionary.prototype = new BaseComponent();

var _build = MultipleDictionary.prototype.build;
var _attachEvents = MultipleDictionary.prototype.attachEvents;

MultipleDictionary.prototype.build = function(context) {
    _build.call(this, context);
    this.hints = null;
    this.lozengePattern = null;
    this.prepareLozengePattern();
    this.lozengeContainer = this.element.querySelector('.lozenges');
    this.hintContainer = this.element.querySelector('.hint-container');
    this.hintContainerTrigger = this.element.querySelector('.hint-trigger');
    this.buildHints(Array.apply(null, this.hintContainer.querySelectorAll('.hint a')), Array.apply(null, this.lozengeContainer.querySelectorAll('.lozenge a')));
};

MultipleDictionary.prototype.buildHints = function(hints, lozenges) {
    this.hints = hints.map(function(hint) {
        return {
            label: hint.innerHTML,
            value: hint.getAttribute('data-value'),
            elem: hint
        };
    });

    this.hints.forEach(function(hint) {
        hint.selected = lozenges.filter(function(lozenge) {
            return hint.value === lozenge.getAttribute('data-value') ? lozenge : null;
        })[0];

        if (hint.selected) {
            hint.elem.parentNode.classList.add('selected');
        }
    });
};

MultipleDictionary.prototype.prepareLozengePattern = function() {
    var lozengeOuterElement = document.createElement('span');
    var lozengeLabelElement = document.createElement('text');
    var lozengeInnerElement = document.createElement('a');
    lozengeOuterElement.className = 'lozenge';
    lozengeInnerElement.className = 'icon icon-cross';
    lozengeInnerElement.href = '#';
    lozengeOuterElement.appendChild(lozengeLabelElement);
    lozengeOuterElement.appendChild(lozengeInnerElement);
    this.lozengePattern = lozengeOuterElement;
};

MultipleDictionary.prototype.updateHints = function(selected) {
    var filtered = this.hints.filter(function(hint) {
        return hint.value === selected.getAttribute('data-value');
    })[0];

    if (filtered) {
        if (filtered.selected) {
            filtered.elem.parentNode.classList.remove('selected');
            var toDelete = filtered.selected.parentNode;
            this.lozengeContainer.removeChild(filtered.selected.parentNode);
            filtered.selected = null;
        } else {
            var label = filtered.label;
            var value = filtered.value;
            var lozenge = this.lozengePattern.cloneNode(true);
            lozenge.firstChild.innerHTML = label;
            lozenge.lastChild.setAttribute('data-value', value);
            filtered.elem.parentNode.classList.add('selected');
            filtered.selected = lozenge.lastChild;
            this.lozengeContainer.appendChild(lozenge);
        }
    }
};

MultipleDictionary.prototype.searchHints = function(typed) {
    // var filtered = this.hints.filter(function(hint) {
    //     return hint.label === typed;
    // })[0];

    // if (filtered) {
    //     this.operateHintContainer();
    //     this.updateHints(filtered.elem);
    // }
};

MultipleDictionary.prototype.operateHintContainer = function() {
    this.hintContainerTrigger.classList.toggle('icon-chevron-down');
    this.hintContainerTrigger.classList.toggle('icon-chevron-up');
    this.hintContainer.classList.toggle('closed');
};

MultipleDictionary.prototype.attachEvents = function() {
    _attachEvents.call(this);
    this.coreElement.addEventListener('click', this.handler);
    this.hintContainer.addEventListener('click', this.handler);
    this.hintContainerTrigger.addEventListener('click', this.handler);
    this.lozengeContainer.addEventListener('click', this.handler);
};

MultipleDictionary.prototype.handler = function(e) {
    if (e.target === this.hintContainerTrigger) {
        this.operateHintContainer();
    }

    if (e.target === this.coreElement) {
        if (e.type === 'click' && this.hintContainerTrigger.classList.contains('icon-chevron-up')) {
            this.operateHintContainer();
        }

        if (e.type === 'change') {
            this.searchHints(e.target.value);
        }
    }

    if (e.target.nodeName.toLowerCase() === 'a' && this.hintContainer.contains(e.target)) {
        e.preventDefault();

        this.updateHints(e.target);
    }

    if (e.target.matches('a.icon-cross')) {
        e.preventDefault();

        this.updateHints(e.target);
    }
};

module.exports = MultipleDictionary;