if (typeof Stopwatch2 === 'undefined') {
  Stopwatch2 = require('..');
}

if (typeof expect === 'undefined') {
  expect = require('chai').expect;
}

describe('Stopwatch2', () => {
  let sw = null;
  let tempSw = null;

  beforeEach(() => {
    sw = new Stopwatch2('tag');
  });

  afterEach(() => {
    Stopwatch2.clear();
  });

  describe('#constructor', function () {
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
    describe('start', () => {
      beforeEach(() => {
        tempSw = { ...sw.start() };
        sw.start();
      });

      describe('-> start', () => {
        beforeEach(() => {
          sw.start();
        });

        it('state should be start', () => {
          expect(sw.state).to.equal(Stopwatch2.states.start);
        });

        it('times should correct', () => {
          debugger
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).to.equal(tempSw.execTime);
          expect(sw.lastExecTime).to.equal(tempSw.lastExecTime);
        });
      });

      describe('-> pause', () => {
        beforeEach(() => {
          tempSw = { ...sw.start() };
          sw.pause();
        });

        it('state should be pause', () => {
          expect(sw.state).to.equal(Stopwatch2.states.pause);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).gt(tempSw.startTime);
          expect(sw.lastExecTime).gt(tempSw.startTime);
        });
      });

      describe('-> stop', () => {
        beforeEach(() => {
          tempSw = { ...sw.stop() };
          sw.stop();
        });

        it('state should be stop', () => {
          expect(sw.state).to.equal(Stopwatch2.states.stop);
        });

        it('times should correct', () => {
          expect(sw.startTime).to.equal(tempSw.startTime);
          expect(sw.lastStartTime).to.equal(tempSw.lastStartTime);
          expect(sw.execTime).gt(tempSw.startTime);
          expect(sw.lastExecTime).gt(tempSw.startTime);
        });
      });
    });

    describe('pause -> start', () => {});

    describe('pause -> pause', () => {});

    describe('pause -> stop', () => {});

    describe('stop -> start', () => {
      before(() => {
        sw.start();
      });

      it('state should be start', () => {
        expect(sw.state).to.equal(Stopwatch2.states.start);
      });

      it('times should correct', () => {
        expect(sw.startTime).gt(0);
        expect(sw.lastStartTime).to.equal(0);
        expect(sw.execTime).to.equal(0);
        expect(sw.lastExecTime).to.equal(0);
      });
    });

    describe('stop -> pause', function () {
      before(() => {
        sw.pause();
      });

      it('state should be pause', () => {
        expect(sw.state).to.equal(Stopwatch2.states.pause);
      });

      it('times should correct', () => {
        expect(sw.startTime).to.equal(0);
        expect(sw.lastStartTime).to.equal(0);
        expect(sw.execTime).to.equal(0);
        expect(sw.lastExecTime).to.equal(0);
      });
    });

    describe('stop -> stop', function () {
      before(() => {
        sw.stop();
      });

      it('state should be stop', () => {
        expect(sw.state).to.equal(Stopwatch2.states.stop);
      });

      it('times should correct', () => {
        expect(sw.startTime).to.equal(0);
        expect(sw.lastStartTime).to.equal(0);
        expect(sw.execTime).to.equal(0);
        expect(sw.lastExecTime).to.equal(0);
      });
    });
  });

  describe('class methods', () => {});

  describe('config', () => {});
});
