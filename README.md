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

`stopwatch2` exposes a function; simply pass this function the name of your group, and it will return a stopwatch object for you to measure the runtime of code.

ES6 Modules:

```js
import sw from "stopwatch2";
const mysw = sw("group1");
```

CMD:

```js
const mysw = require("stopwatch2")("group1");

/**
 * Register a stopwatch to global
 */
sw("mysw");

/**
 * start pause stop sleep
 */
mysw.start("tag");
var t1 = mysw.pause("tag");

mysw.sleep(500);

mysw.start("tag");
var t2 = mysw.pause("tag");

var tstop = mysw.stop("tag");
console.log(t1, t2, tstop);

/**
 * list clear
 */
mysw.list();
mysw.clear();
```

# Examples

## Statistic piece of code runtime

```js
```

## Statistic async function wait and runtime

```js
```

# Development

# Release History
