if (typeof Stopwatch2 === 'undefined') {
  Stopwatch2 = require('..');
}

if (typeof assert === 'undefined') {
  expect = require('chai').expect;
}

describe('#constructor', function () {
  it('should be an instance of Stopwatch2', () => {
    const sw = new Stopwatch2('tag');
    expect(sw).toBeInstanceOf(Stopwatch2);
  });

  it('state should be stop', () => {
    const sw = new Stopwatch2('tag');
    expect(sw.state).eq(Stopwatch2.state.stop);
  });

  it('should has times', () => {
    const sw = new Stopwatch2('tag');
    expect(sw.startTime).eq(0);
    expect(sw.lastStartTime).eq(0);
    expect(sw.execTime).eq(0);
  });
});

describe('instance methods', () => {
  let sw = null;
  beforeEach(() => {
    sw = new Stopwatch2('tag');
  });

  afterEach(() => {
    Stopwatch2.clear();
  });

  describe('start', () => {
    before(() => {
      sw.start();
    });
    it('state should be start', () => {
      expect(sw.state).eq(Stopwatch2.state.start);
    });
    it('should set startTime', () => {
      expect(sw.startTime).gt(0);
    });
    it('should set lastStartTime', () => {
      expect(sw.lastStartTime).gt(0);
    });
    it('should not set execTime', () => {
      expect(sw.execTime).gt(0);
    });
  });

  describe('pause', function () {
    before(() => {
      sw.pause();
    });
    it('state should be pause', () => {
      expect(sw.state).eq(Stopwatch2.state.pause);
    });
    it('should not set startTime', () => {
      expect(sw.startTime).eq(0);
    });
    it('should not set lastStartTime', () => {
      expect(sw.lastStartTime).eq(0);
    });
    it('should not set execTime', () => {
      expect(sw.execTime).eq(0);
    });
  });

  describe('stop', function () {
    before(() => {
      sw.pause();
    });
    it('state should be stop', () => {
      expect(sw.state).eq(Stopwatch2.state.stop);
    });
    it('should not set startTime', () => {
      expect(sw.startTime).eq(0);
    });
    it('should not set lastStartTime', () => {
      expect(sw.lastStartTime).eq(0);
    });
    it('should not set execTime', () => {
      expect(sw.execTime).eq(0);
    });
  });

  describe('start - pause', () => {});

  describe('pause - start', () => {});

  describe('start - stop', () => {});

  describe('stop - start', () => {});
});

describe('class methods', () => {});

describe('config', () => {});
