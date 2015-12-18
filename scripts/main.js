var formBuilder = require('./modules/formBuilder');
var observer = require('./modules/observer');
var formData = require('./form.json');

function listenForEvents() { // TODO move to config and iterate through map of events for adding listeners
    document.addEventListener('value-change', manageEvents);
    document.addEventListener('disable-element', manageEvents);
    // document.addEventListener('submit-form', manageEvents);
}

function manageEvents(event) {
    if (event.type === 'value-change' && event.detail.hasOwnProperty('validate')) {
        observer.trigger('validate', event.detail);
    }
    if (event.type === 'disable-element') {
        observer.trigger('deactivate', event.detail);
    }
    // if (data.type === 'submit-form') {
    //     observer.trigger('validate', data);
    // }
}

(function init() {
    formBuilder(formData);
    listenForEvents();
})();
