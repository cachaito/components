var BaseComponent = require('./baseComponent');
var template = require('./button_template.jade');

function Button(meta) {
    BaseComponent.call(this, meta);

    var context = {
        id: this.id,
        desc: this.desc,
        model: this.model
    };

    this.template = template;
    this.coreElement = 'button';
    this.build(context);
    this.attachEvents('click');
}

Button.prototype = new BaseComponent();

// Button.prototype.handler = function(e) {
//     if (e.target.tagName.toLowerCase() === this.coreElement) {
//         console.log(e);

//         if (this.model && this.model === 'submit') {
//             this.fire('submit-form', this);
//         } else {
//             this.fire('value-change', this);
//         }
//     }
// };

module.exports = Button;
