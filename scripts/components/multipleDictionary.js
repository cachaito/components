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
// var _attachEvents = MultipleDictionary.prototype.attachEvents;

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

BaseComponent.prototype.getValue = function() {
    return this.hints.filter(function(hint) {
        return hint.selected;
    }).map(function(selected) {
        return selected.value;
    });
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

MultipleDictionary.prototype.updateHints = function(selected) {
    if (selected.length) { // searched results
        this.hints.forEach(function(hint) {
            hint.elem.parentNode.classList.add('hidden');
            selected.forEach(function(selected) {
                if (selected.value === hint.value) {
                    hint.elem.parentNode.classList.remove('hidden');
                }
            });
        });

        this.toggleContainer();
    } else { // selected value from hint or lozenge

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
    }
};

MultipleDictionary.prototype.searchHints = function(typed) {
    var filtered = this.hints.filter(function(hint) {
        return hint.label.toLowerCase().indexOf(typed.trim().toLowerCase()) !== -1;
    });

    if (filtered.length) {
        this.updateHints(filtered);
    } else {

    }
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

MultipleDictionary.prototype.toggleContainer = function() {
    if (this.coreElement.value === '' || this.coreElement.value.length < 2) { // think about more clever way
        this.hints.forEach(function(hint) {
            hint.elem.parentNode.classList.remove('hidden');
        });
    }

    this.hintContainerTrigger.classList.toggle('icon-chevron-down');
    this.hintContainerTrigger.classList.toggle('icon-chevron-up');
    this.hintContainer.classList.toggle('closed');
};

MultipleDictionary.prototype.attachEvents = function() {
    // _attachEvents.call(this);
    this.coreElement.addEventListener('input', this.handler);
    this.coreElement.addEventListener('click', this.handler);
    this.hintContainer.addEventListener('click', this.handler);
    this.hintContainerTrigger.addEventListener('click', this.handler);
    this.lozengeContainer.addEventListener('click', this.handler);
};

MultipleDictionary.prototype.handler = function(e) {
    if (e.target === this.hintContainerTrigger) {
        this.toggleContainer();
    }

    if (e.target === this.coreElement) {
        if (e.type === 'input' && e.target.value.length > 1) {
            this.searchHints(e.target.value);
        } else {
            this.toggleContainer();
        }
    }

    if (e.target.nodeName.toLowerCase() === 'a' && this.hintContainer.contains(e.target)) {
        e.preventDefault();

        this.updateHints(e.target);
        this.toggleContainer();
    }

    if (e.target.matches('a.icon-cross')) {
        e.preventDefault();

        this.updateHints(e.target);
    }
};

module.exports = MultipleDictionary;
