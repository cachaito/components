/*
    can use array of "options" and "selectedValues" in form.json
    or dictionary to fill list
*/
var BaseComponent = require('./baseComponent');
var template = require('./multipleDictionary_template.jade');

function MultipleDictionary(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        selectedValues: this.selectedValues || null,
        options: this.options || null,
        disabled: this.disabled ? this.disabled : undefined
    };

    this.template = template;
    this.coreElementName = 'input';
    this.build(context);
    this.attachEvents();
}

MultipleDictionary.prototype = new BaseComponent();

var _build = MultipleDictionary.prototype.build;

MultipleDictionary.prototype.build = function(context) {
    _build.call(this, context);
    this.hints = null;
    this.combinedHints = null;
    this.lozengePattern = null;
    this.prepareLozengePattern();
    this.lozengeContainer = this.element.querySelector('.lozenges');
    this.hintContainer = this.element.querySelector('.hint-container');
    this.hintContainerTrigger = this.element.querySelector('.hint-trigger');
    this.buildHints(Array.apply(null, this.hintContainer.querySelectorAll('.hint a')), Array.apply(null, this.lozengeContainer.querySelectorAll('.lozenge a')));
};

MultipleDictionary.prototype.getValue = function() {
    return this.hints.filter(function(hint) {
        return hint.selected;
    }).map(function(selected) {
        return selected.value;
    });
};

MultipleDictionary.prototype.findActiveHint = function() {
    return this.findAvailableHints().filter(function(hint) {
        return 'active' in hint;
    })[0];
};

MultipleDictionary.prototype.findSelectedHint = function(node) {
    return this.hints.filter(function(hint) {
        return hint.value === node.getAttribute('data-value');
    })[0];
};

MultipleDictionary.prototype.findAvailableHints = function() {
    return this.combinedHints || this.hints;
};

MultipleDictionary.prototype.moveHint = function(fn) {
    var pos;
    var where = this.findAvailableHints();
    var current = this.findActiveHint();

    if (current) {
        pos = fn.call(this, current);
        current.elem.parentNode.classList.remove('active');
        where[pos].active = pos;
        where[pos].elem.parentNode.classList.add('active');
        delete current.active;
    } else {
        current = where[0];
        current.active = 0;
        current.elem.parentNode.classList.add('active');
    }
};

MultipleDictionary.prototype.nextHint = function(current) {
    return current.active < this.findAvailableHints().length - 1 ? current.active + 1 : 0;
};

MultipleDictionary.prototype.prevHint = function(current) {
    return current.active === 0 ? this.findAvailableHints().length - 1 : current.active - 1;
};

MultipleDictionary.prototype.buildHints = function(hints, lozenges) {
    this.hints = hints.map(function(hint) {
        return {
            label: hint.innerHTML,
            value: hint.getAttribute('data-value'),
            selected: null,
            elem: hint
        };
    });

    this.hints.forEach(function(hint) {
        lozenges.forEach(function(lozenge) {
            if (hint.value === lozenge.getAttribute('data-value')) {
                hint.selected = lozenge;
                hint.elem.parentNode.classList.add('selected');
            }
        });
    });
};

MultipleDictionary.prototype.combineHintResults = function(found) {
    var activeItem = this.findActiveHint();
    var combinedHints = [];

    // remove temp combinedHints array
    if (this.combinedHints && this.combinedHints.length) {
        this.combinedHints = [];
    }

    // remove active flag
    if (activeItem) {
        activeItem.elem.parentNode.classList.remove('active');
    }

    // searched results
    this.hints.forEach(function(hint) {
        hint.elem.parentNode.classList.add('hidden');
        found.forEach(function(item) {
            if (item.value === hint.value) {
                combinedHints.push(item);
                hint.elem.parentNode.classList.remove('hidden');
            }
        });
    });

    this.combinedHints = combinedHints;
    this.toggleContainer('open');
};

MultipleDictionary.prototype.updateHints = function(selected) {
    // selected value from hint or lozenge or entered active
    var filtered = 'tagName' in selected ? this.findSelectedHint(selected) : selected;

    if (filtered && filtered.selected) {
        filtered.elem.parentNode.classList.remove('selected');
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
};

MultipleDictionary.prototype.searchHints = function(typed) {
    var filtered = this.hints.filter(function(hint) {
        return hint.label.toLowerCase().indexOf(typed.trim().toLowerCase()) !== -1;
    });

    if (filtered.length) {
        this.combineHintResults(filtered);
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

MultipleDictionary.prototype.toggleContainer = function(type) {
    if (type === 'open') {
        this.hintContainerTrigger.classList.remove('icon-chevron-down');
        this.hintContainerTrigger.classList.add('icon-chevron-up');
        this.hintContainer.classList.remove('closed');
        return;
    }

    if (type === 'close') {
        this.hintContainerTrigger.classList.remove('icon-chevron-up');
        this.hintContainerTrigger.classList.add('icon-chevron-down');
        this.hintContainer.classList.add('closed');
        return;
    }

    this.hintContainerTrigger.classList.toggle('icon-chevron-down');
    this.hintContainerTrigger.classList.toggle('icon-chevron-up');
    this.hintContainer.classList.toggle('closed');

};

MultipleDictionary.prototype.clearHints = function() {
    if (this.coreElement.value === '' || this.coreElement.value.length < 2) {
        this.combinedHints = null;
        this.hints.forEach(function(hint) {
            hint.elem.parentNode.classList.remove('hidden');
        });
    }
};

MultipleDictionary.prototype.attachEvents = function() {
    this.element.addEventListener('input', this.handler);
    this.element.addEventListener('click', this.handler);
    this.element.addEventListener('keydown', this.handler);
};

MultipleDictionary.prototype.handler = function(e) {

    if (e.target === this.hintContainerTrigger && e.keyCode !== 9) {
        this.toggleContainer();
    }

    if (e.target === this.coreElement) {
        if (e.type === 'input') {
            if (e.target.value.length >= 2) {
                this.searchHints(e.target.value);
            } else {
                this.clearHints();
            }
        }

        // https://jsfiddle.net/Vtn5Y/
        if (e.type === 'keydown') {
            switch (e.keyCode) {
                case 40:
                    if (this.hintContainer.classList.contains('closed')) {
                        this.toggleContainer('open');
                    } else {
                        this.moveHint(this.nextHint);
                    }
                    break;
                case 38:
                    if (!this.hintContainer.classList.contains('closed')) {
                        this.moveHint(this.prevHint);
                    }
                    break;
                case 13:
                    this.updateHints(this.findActiveHint());
                    this.toggleContainer();
                    break;
                case 27:
                    if (!this.hintContainer.classList.contains('closed')) {
                        this.toggleContainer();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    if (e.target.nodeName.toLowerCase() === 'a' && this.hintContainer.contains(e.target)) {
        e.preventDefault();

        this.updateHints(e.target);
        this.toggleContainer();
    }

    if (e.type === 'click' && e.target.matches('a.icon-cross')) {
        e.preventDefault();

        this.updateHints(e.target);
    }
};

module.exports = MultipleDictionary;
