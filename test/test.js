if (typeof stopwatch2 === 'undefined') {
  stopwatch2 = require('..');
}

if (typeof assert === 'undefined') {
  assert = require('chai').assert;
}

// TODO: test print
stopwatch2.config.print = false;

describe('init', function () {
  it('stopwatch2 is object', function () {
    assert.equal(typeof stopwatch2, 'object');
  });
});

describe('timing', function () {
  afterEach(function () {
    stopwatch2.clear();
  });

  it('pause', function () {
    stopwatch2.start('tag');
    assert.isAtLeast(stopwatch2.pause('tag'), 0);
    stopwatch2.sleep(103);
    stopwatch2.start('tag');
    assert.isAtLeast(stopwatch2.pause('tag'), 0);

    const tstop = stopwatch2.stop('tag');
    assert.isAtMost(tstop.execTime, 100);
  });

  it('not pause', function () {
    stopwatch2.start('tag');
    stopwatch2.sleep(103);
    const tstop = stopwatch2.stop('tag');
    assert.isAtLeast(tstop.execTime, 100);
  });
});

describe('show', function () {
  before(function () {
    stopwatch2.start(1);
    stopwatch2.start(2);
    stopwatch2.start(3);
    stopwatch2.pause(1);
    stopwatch2.pause(2);
    stopwatch2.pause(3);
  });

  after(function () {
    stopwatch2.clear();
  });

  it('show one', function () {
    const timer = stopwatch2.show(1);

    assert.hasAllKeys(timer, ['start', 'execTime']);
  });

  it('show all', function () {
    const timer = stopwatch2.show();
    assert.hasAllKeys(timer, ['1', '2', '2']);
  });
});
