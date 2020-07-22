/* stopwatch2 version 0.0.5 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.stopwatch2 = factory());
}(this, (function () { 'use strict';

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
    // eslint-disable-next-line no-restricted-globals
    _global = window.self;
  } else {
    throw Error('unknow environment!');
  }

  const players = Symbol('players');

  const states = {
    start: Symbol('start'),
    pause: Symbol('pause'),
    stop: Symbol('stop'),
  };

  const prefix = {
    start: 'sw2-start--',
    stop: 'sw2-stop--',
  };

  const _config = {
    print: true,
  };

  const stopwatch = {
    [players]: {},

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

        if (isBrowser) {
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
    },

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
    },

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

      _config.print && console.log(`${tag}: ${player.execTime}ms`);
      return { ...player };
    },

    /**
     * Suspends the execution
     * @param {Number} ms Number of millisecond
     */
    sleep(ms) {
      const start = Date.now();
      // eslint-disable-next-line no-empty
      while (Date.now() - start < ms) {}
    },

    /**
     * Show palyer(s)
     * @param {String} [tag] tag
     * @returns {(Object|Array[Object])} palyer(s)
     */
    show(tag) {
      let showingTimer = stopwatch[players];

      if (tag) {
        showingTimer = stopwatch[players][tag];
      }

      const report = JSON.stringify(showingTimer, null, 2);
      const copy = JSON.parse(report);
      _config.print && console.log(report);
      return copy;
    },

    /**
     * Clear all palyers
     * @returns {Boolean} success
     */
    clear() {
      stopwatch[players] = {};

      if (isBrowser) {
        _performance.clearMarks();
        _performance.clearMeasures();
      }

      return true;
    },

    /**
     * Register the stopwatch2 to global with the given name.
     * @param {String} globalName global name
     * @returns {Boolean} success
     */
    registerToGlobal(globalName) {
      if (_global[globalName]) {
        console.error(`"${globalName}" already exist in global!`);
        return false;
      }
      _global[globalName] = stopwatch;
      return true;
    },

    /**
     * config object
     */
    config: _config,
  };

  return stopwatch;

})));
