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
<script src=""></script>
<script>
  stopwatch2.start('tag1');
  // ...
  stopwatch2.stop('tag1');
</script>
```

# Examples

## Statistic piece of code total runing time

```js
const stopwatch2 = require('stopwatch2');

const arr1 = [];
const arr2 = [];
for (let i = 0; i < 1 << 17; i++) {
  // ...
  stopwatch2.start('push');
  arr1.push(i);
  stopwatch2.pause('push');

  // ...
  stopwatch2.start('unshift');
  arr2.unshift(i);
  stopwatch2.pause('unshift');

  // ...
}

stopwatch2.show();
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

| name                                        | desc                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `stopwatch2.start(tag: String)`             | Start timing                                                                                                        |
| `stopwatch2.pause(tag: String)`             | Pause timing. Return the run time from last start                                                                   |
| `stopwatch2.stop(tag: String)`              | Stop timing. Print and return current timer                                                                         |
| `stopwatch2.show(tag?: String)`             | Without `tag` param: print and return all timers<br> With `tag` param: print and return the timer with specific tag |
| `stopwatch2.clear()`                        | Clear all timers                                                                                                    |
| `stopwatch2.sleep(ms: Number)`              | Sleep with given millisecond                                                                                        |
| `stopwatch2.registerToGlobal(name: String)` | Register the stopwatch2 to global with the given name                                                               |
| `stopwatch2.config.print`                   | Whether or not print result when call `stop()` and `show()`, default: true                                          |

# Development

# Release History
