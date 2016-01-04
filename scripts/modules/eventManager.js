var observer = require('./observer');

function listenForEvents(events) {
    events = [].concat(events);

    events.forEach(function(event) {
        document.addEventListener(event, manageEvents);
    });

    // document.addEventListener('submit-form', manageEvents);
}

function manageEvents(event) {
    switch (event.type) {
        case 'value-change':
            if (event.detail.hasOwnProperty('validate')) {
                observer.trigger('validate', event.detail);
            }
            break;
        case 'toggle':
            observer.trigger('toggle', event.detail);
            break;
        default:
            throw new Error(event.type + ' is not supported');
    }
    // if (event.type === 'disable-element') {
    //     observer.trigger('deactivate', event.detail);
    // }
    // if (data.type === 'submit-form') {
    //     observer.trigger('validate', data);
    // }
}

module.exports = listenForEvents;
