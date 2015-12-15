var formBuilder = require('./modules/formBuilder');
var observer = require('./modules/observer');
var formData = require('./form.json');

function listenForEvents() {
    document.addEventListener('value-change', manageEvents);
    document.addEventListener('submit-form', manageEvents);
}

function manageEvents(data) {
    if (data.type === 'value-change' && data.detail.hasOwnProperty('validate')) {
        observer.trigger('validate', data.detail);
    }

    // if (data.type === 'submit-form') {
    //     observer.trigger('validate', data);
    // }
}

(function init() {
    formBuilder(formData);
    listenForEvents();
})();
