
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRandom() {
    var rx = (getRandomIntInclusive(0, 18) * 40) + 20;
    var ry = (getRandomIntInclusive(0, 18) * 40) + 20;

    console.log("rx = " + rx);
    console.log("ry = " + ry);
    var canvas = document.getElementById("plateau")
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 760, 760);
    draw();
    ctx.save();
    var rect = canvas.getBoundingClientRect();
    drawCoordinates(rx, ry, ctx);
    if (result == true) {
        setTimeout(function () {
            alert("Le joueur " + ((!player) ? "blanc" : "noir") + " a gagné !")
            $('#reset').click();
        }, 50)
    }

}

function makeRandomNb(nb) {
    var i = 1;

    function myLoop() {
        setTimeout(function () {
            makeRandom();
            i++;
            if (i < nb) {
                myLoop();
            }
        }, 0)
    }

    myLoop();
}