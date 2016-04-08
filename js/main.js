(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const elmSelect = require("elm-select")
    , fillo = require("fillo")
    ;

onload = function () {
    var $timer = elmSelect(".timer")[0];

    var previous = 0;
    var startDate = null;
    var paused = true;

    function diff() {
        return new Date() - startDate;
    }

    setInterval(function() {
        if (paused) { return; }
        var msCount = previous + diff();
        var s = msCount / 1000;
        var m = Math.floor(s / 60);
        var sec = Math.floor(s - m * 60);
        document.title = $timer.textContent = fillo(m) + ":" + fillo(sec);
    }, 1000);

    function playTimer() {
        paused = false;
        startDate = new Date();
    }

    function pauseTimer() {
        paused = true;
        previous += diff();
    }

    elmSelect(".btn.play-pause", function ($c) {
        $c.addEventListener("click",  function () {
            var play = $c.classList.toggle("play");
            if (play) {
                pauseTimer();
            } else {
                playTimer();
            }
            $c.classList.toggle("pause");
        });
    });
};

},{"elm-select":2,"fillo":3}],2:[function(require,module,exports){
// Dependencies
var Typpy = require("typpy");

/**
 * ElmSelect
 * Select DOM elements and optionally call a function.
 *
 * @name ElmSelect
 * @function
 * @param {String|Element|NodeList} elm A stringified query selector, an element or a node list.
 * @param {Function} fn If this function is provided, it will be called with the current element and additional arguments passed in `args`.
 * @param {Array} args An array of arguments used in the `fn` function call (default: `[]`).
 * @param {String|Element} parent The parent element where to search the elements (default: `document`). This makes sense only when a query selector is used.
 * @return {NodeList} A node list containing the selected elements.
 */
function ElmSelect(elm, fn, args, parent) {
    var i = 0
      , _args = null
      ;

    // Handle the query selectors
    if (typeof elm === "string") {
        if (parent) {
            parent = ElmSelect(parent);
        } else {
            parent = document;
        }
        elm = parent.querySelectorAll(elm);
    }

    // Check if the input is a nodelist
    if (!Typpy(elm, NodeList) && !Typpy(elm, HTMLCollection)) {
        elm = [elm];
    }

    // Handle the function call
    if (typeof fn === "function") {
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (; i < elm.length; ++i) {
            _args = [elm[i]].concat(args);
            fn.apply(this, _args);
        }
    }

    return elm;
}

module.exports = ElmSelect;

},{"typpy":4}],3:[function(require,module,exports){
/**
 * fillo
 * Fill additional characters at the beginning of the string.
 *
 * @name fillo
 * @function
 * @param {String|Number} what The input snippet (number, string or anything that can be stringified).
 * @param {Number} size The width of the final string (default: `2`).
 * @param {String} ch The character to repeat (default: `"0"`).
 * @return {String} The input value with filled characters.
 */
module.exports = function fillo (what, size, ch) {
    size = size || 2;
    ch = ch || "0";
    what = what.toString();
    return ch.repeat(size - what.length) + what;
};

},{}],4:[function(require,module,exports){
/**
 * Typpy
 * Gets the type of the input value or compares it
 * with a provided type.
 *
 * Usage:
 *
 * ```js
 * Typpy({}) // => "object"
 * Typpy(42, Number); // => true
 * Typpy.get([], "array"); => true
 * ```
 *
 * @name Typpy
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {String|Boolean} It returns `true` if the
 * input has the provided type `target` (if was provided),
 * `false` if the input type does *not* have the provided type
 * `target` or the stringified type of the input (always lowercase).
 */
function Typpy(input, target) {
    if (arguments.length === 2) {
        return Typpy.is(input, target);
    }
    return Typpy.get(input, true);
}

/**
 * Typpy.is
 * Checks if the input value has a specified type.
 *
 * @name Typpy.is
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {Boolean} `true`, if the input has the same
 * type with the target or `false` otherwise.
 */
Typpy.is = function (input, target) {
    return Typpy.get(input, typeof target === "string") === target;
};

/**
 * Typpy.get
 * Gets the type of the input value. This is used internally.
 *
 * @name Typpy.get
 * @function
 * @param {Anything} input The input value.
 * @param {Boolean} str A flag to indicate if the return value
 * should be a string or not.
 * @return {Constructor|String} The input value constructor
 * (if any) or the stringified type (always lowercase).
 */
Typpy.get = function (input, str) {

    if (typeof input === "string") {
        return str ? "string" : String;
    }

    if (null === input) {
        return str ? "null" : null;
    }

    if (undefined === input) {
        return str ? "undefined" : undefined;
    }

    if (input !== input) {
        return str ? "nan" : NaN;
    }

    return str ? input.constructor.name.toLowerCase() : input.constructor;
};

module.exports = Typpy;

},{}]},{},[1]);
