var test = require('tape');
var module = require('../../scripts/modules/deactivation');

test('Module assertions with tape.', function(assert) {

    assert.ok(typeof module === 'function',
        'Module should be an imported function');

    assert.end();
});
