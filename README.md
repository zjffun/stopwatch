[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]

# stopwatch2

Measure the runtime of JavaScript code. (Mainly used for calculate the total runtime of a piece of code.)

## Installation

### npm

```bash
npm install stopwatch2
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/stopwatch2@latest/index.min.js"></script>
```

## Usage

`Stopwatch2` exposes a class simply call `start`, `pause`, `stop` and etc. methods on it's instance or itself to measure the runtime of code.

ES6 Modules:

```js
import Stopwatch2 from 'stopwatch2';

Stopwatch2.start('tag1');
Stopwatch2.pause('tag1');
Stopwatch2.stop('tag1');

// or

const sw = new Stopwatch2('tag2');
sw.start();
sw.pause();
sw.stop();

// show result
console.table(sw);
console.table(Stopwatch2.get());
```

CMD:

```js
const Stopwatch2 = require('stopwatch2');

Stopwatch2.start('tag1');
Stopwatch2.pause('tag1');
Stopwatch2.stop('tag1');

// or

const sw = new Stopwatch2('tag2');
sw.start();
sw.pause();
sw.stop();

// show result
console.table(sw);
console.table(Stopwatch2.get());
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/stopwatch2@latest/index.min.js"></script>
<script>
  Stopwatch2.start('tag1');
  Stopwatch2.pause('tag1');
  Stopwatch2.stop('tag1');

  // or

  const sw = new Stopwatch2('tag2');
  sw.start();
  sw.pause();
  sw.stop();

  // show result
  console.table(sw);
  console.table(Stopwatch2.get());
</script>
```

## Examples

### Statistic piece of code total runing time

```js
const Stopwatch2 = require('stopwatch2');

const pushSW = new Stopwatch2('push');
const unshiftSW = new Stopwatch2('unshift');

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

console.table(Stopwatch2.get());
/*
┌─────────┬───────────────────┬────────────────────┬────────────────────┬────────────────────────┬─────────┬───────────┐
│ (index) │     startTime     │   lastStartTime    │      execTime      │      lastExecTime      │  state  │    tag    │
├─────────┼───────────────────┼────────────────────┼────────────────────┼────────────────────────┼─────────┼───────────┤
│  push   │ 65.48650002479553 │ 2245.4135000109673 │ 20.006211578845978 │ 0.00010001659393310547 │ 'pause' │  'push'   │
│ unshift │ 65.70870000123978 │ 2245.4136999845505 │ 2126.4831227064133 │  0.044700026512145996  │ 'pause' │ 'unshift' │
└─────────┴───────────────────┴────────────────────┴────────────────────┴────────────────────────┴─────────┴───────────┘
*/

console.log('' + Stopwatch2);
/*
push -> exec: 20.006211578845978, state: pause, start: 65.48650002479553, lexec: 0.00010001659393310547, lstart: 2245.4135000109673
unshift -> exec: 2126.4831227064133, state: pause, start: 65.70870000123978, lexec: 0.044700026512145996, lstart: 2245.4136999845505
*/

console.table(pushSW);
/*
┌───────────────┬────────────────────────┐
│    (index)    │         Values         │
├───────────────┼────────────────────────┤
│   startTime   │    71.1270010471344    │
│ lastStartTime │   2192.5521000027657   │
│   execTime    │   20.203357875347137   │
│ lastExecTime  │ 0.00010001659393310547 │
│     state     │        'pause'         │
│      tag      │         'push'         │
└───────────────┴────────────────────────┘
*/

console.log('' + pushSW);
/*
push -> exec: 20.203357875347137, state: pause, start: 71.1270010471344, lexec: 0.00010001659393310547, lstart: 2192.5521000027657
*/
```

## API

### Instance methods and attributes

| name                                 | description                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `Stopwatch2.prototype.start()`       | Start this stopwatch.                                                                      |
| `Stopwatch2.prototype.pause()`       | Pause this stopwatch.                                                                      |
| `Stopwatch2.prototype.stop()`        | Stop this stopwatch.                                                                       |
| `Stopwatch2.prototype.toString()`    | Return the string form stopwatch info. Usually for log and print.                          |
| `Stopwatch2.prototype.startTime`     | (number) The start time of this stopwatch.                                                 |
| `Stopwatch2.prototype.lastStartTime` | (number) The time of the last `start` call of this stopwatch.                              |
| `Stopwatch2.prototype.execTime`      | (number) The total execute time of this stopwatch.                                         |
| `Stopwatch2.prototype.lastExecTime`  | (number) The last execute time of this stopwatch.                                          |
| `Stopwatch2.prototype.state`         | (string) The state of this stopwatch. This value can be one of `start`, `pause` and `stop` |
| `Stopwatch2.prototype.tag`           | (string) The tag of this stopwatch.                                                        |

### Class methods and attributes

| name                                       | description                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `Stopwatch2.start(tag1, tag2, ...)`        | Start multiple stopwatches. If no tag name given, start all.                                    |
| `Stopwatch2.pause(tag1, tag2, ...)`        | Pause multiple stopwatches. If no tag name given, pause all.                                    |
| `Stopwatch2.stop(tag1, tag2, ...)`         | Stop multiple stopwatches. If no tag name given, stop all.                                      |
| `Stopwatch2.clear()`                       | Clear stopwatches.                                                                              |
| `Stopwatch2.create(tag1, tag2, ...)`       | Create multiple stopwatches.                                                                    |
| `Stopwatch2.get(tag1, tag2, ...)`          | Get object form stopwatches.If no tag name given, return all. Usually use with `console.table`. |
| `Stopwatch2.getArray(tag1, tag2, ...)`     | Get array form stopwatches. If no tag name given, return all.                                   |
| `Stopwatch2.getOne(tag)`                   | Get one stopwatch.                                                                              |
| `Stopwatch2.toString()`                    | Return string form stopwatch info. Usually for log and print.                                   |
| `Stopwatch2.sleep(ms)`                     | Sleep with given millisecond.                                                                   |
| `Stopwatch2.registerToGlobal(name)`        | Regist the Stopwatch2 to global with given name.                                                |
| `Stopwatch2.config.performanceMeasurement` | Whether or not record the result to browser's Performance pannel. <br/>default: false           |
| `Stopwatch2.states`                        | (object) Contain `start`, `pause` and `stop` state attribute.                                   |

## Development

## Release History

### 0.0.7

- fix the environment detection

### 0.0.6

- redesign API

[fury-link]: https://badge.fury.io/js/stopwatch2
[fury-badge]: https://badge.fury.io/js/stopwatch2.svg
[jsdelivr-link]: https://www.jsdelivr.com/package/npm/stopwatch2
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/stopwatch2/badge
