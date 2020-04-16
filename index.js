(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.stopwatch2 = factory());
}(this, (function () { 'use strict';

  var isNode = new Function(
    "try {return this===global;}catch(e){return false;}"
  )();
  var isBrowser = new Function(
    "try {return this===self;}catch(e){ return false;}"
  )();

  let _performance = null,
    _global = null;

  if (isNode) {
    // let this require out of webpack control
    _performance = eval('require("perf_hooks")').performance;
    _global = global;
  } else if (isBrowser) {
    _performance = performance;
    _global = self;
  } else {
    throw Error(`unknow environment!`);
  }

  const players = Symbol("players");

  const states = {
    start: Symbol("start"),
    pause: Symbol("pause"),
    stop: Symbol("stop"),
  };

  const prefix = {
    start: "sw2-start--",
    stop: "sw2-stop--",
  };

  const stopwatchs = {};

  /**
   * Factory
   * @param {String} groupName groupName
   */
  function stopwatch (groupName) {
    if (stopwatchs[groupName]) {
      return stopwatchs[groupName];
    }

    const stopwatch = (stopwatchs[groupName] = {
      [players]: {},

      /**
       * Start time
       * @param {String} tag tag
       */
      start(tag) {
        if (!stopwatch[players][tag]) {
          stopwatch[players][tag] = {
            start: _performance.now(),
            execTime: 0,
            state: states.start,
          };
          return;
        }
        const player = stopwatch[players][tag];

        if (player.state === states.stop) {
          player.execTime = 0;
        }
        player.start = _performance.now();

        if (isBrowser) {
          _performance.mark(prefix.start + tag);
        }

        player.state = states.start;
      },

      /**
       * Pause time
       * @param {String} tag tag
       */
      pause(tag) {
        if (!stopwatch[players][tag]) {
          console.error(`"${tag}" does not exist`);
          return;
        }

        const player = stopwatch[players][tag];

        let runTime = 0;
        if (player.state === states.start) {
          runTime = _performance.now() - player.start;
          player.execTime += runTime;
        }
        player.state = states.pause;

        return runTime;
      },

      /**
       * Stop time
       * @param {String} tag tag
       */
      stop(tag) {
        if (!stopwatch[players][tag]) {
          console.error(`"${tag}" does not exist`);
          return;
        }

        const player = stopwatch[players][tag];
        stopwatch.pause(tag);
        player.state = states.stop;

        if (isBrowser) {
          _performance.mark(prefix.stop + tag);
          _performance.measure(tag, prefix.start + tag, prefix.stop + tag);
        }

        console.log(`${tag}: ${player.execTime}ms`);
        return player.execTime;
      },

      /**
       * Suspends the execution
       * @param {Number} ms Number of millisecond
       */
      sleep(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {}
      },

      /**
       * List all palyers
       * @returns {Array} palyers
       */
      list() {
        const copy = JSON.parse(JSON.stringify(stopwatch[players]));
        console.log(copy);
        return copy;
      },

      /**
       * Clear all palyers
       */
      clear() {
        stopwatch[players] = {};

        if (isBrowser) {
          _performance.clearMarks();
          _performance.clearMeasures();
        }

        return true;
      },
    });

    return stopwatch;
  }

  return stopwatch;

})));
