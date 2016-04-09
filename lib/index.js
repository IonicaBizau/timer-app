"use strict";

const elmSelect = require("elm-select")
    , fillo = require("fillo")
    ;

module.exports = function onload () {
    let $timer = elmSelect(".timer")[0]
      , previous = 0
      , startDate = null
      , paused = true
      ;

    function diff() {
        return new Date() - startDate;
    }

    setInterval(function() {
        if (paused) { return; }
        var msCount = previous + diff()
          , s = msCount / 1000
          , m = Math.floor(s / 60)
          , sec = Math.floor(s - m * 60)
          ;

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
            let play = $c.classList.toggle("play");
            if (play) {
                pauseTimer();
            } else {
                playTimer();
            }
            $c.classList.toggle("pause");
        });
    });
};
