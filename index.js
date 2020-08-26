/* Stopwatch2 version 0.0.7 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Stopwatch2 = factory());
}(this, (function () { 'use strict';

    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    var isNode = typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null;
    var _performance = null;
    var _global = null;
    if (isNode) {
        // let this require out of rollup control
        _performance = eval('require("perf_hooks")').performance;
        _global = global;
    }
    else if (isBrowser) {
        _performance = performance;
        // eslint-disable-next-line no-undef
        _global = window.self;
    }
    else {
        throw Error('unknow environment!');
    }
    var states = {
        __proto__: null,
        start: 'start',
        pause: 'pause',
        stop: 'stop'
    };
    var prefix = {
        __proto__: null,
        start: 'sw2-start--',
        pause: 'sw2-pause--'
    };
    var stopwatches = Object.create(null);
    function isPerformanceMeasureOn() {
        return isBrowser && Stopwatch2.config.performanceMeasurement;
    }
    function sleep(ms) {
        var start = _performance.now();
        // eslint-disable-next-line no-empty
        while (_performance.now() - start < ms) { }
    }
    var Stopwatch2 = /** @class */ (function () {
        function Stopwatch2(tag) {
            this.startTime = 0;
            this.lastStartTime = 0;
            this.execTime = 0;
            this.lastExecTime = 0;
            this.state = states.stop;
            this.tag = tag;
            this.stop();
            stopwatches[tag] = this;
        }
        Stopwatch2.prototype.start = function () {
            var now = _performance.now();
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
        };
        Stopwatch2.prototype.pause = function () {
            switch (this.state) {
                case states.start:
                    var runTime = _performance.now() - this.lastStartTime;
                    this.lastExecTime = runTime;
                    this.execTime += runTime;
                    this.state = states.pause;
                    if (isPerformanceMeasureOn()) {
                        _performance.mark(prefix.pause + this.tag);
                        _performance.measure(this.tag, prefix.start + this.tag, prefix.pause + this.tag);
                    }
                    break;
                case states.pause:
                case states.stop:
                default:
                    break;
            }
            return this;
        };
        Stopwatch2.prototype.stop = function () {
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
        };
        Stopwatch2.prototype.sleep = function (ms) {
            sleep(ms);
        };
        Stopwatch2.prototype.toString = function () {
            return this.tag + " -> exec: " + this.execTime + ", state: " + this.state + ", start: " + this.startTime + ", lexec: " + this.lastExecTime + ", lstart: " + this.lastStartTime;
        };
        Stopwatch2.start = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            Stopwatch2.create.apply(Stopwatch2, tags);
            return Stopwatch2.getArray.apply(Stopwatch2, tags).map(function (p) { return p.start(); });
        };
        Stopwatch2.pause = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            return Stopwatch2.getArray.apply(Stopwatch2, tags).map(function (p) { return p.pause(); });
        };
        Stopwatch2.stop = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            return Stopwatch2.getArray.apply(Stopwatch2, tags).map(function (p) { return p.stop(); });
        };
        /**
         * Suspends the execution
         * @param {number} ms Number of millisecond
         */
        Stopwatch2.sleep = function (ms) {
            sleep(ms);
        };
        Stopwatch2.toString = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            return Stopwatch2.getArray.apply(Stopwatch2, tags).map(function (d) { return d.toString(); })
                .join('\n');
        };
        Stopwatch2.clear = function () {
            stopwatches = Object.create(null);
            if (isPerformanceMeasureOn()) {
                _performance.clearMarks();
                _performance.clearMeasures();
            }
            return true;
        };
        /**
         * Register the stopwatch2 to global with the given name.
         * @param {string} globalName global name
         */
        Stopwatch2.registerToGlobal = function (globalName) {
            if (_global[globalName]) {
                console.error("Name \"" + globalName + "\" already exist in global!");
                return false;
            }
            _global[globalName] = Stopwatch2;
            return true;
        };
        Stopwatch2.create = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            var result = [];
            tags.forEach(function (tag) {
                result.push(new Stopwatch2(tag));
            });
            return result;
        };
        Stopwatch2.getArray = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            if (tags.length === 0) {
                return Object.values(stopwatches);
            }
            var result = [];
            for (var tag in stopwatches) {
                if (Object.prototype.hasOwnProperty.call(stopwatches, tag)) {
                    var stopwatch = stopwatches[tag];
                    if (tags.includes(tag)) {
                        result.push(stopwatch);
                    }
                }
            }
            return result;
        };
        Stopwatch2.getOne = function (tag) {
            var stopwatch = stopwatches[tag];
            if (stopwatch) {
                return stopwatch;
            }
            return null;
        };
        Stopwatch2.get = function () {
            var tags = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tags[_i] = arguments[_i];
            }
            if (tags.length === 0) {
                return Object.assign({}, stopwatches);
            }
            var result = Object.create(null);
            for (var tag in stopwatches) {
                if (Object.prototype.hasOwnProperty.call(stopwatches, tag)) {
                    var stopwatch = stopwatches[tag];
                    if (tags.includes(tag)) {
                        result[tag] = stopwatch;
                    }
                }
            }
            return result;
        };
        Stopwatch2.config = {
            __proto__: null,
            performanceMeasurement: false
        };
        Stopwatch2.states = states;
        return Stopwatch2;
    }());

    return Stopwatch2;

})));
