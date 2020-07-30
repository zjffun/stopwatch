// eslint-disable-next-line no-new-func
const isNode = new Function(
  'try{return this===global;}catch(e){return false;}',
)();
// eslint-disable-next-line no-new-func
const isBrowser = new Function(
  'try{return this===self;}catch(e){return false;}',
)();

let _performance = null;
let _global = null;

if (isNode) {
  // let this require out of rollup control
  _performance = eval('require("perf_hooks")').performance;
  _global = global;
} else if (isBrowser) {
  _performance = performance;
  // eslint-disable-next-line no-undef
  _global = window.self;
} else {
  throw Error('unknow environment!');
}

const states = {
  __proto__: null,
  start: Symbol('start'),
  pause: Symbol('pause'),
  stop: Symbol('stop'),
};

const prefix = {
  __proto__: null,
  start: 'sw2-start--',
  stop: 'sw2-stop--',
};

let players = Object.create(null);

function isMeasurePerformance() {
  return isBrowser && Stopwatch2.config.performanceMeasure;
}

function sleep(ms: number): void {
  const start = _performance.now();
  // eslint-disable-next-line no-empty
  while (_performance.now() - start < ms) {}
}

class Stopwatch2 {
  startTime = 0;
  lastStartTime = 0;
  execTime = 0;
  lastExecTime = 0;
  state = states.stop;
  tag;

  static config = {
    __proto__: null,
    silent: false,
    performanceMeasure: true,
  };

  static states = states;

  constructor(tag: string) {
    this.tag = tag;
    this.stop();
    players[tag] = this;
  }

  start(): Stopwatch2 {
    const now = _performance.now();

    switch (this.state) {
      case states.start:
      case states.pause:
        this.lastStartTime = now;
        break;
      case states.stop:
      default:
        this.startTime = now;
        this.lastStartTime = now;
        this.execTime = 0;
        this.lastExecTime = 0;
        break;
    }

    if (isMeasurePerformance()) {
      _performance.mark(prefix.start + this.tag);
    }

    this.state = states.start;

    return this;
  }

  pause(): Stopwatch2 {
    switch (this.state) {
      case states.start:
        let runTime = _performance.now() - this.lastStartTime;
        this.lastExecTime = runTime;
        this.execTime += runTime;
        this.state = states.pause;
        break;
      case states.pause:
      case states.stop:
      default:
        break;
    }

    return this;
  }

  stop(): Stopwatch2 {
    switch (this.state) {
      case states.start:
        this.pause();
      // don't break here, need continue to run
      case states.pause:
        if (isMeasurePerformance()) {
          _performance.mark(prefix.stop + this.tag);
          _performance.measure(
            this.tag,
            prefix.start + this.tag,
            prefix.stop + this.tag,
          );
        }
        break;
      case states.stop:
      default:
        break;
    }

    this.state = states.stop;

    return this;
  }

  sleep(ms) {
    sleep(ms);
  }

  toString() {
    // TODO
    return JSON.stringify(this);
  }

  static start(...tags: string[]): Stopwatch2[] {
    return Stopwatch2.create(...tags).map((p) => p.start());
  }

  static pause(...tags: string[]): Stopwatch2[] {
    return Stopwatch2.get(...tags).map((p) => p.pause());
  }

  static stop(...tags: string[]): Stopwatch2[] {
    return Stopwatch2.get(...tags).map((p) => p.stop());
  }

  /**
   * Suspends the execution
   * @param {number} ms Number of millisecond
   */
  static sleep(ms) {
    sleep(ms);
  }

  static toString(...tags: string[]) {
    return Stopwatch2.get(...tags)
      .map((d) => d.toString())
      .join('\n');
  }

  static clear(): boolean {
    players = Object.create(null);

    if (isMeasurePerformance()) {
      _performance.clearMarks();
      _performance.clearMeasures();
    }

    return true;
  }

  /**
   * Register the stopwatch2 to global with the given name.
   * @param {string} globalName global name
   */
  static registerToGlobal(globalName: string): boolean {
    if (_global[globalName]) {
      console.error(`Name "${globalName}" already exist in global!`);
      return false;
    }
    _global[globalName] = Stopwatch2;
    return true;
  }

  static create(...tags: string[]): Stopwatch2[] {
    const result = [];
    tags.forEach((tag) => {
      result.push(new Stopwatch2(tag));
    });
    return result;
  }

  static get(...tags: string[]): Stopwatch2[] {
    if (tags.length === 0) {
      return Object.values(players);
    }

    const result = [];
    for (const tag in players) {
      if (Object.prototype.hasOwnProperty.call(players, tag)) {
        const player = players[tag];
        if (tags.includes(tag)) {
          result.push(player);
        }
      }
    }
    return result;
  }

  static getOne(tag: string): Stopwatch2 | null {
    const player = players[tag];
    if (player) {
      return player;
    }
    return null;
  }
}

export default Stopwatch2;
