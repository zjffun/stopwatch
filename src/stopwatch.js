var isNode = new Function("try {return this===global;}catch(e){return false;}");
var isBrowser = new Function(
  "try {return this===self;}catch(e){ return false;}"
);

export default function(globalName) {
  let _performance = null,
    _global = null;

  if (isNode()) {
    _performance = require("perf_hooks").performance;
    _global = global;
  } else if (isBrowser()) {
    _performance = performance;
    _global = self;
  } else {
    console.error(`unknow environment!`);
    return false;
  }

  if (_global[globalName]) {
    console.error(`"${globalName}" already exist in global!`);
    return false;
  }

  const players = Symbol("players");
  const states = {
    start: Symbol("start"),
    pause: Symbol("pause"),
    stop: Symbol("stop")
  };

  const stopwatch = (_global[globalName] = {
    [players]: {},
    start(tag) {
      if (!stopwatch[players][tag]) {
        stopwatch[players][tag] = {
          start: _performance.now(),
          execTime: 0,
          state: states.start
        };
        return;
      }
      const player = stopwatch[players][tag];

      if (player.state === states.stop) {
        player.execTime = 0;
      }
      player.start = _performance.now();
      player.state = states.start;
    },
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
      player.state === states.pause;

      return runTime;
    },
    stop(tag) {
      if (!stopwatch[players][tag]) {
        console.error(`"${tag}" does not exist`);
        return;
      }

      const player = stopwatch[players][tag];
      stopwatch.pause("tag");
      player.state = states.stop;
      console.log(`${tag}: ${player.execTime}ms`);
      return player.execTime;
    },
    sleep(ms) {
      const start = Date.now();
      while (Date.now() - start < ms) {}
    },
    list() {
      const copy = JSON.parse(JSON.stringify(stopwatch[players]));
      console.log(copy);
      return copy;
    },
    clear() {
      stopwatch[players] = {};
      return true;
    }
  });

  return true;
}
