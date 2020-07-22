# stopwatch2

Measure the runtime of JavaScript code. (Mainly used for calculate the total runtime of a piece of code.)

# Installation

## npm

```bash
npm install stopwatch2
```

## CDN

```html
<script src=""></script>
```

# Usage

`stopwatch2` exposes a stopwatch object simply call `start`, `pause`, `stop` and etc. methods on it to measure the runtime of code.

ES6 Modules:

```js
import sw from 'stopwatch2';
sw.start('tag1');
// ...
sw.stop('tag1');
```

CMD:

```js
const sw = require('stopwatch2');
sw.start('tag1');
// ...
sw.stop('tag1');
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/stopwatch2@0.0.5/index.min.js"></script>
<script>
  const sw = new Stopwatch2('tag1');
  sw.start();
  // ...
  sw.pause();
  sw.stop();
  console.log(sw);

  // or
  Stopwatch2.start('tag2');
  Stopwatch2.pause('tag2');
  Stopwatch2.stop('tag2');
</script>
```

# Examples

## Statistic piece of code total runing time

```js
const SW = require('stopwatch2');

const pushSW = new SW('push');
const unshiftSW = new SW('unshift');

const arr1 = [];
const arr2 = [];
for (let i = 0; i < 1 << 17; i++) {
  // ...
  pushSW.start('push');
  arr1.push(i);
  pushSW.pause('push');

  // ...
  unshiftSW.start('unshift');
  arr2.unshift(i);
  unshiftSW.pause('unshift');

  // ...
}

console.log(SW);
/*
{
  "push": {
    "start": 3220.8307999372482,
    "execTime": 26.619016647338867
  },
  "unshift": {
    "start": 3220.83109998703,
    "execTime": 2575.789754152298
  }
}
*/
```

# API

## Class methods and attributes

| name                                        | description                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `Stopwatch2.start()`                        | Start timing.                                                                    |
| `Stopwatch2.pause()`                        | Pause timing                                                                     |
| `Stopwatch2.stop()`                         | Stop timing                                                                      |
| `Stopwatch2.clear()`                        | Clear stopwatch                                                                  |
| `Stopwatch2.toString()`                     | Return string form stopwatch info. Usually for log and print.                    |
| `Stopwatch2.sleep(ms: Number)`              | Sleep with given millisecond                                                     |
| `Stopwatch2.registerToGlobal(name: String)` | Register the stopwatch to global with the given name                             |
| `Stopwatch2.config.log`                     | Whether or not log result. <br/>default: {start: true, pause: false, stop: true} |

## Instance methods and attributes

| name                              | description                                                   |
| --------------------------------- | ------------------------------------------------------------- |
| `Stopwatch2.prototype.start()`    | Start timing.                                                 |
| `Stopwatch2.prototype.pause()`    | Pause timing.                                                 |
| `Stopwatch2.prototype.stop()`     | Stop timing.                                                  |
| `Stopwatch2.prototype.destroy()`  | Destroy stopwatch.                                            |
| `Stopwatch2.prototype.toString()` | Return string form stopwatch info. Usually for log and print. |

# Development

# Release History

## 0.0.6

- redesign API
