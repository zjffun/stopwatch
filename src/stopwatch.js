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
  start: Symbol('start'),
  pause: Symbol('pause'),
  stop: Symbol('stop'),
};

const prefix = {
  start: 'sw2-start--',
  stop: 'sw2-stop--',
};

const defaultConfig = {
  silent: false,
  performanceMeasure: true,
};

const players = Object.create(null);

class Stopwatch2 {
  constructor(tag) {
    this.create(tag);
  }

  /**
   * Start timing
   * @param {String} tag tag
   */
  start(tag) {
    if (!stopwatch[players][tag]) {
      stopwatch[players][tag] = {
        start: _performance.now(),
        execTime: 0,
        state: states.start,
      };

      if (isBrowser && this.config.performance) {
        _performance.mark(prefix.start + tag);
      }

      return;
    }

    const player = stopwatch[players][tag];

    if (player.state === states.stop) {
      player.execTime = 0;
    }
    player.start = _performance.now();

    player.state = states.start;
  }

  /**
   * Pause timing
   * @param {String} tag tag
   * @returns {Number} run time
   */
  pause(tag) {
    if (!stopwatch[players][tag]) {
      console.error(`"${tag}" does not exist`);
      return -1;
    }

    const player = stopwatch[players][tag];

    let runTime = 0;
    if (player.state === states.start) {
      runTime = _performance.now() - player.start;
      player.execTime += runTime;
    }
    player.state = states.pause;

    return runTime;
  }

  /**
   * Stop timing
   * @param {String} tag tag
   * @returns {Object} timer
   */
  stop(tag) {
    if (!stopwatch[players][tag]) {
      console.error(`"${tag}" does not exist`);
      return -1;
    }

    const player = stopwatch[players][tag];
    stopwatch.pause(tag);
    player.state = states.stop;

    if (isBrowser) {
      _performance.mark(prefix.stop + tag);
      _performance.measure(tag, prefix.start + tag, prefix.stop + tag);
    }

    if (print) {
      console.log(`${tag}: ${player.execTime}ms`);
    }

    return { ...player };
  }

  static start(tags) {
    return this.create(tags).map((p) => p.start());
  }

  static pause(tags) {
    return this.get(tags, (p) => p.pause());
  }

  static stop(tags) {
    return this.get(tags, (p) => p.stop());
  }

  /**
   * Suspends the execution
   * @param {Number} ms Number of millisecond
   */
  static sleep(ms) {
    const start = Date.now();
    // eslint-disable-next-line no-empty
    while (Date.now() - start < ms) {}
  }

  /**
   * Show palyer(s)
   * @param {String} [tag] tag
   * @returns {(Object|Array[Object])} palyer(s)
   */
  static toString(tags) {
    return this.get(tags, (d) => d.toString()).join('\n');
  }

  /**
   * Clear all palyers
   * @returns {Boolean} success
   */
  static clear() {
    stopwatch[players] = {};

    if (isBrowser) {
      _performance.clearMarks();
      _performance.clearMeasures();
    }

    return true;
  }

  /**
   * Register the stopwatch2 to global with the given name.
   * @param {String} globalName global name
   * @returns {Boolean} success
   */
  static registerToGlobal(globalName) {
    if (_global[globalName]) {
      console.error(`"${globalName}" already exist in global!`);
      return false;
    }
    _global[globalName] = stopwatch;
    return true;
  }

  static create(tags) {
    let sw;
    return sw;
  }

  static get(tags, fn) {
    if (Array.isArray(tags)) {
      const result = [];
      stopwatchs.forEach((sw) => {
        if (tags.includes(sw.tag)) {
          result.push(fn ? fn(sw) : sw);
        }
      });
      return result;
    }

    for (const sw of stopwatchs) {
      if (sw.tag === tags) {
        return fn ? fn(sw) : sw;
      }
    }

    return null;
  }

  /**
   * config object
   */
  static config = defaultConfig;
}

export default stopwatch;
