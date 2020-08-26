const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

let _performance: any = null;
let _global: any = null;

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
  __proto__: <null>null,
  start: 'start',
  pause: 'pause',
  stop: 'stop',
};

const prefix = {
  __proto__: <null>null,
  start: 'sw2-start--',
  pause: 'sw2-pause--',
};

let stopwatches = Object.create(null);

function isPerformanceMeasureOn() {
  return isBrowser && Stopwatch2.config.performanceMeasurement;
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
  tag: string;

  static config = {
    __proto__: <null>null,
    performanceMeasurement: false,
  };

  static states = states;

  constructor(tag: string) {
    this.tag = tag;
    this.stop();
    stopwatches[tag] = this;
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

    if (isPerformanceMeasureOn()) {
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

        if (isPerformanceMeasureOn()) {
          _performance.mark(prefix.pause + this.tag);
          _performance.measure(
            this.tag,
            prefix.start + this.tag,
            prefix.pause + this.tag,
          );
        }

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
        break;
      case states.pause:
      case states.stop:
      default:
        break;
    }

    this.state = states.stop;

    return this;
  }

  sleep(ms: number) {
    sleep(ms);
  }

  toString() {
    return `${this.tag} -> exec: ${this.execTime}, state: ${this.state}, start: ${this.startTime}, lexec: ${this.lastExecTime}, lstart: ${this.lastStartTime}`;
  }

  static start(...tags: string[]): Stopwatch2[] {
    Stopwatch2.create(...tags);

    return Stopwatch2.getArray(...tags).map((p) => p.start());
  }

  static pause(...tags: string[]): Stopwatch2[] {
    return Stopwatch2.getArray(...tags).map((p) => p.pause());
  }

  static stop(...tags: string[]): Stopwatch2[] {
    return Stopwatch2.getArray(...tags).map((p) => p.stop());
  }

  /**
   * Suspends the execution
   * @param {number} ms Number of millisecond
   */
  static sleep(ms: number) {
    sleep(ms);
  }

  static toString(...tags: string[]) {
    return Stopwatch2.getArray(...tags)
      .map((d) => d.toString())
      .join('\n');
  }

  static clear(): boolean {
    stopwatches = Object.create(null);

    if (isPerformanceMeasureOn()) {
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
    const result: Array<Stopwatch2> = [];
    tags.forEach((tag) => {
      result.push(new Stopwatch2(tag));
    });
    return result;
  }

  static getArray(...tags: string[]): Stopwatch2[] {
    if (tags.length === 0) {
      return Object.values(stopwatches);
    }

    const result = [];
    for (const tag in stopwatches) {
      if (Object.prototype.hasOwnProperty.call(stopwatches, tag)) {
        const stopwatch = stopwatches[tag];
        if (tags.includes(tag)) {
          result.push(stopwatch);
        }
      }
    }
    return result;
  }

  static getOne(tag: string): Stopwatch2 | null {
    const stopwatch = stopwatches[tag];
    if (stopwatch) {
      return stopwatch;
    }
    return null;
  }

  static get(...tags: string[]): Object {
    if (tags.length === 0) {
      return Object.assign({}, stopwatches);
    }

    const result = Object.create(null);
    for (const tag in stopwatches) {
      if (Object.prototype.hasOwnProperty.call(stopwatches, tag)) {
        const stopwatch = stopwatches[tag];
        if (tags.includes(tag)) {
          result[tag] = stopwatch;
        }
      }
    }
    return result;
  }
}

export default Stopwatch2;
