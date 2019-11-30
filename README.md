# stopwatch
Statistics the run time of JavaScript code. (Mainly used for calculate the total run time of a piece of code.)

# Installation

## npm

```
npm install stopwatch2
```

ES6 Modules:

```
import sw from "stopwatch2";
```

CMD:

```
const sw = require("stopwatch2");
```

## CDN

```
<script src=""></script>
```

# Usage

CMD:

```js
const sw = require("stopwatch2");

/**
 * Register a stopwatch to global
 */
sw("mysw")

/**
 * start pause stop sleep
 */
mysw.start('tag');
var t1 = mysw.pause('tag');

mysw.sleep(500);

mysw.start('tag');
var t2 = mysw.pause('tag');

var tstop = mysw.stop('tag');
console.log(t1, t2, tstop);

/**
 * list clear
 */
mysw.list();
mysw.clear();
```

# Examples

## Statistic piece of code run time

```js
```

## Statistic async function wait and run time

```js
```

# Development

# Release History