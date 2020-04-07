const assert = require("assert");
const mysw1 = require("../index.js")("mysw1");
const mysw2 = require("../index.js")("mysw2");

/**
 * init
 */
assert.strictEqual(typeof mysw1, "object");
assert.strictEqual(mysw1 === mysw2, false);

/**
 * start pause stop sleep
 */
(() => {
  // pause
  mysw1.start("tag");
  let t1 = mysw1.pause("tag");
  mysw1.sleep(500);
  mysw1.start("tag");
  let t2 = mysw1.pause("tag");
  let tstop = mysw1.stop("tag");
  assert.strictEqual(t1 > 0, true);
  assert.strictEqual(t2 > 0, true);
  assert.strictEqual(tstop < 300, true);
  mysw1.clear();

  // not pause
  mysw1.start("tag");
  mysw1.sleep(500);
  tstop = mysw1.stop("tag");
  assert.strictEqual(tstop > 300, true);
  mysw1.clear();

  // muti group
  mysw1.start("tag");
  mysw2.start("tag");
  mysw1.pause("tag");
  mysw1.sleep(200);
  let m1t = mysw1.stop("tag");
  let m2t = mysw2.stop("tag");
  assert.strictEqual(m1t < 150, true);
  assert.strictEqual(m2t > 150, true);
  mysw1.clear();
  mysw2.clear();
})();

/**
 * list clear
 */
mysw1.start("tag");
assert.strictEqual(typeof mysw1.list().tag, "object");
assert.strictEqual(mysw1.clear(), true);
assert.strictEqual(typeof mysw1.list().tag, "undefined");
