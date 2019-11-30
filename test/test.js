const assert = require('assert');
const sw = require("../index.js");

/**
 * init
 */
assert.strictEqual(sw("Object"), false);
assert.strictEqual(sw("mysw"), true);
assert.strictEqual(typeof mysw, "object");

/**
 * start pause stop sleep
 */
(()=>{
    // pause
    mysw.start('tag');
    let t1 = mysw.pause('tag');
    mysw.sleep(500);
    mysw.start('tag');
    let t2 = mysw.pause('tag');
    let tstop = mysw.stop('tag');
    assert.strictEqual(t1 > 0, true);
    assert.strictEqual(t2 > 0, true);
    assert.strictEqual(tstop < 300, true);
    
    // not pause
    mysw.start('tag');
    mysw.sleep(500);
    tstop = mysw.stop('tag');
    assert.strictEqual(tstop > 300, true);
})()

/**
 * list clear
 */
assert.strictEqual(typeof mysw.list().tag, 'object');
assert.strictEqual(mysw.clear(), true);
assert.strictEqual(typeof mysw.list().tag, 'undefined');