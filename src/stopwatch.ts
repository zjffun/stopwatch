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

class Stopwatch2 {
  startTime = 0;
  lastStartTime = 0;
  execTime = 0;
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
    players[tag] = this;
  }

  start(): Stopwatch2 {
    if (this.state === states.stop) {
      this.startTime = _performance.now();
      this.lastStartTime = this.startTime;
      this.execTime = 0;
    }

    if (isMeasurePerformance()) {
      _performance.mark(prefix.start + this.tag);
    }

    this.lastStartTime = _performance.now();

    this.state = states.start;
    return this;
  }

  pause(): Stopwatch2 {
    let runTime = 0;
    if (this.state === states.start) {
      runTime = _performance.now() - this.lastStartTime;
      this.execTime += runTime;
    }

    this.state = states.pause;

    return this;
  }

  stop(): Stopwatch2 {
    this.pause();
    this.state = states.stop;

    if (isMeasurePerformance()) {
      _performance.mark(prefix.stop + this.tag);
      _performance.measure(
        this.tag,
        prefix.start + this.tag,
        prefix.stop + this.tag,
      );
    }
    return this;
  }

  static start(tags: string | string[]): Stopwatch2[] {
    return Stopwatch2.create(tags).map((p) => p.start());
  }

  static pause(tags: string | string[]): Stopwatch2[] {
    return Stopwatch2.get(tags, (p) => p.pause());
  }

  static stop(tags: string | string[]): Stopwatch2[] {
    return Stopwatch2.get(tags, (p) => p.stop());
  }

  /**
   * Suspends the execution
   * @param {number} ms Number of millisecond
   */
  static sleep(ms: number): void {
    const start = Date.now();
    // eslint-disable-next-line no-empty
    while (Date.now() - start < ms) {}
  }

  static toString(tags: string | string[]) {
    return Stopwatch2.get(tags, (d) => d.toString()).join('\n');
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
      console.error(`"${globalName}" already exist in global!`);
      return false;
    }
    _global[globalName] = Stopwatch2;
    return true;
  }

  static create(tags: string | string[]): Stopwatch2[] {
    if (Array.isArray(tags)) {
      const result = [];
      tags.forEach((tag) => {
        result.push(new Stopwatch2(tag));
      });
      return result;
    }
    return Stopwatch2.create([tags]);
  }

  static get(
    tags: string | string[],
    fn: (Stopwatch2) => Stopwatch2,
  ): Stopwatch2[] {
    if (Array.isArray(tags)) {
      const result = [];
      players.forEach((sw) => {
        if (tags.includes(sw.tag)) {
          result.push(fn ? fn(sw) : sw);
        }
      });
      return result;
    }

    return Stopwatch2.get([tags], fn);
  }
}

export default Stopwatch2;
