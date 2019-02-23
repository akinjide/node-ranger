# node-ranger


[![npm](https://img.shields.io/npm/v/node-ranger.svg?style=flat)](https://npmjs.org/package/node-ranger)
[![npm](https://img.shields.io/npm/dm/node-ranger.svg?style=flat)](https://npmjs.org/package/node-ranger)
[![Build Status](https://travis-ci.org/akinjide/node-ranger.svg?branch=master)](https://travis-ci.org/akinjide/node-ranger)


*Range function for Node.js*


![Frankenstein Sketch](static/frankenstein-sketch.png)


## Installation

To install `ranger` using [npm](https://www.npmjs.org/), simply run:

```console
$ npm install node-ranger
```

In the root of your project directory.


## Usage

Once you have `ranger` installed, you can use it to easily get an Array or Object of numbers providing three arguments, a start, end and step value. The function call `ranger.fill(1, 10, 2)` should return `[1, 3, 5, 7, 9]`:

```javascript
var ranger = require('ranger')
var range = ranger.fill(1, 10, 2)

range.then(console.log)
// [1, 3, 5, 7, 9]
```

Want the range as an Object? No Problem!

```javascript
var ranger = require('ranger')
var range = ranger.object(1, 10, 2)

range.then(console.log)
// {0: 1, 1: 3, 2: 5, 3: 7, 4: 9}
```

The method above uses the reduce method, if you prefer the native `for..loop`, `use .fill()`.

Want alphabets range as an Array? Got you!

```javascript
var ranger = require('ranger')
var range = ranger.rune('a', 'e')

range.then(console.log)
// ['a', 'b', 'c', 'd', 'e', 'f']
```


## Author's Journal
- I had a hard time finding the right name for each method.
- I didn't want to call this library `ranger`, but I don't have
  any ideas. ¯\\_(ツ)_/¯
- ~~Implementing Async soon!~~
- ~~Implementing characters soon!~~


## Changelog

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

v2.1.0 : 2/23/19, 11:37 PM
```text
  - Add .rune([start], stop[, order])
  - Add Tests for #rune() Callback and Promises
  - #fill(), #object() and #rune() rejects with error type.
```

v2.0.0 : 5/14/18, 3:13 PM
```text
  - Deprecated .getArray([start], stop[, step])
  - Deprecated .getObject([start], stop[, step])
  - Add support for Callback and Promises
  - Add Tests for Callback and Promises
  - Improve code documentation to aid easy contribution
  - Remove CHANGELOG.md, this section captures changes to this project
```

v1.0.0: 6/10/16, 11:55 AM
```text
  - Add Tests and Minor changes
  - Initial Release
```
