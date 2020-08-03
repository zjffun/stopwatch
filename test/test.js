/* eslint-disable no-new */

if (typeof Stopwatch2 === 'undefined') {
  Stopwatch2 = require('..');
}

if (typeof expect === 'undefined') {
  expect = require('chai').expect;
}

const timeout = 100;

describe('Stopwatch2', () => {
  afterEach(() => {
    Stopwatch2.clear();
  });

  describe('#constructor', function () {
    let sw = null;

    beforeEach(() => {
      sw = new Stopwatch2('tag');
    });

    it('should be an instance of Stopwatch2', () => {
      expect(sw).to.be.an.instanceof(Stopwatch2);
    });

    it('state should be stop', () => {
      expect(sw.state).to.equal(Stopwatch2.states.stop);
    });

    it('should has times', () => {
      expect(sw.startTime).to.equal(0);
      expect(sw.lastStartTime).to.equal(0);
      expect(sw.execTime).to.equal(0);
      expect(sw.lastExecTime).to.equal(0);
    });
  });

  describe('instance methods', () => {
    let sw = null;
    let tempSw = null;

    beforeEach(() => {
      sw = new Stopwatch2('tag');
    });

    describe('start', () => {
      beforeEach(() => {
        tempSw = { ...sw.start() };
      });

      describe('-> start', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.start();
        });

        it('state should be start', () => {
          expect(sw.state).to.equal(Stopwatch2.states.start);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.gte(tempSw.lastStartTime + timeout);
          expect(sw.execTime).to.equal(tempSw.execTime);
          expect(sw.lastExecTime).to.equal(tempSw.lastExecTime);
        });
      });

      describe('-> pause', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.pause();
        });

        it('state should be pause', () => {
          expect(sw.state).to.equal(Stopwatch2.states.pause);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.gte(timeout);
          expect(sw.lastExecTime).to.gte(timeout);
        });
      });

      describe('-> stop', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.stop();
        });

        it('state should be stop', () => {
          expect(sw.state).to.equal(Stopwatch2.states.stop);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.gte(timeout);
          expect(sw.lastExecTime).to.gte(timeout);
        });
      });
    });

    describe('pause', () => {
      beforeEach(() => {
        sw.start();
        tempSw = { ...sw.pause() };
      });

      describe('-> start', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.start();
        });

        it('state should be start', () => {
          expect(sw.state).to.equal(Stopwatch2.states.start);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.gte(tempSw.lastStartTime + timeout);
          expect(sw.execTime).to.lt(timeout);
          expect(sw.lastExecTime).to.lt(timeout);
        });
      });

      describe('-> pause', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.pause();
        });

        it('state should be pause', () => {
          expect(sw.state).to.equal(Stopwatch2.states.pause);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.lt(timeout);
          expect(sw.lastExecTime).to.lt(timeout);
        });
      });

      describe('-> stop', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.stop();
        });

        it('state should be stop', () => {
          expect(sw.state).to.equal(Stopwatch2.states.stop);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.lt(timeout);
          expect(sw.lastExecTime).to.lt(timeout);
        });
      });
    });

    describe('stop', () => {
      beforeEach(() => {
        sw.start();
        tempSw = { ...sw.stop() };
      });

      describe('-> start', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.start();
        });

        it('state should be start', () => {
          expect(sw.state).to.equal(Stopwatch2.states.start);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.gte(tempSw.startTime + timeout);
          expect(sw.lastStartTime).to.gte(tempSw.lastStartTime + timeout);
          expect(sw.execTime).to.eq(0);
          expect(sw.lastExecTime).to.eq(0);
        });
      });

      describe('-> pause', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.pause();
        });

        it('state should be stop', () => {
          expect(sw.state).to.equal(Stopwatch2.states.stop);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.equal(tempSw.execTime);
          expect(sw.lastExecTime).to.equal(tempSw.lastExecTime);
        });
      });

      describe('-> stop', () => {
        beforeEach(() => {
          sw.sleep(timeout);
          sw.stop();
        });

        it('state should be stop', () => {
          expect(sw.state).to.equal(Stopwatch2.states.stop);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.equal(tempSw.execTime);
          expect(sw.lastExecTime).to.equal(tempSw.lastExecTime);
        });
      });
    });

    it('sleep', () => {
      sw.start();
      sw.sleep(timeout);
      sw.pause();
      expect(sw.execTime).to.gte(timeout);
    });

    it('toString', () => {
      sw.start();
      expect(
        /tag -> exec: .*?, state: start, start: .*?, lexec: .*?, lstart: .*?/.test(
          sw,
        ),
      ).to.be.true;
    });
  });

  describe('class methods', () => {
    let stopwatches;

    it('start', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      stopwatches = Stopwatch2.getArray();
      expect(stopwatches).to.lengthOf(3);
      stopwatches.forEach((d) => {
        expect(d.state).to.eq(Stopwatch2.states.start);
      });
    });

    it('pause', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      Stopwatch2.pause('tag2');
      expect(Stopwatch2.getOne('tag1').state).to.eq(Stopwatch2.states.start);
      expect(Stopwatch2.getOne('tag2').state).to.eq(Stopwatch2.states.pause);
      expect(Stopwatch2.getOne('tag3').state).to.eq(Stopwatch2.states.start);

      // all
      Stopwatch2.pause();
      stopwatches = Stopwatch2.getArray();
      stopwatches.forEach((d) => {
        expect(d.state).to.eq(Stopwatch2.states.pause);
      });
    });

    it('stop', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      Stopwatch2.stop('tag2');
      expect(Stopwatch2.getOne('tag1').state).to.eq(Stopwatch2.states.start);
      expect(Stopwatch2.getOne('tag2').state).to.eq(Stopwatch2.states.stop);
      expect(Stopwatch2.getOne('tag3').state).to.eq(Stopwatch2.states.start);

      // all
      Stopwatch2.stop();
      stopwatches = Stopwatch2.getArray();
      stopwatches.forEach((d) => {
        expect(d.state).to.eq(Stopwatch2.states.stop);
      });
    });

    it('sleep', () => {
      Stopwatch2.start('tag1');
      Stopwatch2.sleep(timeout);
      Stopwatch2.stop();
      expect(Stopwatch2.getOne('tag1').execTime).to.gte(timeout);
    });

    it('toString', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      Stopwatch2.stop('tag2');
      const reg = new RegExp(`tag1 -> exec: .*?, state: start, start: .*?, lexec: .*?, lstart: .*?
tag2 -> exec: .*?, state: stop, start: .*?, lexec: .*?, lstart: .*?
tag3 -> exec: .*?, state: start, start: .*?, lexec: .*?, lstart: .*?`);
      expect(reg.test(Stopwatch2)).to.be.true;
    });

    it('clear', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      new Stopwatch2('tag4');
      Stopwatch2.clear();
      stopwatches = Stopwatch2.getArray();
      expect(stopwatches).to.lengthOf(0);
    });

    it('registerToGlobal', () => {
      expect(Stopwatch2.registerToGlobal('Function')).to.be.false;

      expect(Stopwatch2.registerToGlobal('mysw')).to.be.true;
      // eslint-disable-next-line no-undef
      expect(mysw).to.eq(Stopwatch2);
    });

    it('get', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      new Stopwatch2('tag4');

      stopwatches = Stopwatch2.get();
      expect(stopwatches).to.have.own.property('tag1');
      expect(stopwatches).to.have.own.property('tag2');
      expect(stopwatches).to.have.own.property('tag3');
      expect(stopwatches).to.have.own.property('tag4');

      stopwatches = Stopwatch2.get('tag1', 'tag4');
      expect(stopwatches).to.have.own.property('tag1');
      expect(stopwatches).to.not.have.own.property('tag2');
      expect(stopwatches).to.not.have.own.property('tag3');
      expect(stopwatches).to.have.own.property('tag4');

      stopwatches = Stopwatch2.get('tag2');
      expect(stopwatches).to.have.own.property('tag2');
    });

    it('getOne', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      new Stopwatch2('tag4');
      expect(Stopwatch2.getOne('tag1').tag).to.eq('tag1');
      expect(Stopwatch2.getOne('tag4').tag).to.eq('tag4');
      expect(Stopwatch2.getOne('tag9')).to.eq(null);
    });

    it('getArray', () => {
      Stopwatch2.start('tag1', 'tag2', 'tag3');
      new Stopwatch2('tag4');
      stopwatches = Stopwatch2.getArray();
      expect(stopwatches).to.lengthOf(4);

      stopwatches = Stopwatch2.getArray('tag1', 'tag4');
      expect(stopwatches).to.lengthOf(2);

      stopwatches = Stopwatch2.getArray('tag2');
      expect(stopwatches).to.lengthOf(1);

      stopwatches = Stopwatch2.getArray('tag9');
      expect(stopwatches).to.lengthOf(0);
    });
  });

  describe('config', () => {});
});
