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
