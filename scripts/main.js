var formBuilder = require('./modules/formBuilder');
var manageEvents = require('./modules/eventManager');
var formData = require('./form.json');

(function init() {
    formBuilder(formData);
    manageEvents(['value-change', 'disable-element', 'toggle', 'deactivate']);
})();
