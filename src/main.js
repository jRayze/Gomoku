

var player = true;
var result = false;
var nbPionW = 0;
var nbPionB = 0;
var matrix = [];

for (var i = 0; i < 19; i++) {
    matrix[i] = new Array(19);
}

/*    function test () {
    let ligne = 0;
    let retour = 0;
    for ( ;ligne <= 18; ligne++) {
        for( let colone = 0 ; colone <= 18; colone++) {
            if (matrix[ligne][colone] != undefined && matrix[ligne][colone] == "B" || matrix[ligne][colone] == "W") {
               retour = checkWin(ligne, colone, matrix[ligne][colone])
               if (retour == true) {
                   return retour;
               }
            }
        }
    }
}*/

// *********** CAPTURE ************ //

function capture(y, x, piece) {
    let isOk = false;
    let counter = (piece == "B") ? "W" : "B";
    let nbCxp = 0;
    let nbCxm = 0;
    let nbCyp = 0;
    let nbCym = 0;
    let nbCD1p = 0;
    let nbCD1m = 0;
    let nbCD2p = 0;
    let nbCD2m = 0;
    console.log("----------- capture --------------");
    //x+
    for (let mv = 1; mv <= 3; mv++) {
        if ((x + mv) <= 18 && matrix[y][x + mv]) {
            if (mv < 3) {
                if (matrix[y][x + mv] == counter) {
                    //  console.log("matrix[y][x + mv] = "+matrix[y][x + mv])
                    nbCxp++;
                }
            }
            else if (mv == 3 && matrix[y][x + mv] == piece) {
                //console.log("mv == 3 && matrix[y][x + mv] = "+matrix[y][x + mv])
                isOk = true;
                //console.log(isOk)      
            }
        }
    }
    if (isOk == true) {
        if (nbCxp == 2) {
            matrix[y][x + 1] = null;
            matrix[y][x + 2] = null;
            console.log("delete x+");
        }
        isOk = false;
    }
    else {
        nbCxp = 0;
    }
    //x-
    for (let mv = 1; mv <= 3; mv++) {
        if ((x - mv) >= 0 && matrix[y][x - mv]) {
            if (mv < 3) {
                if (matrix[y][x - mv] == counter) {
                    nbCxm++;
                }
            }
            else if (mv == 3 && matrix[y][x - mv] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCxm == 2) {
            matrix[y][x - 1] = null;
            matrix[y][x - 2] = null;
            console.log("delete x-");
        }
        isOk = false;
    }
    else {
        nbCxm = 0;
    }

    //y+
    for (let mv = 1; mv <= 3; mv++) {
        if ((y + mv) <= 18 && matrix[y + mv][x]) {
            if (mv < 3) {
                if (matrix[y + mv][x] == counter) {
                    nbCyp++;
                }
            }
            else if (mv == 3 && matrix[y + mv][x] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCyp == 2) {
            matrix[y + 1][x] = null;
            matrix[y + 2][x] = null;
            console.log("delete y+");
        }
        isOk = false;
    }
    else {
        nbCyp = 0;
    }


    //y-
    for (let mv = 1; mv <= 3; mv++) {
        if ((y - mv) >= 0 && matrix[y - mv][x]) {
            if (mv < 3) {
                if (matrix[y - mv][x] == counter) {
                    nbCym++;
                }
            }
            else if (mv == 3 && matrix[y - mv][x] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCym == 2) {
            matrix[y - 1][x] = null;
            matrix[y - 2][x] = null;
            console.log("delete y-");
        }
        isOk = false;
    }
    else {
        nbCym = 0;
    }

    // -+
    for (let mv = 1; mv <= 3; mv++) {
        if ((y - mv) >= 0 && (x + mv) <= 18 && matrix[y - mv][x + mv]) {
            if (mv < 3) {
                if (matrix[y - mv][x + mv] == counter) {
                    nbCD1p++;
                }
            }
            else if (mv == 3 && matrix[y - mv][x + mv] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCD1p == 2) {
            matrix[y - 1][x + 1] = null;
            matrix[y - 2][x + 2] = null;
            console.log("delete -+");
        }
        isOk = false;
    }
    else {
        nbCD1p = 0;
    }

    //+-
    for (let mv = 1; mv <= 3; mv++) {
        if ((y + mv) <= 18 && (x - mv) >= 0 && matrix[y + mv][x - mv]) {
            if (mv < 3) {
                if (matrix[y + mv][x - mv] == counter) {
                    nbCD1m++;
                }
            }
            else if (mv == 3 && matrix[y + mv][x - mv] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCD1m == 2) {
            matrix[y + 1][x - 1] = null;
            matrix[y + 2][x - 2] = null;
            console.log("delete +-");
        }
        isOk = false;
    }
    else {
        nbCD1m = 0;
    }
    // --
    for (let mv = 1; mv <= 3; mv++) {
        if ((y - mv) >= 0 && (x - mv) >= 0 && matrix[y - mv][x - mv]) {
            if (mv < 3) {
                if (matrix[y - mv][x - mv] == counter) {
                    nbCD2p++;
                }
            }
            else if (mv == 3 && matrix[y - mv][x - mv] == piece) {
                isOk = true;
            }
        }

    }

    if (isOk == true) {
        if (nbCD2p == 2) {
            matrix[y - 1][x - 1] = null;
            matrix[y - 2][x - 2] = null;
            console.log("delete --");
        }
        isOk = false;
    }
    else {
        nbCD2p = 0;
    }

    //++
    for (let mv = 1; mv <= 3; mv++) {
        if ((y + mv) <= 18 && (x + mv) <= 18 && matrix[y + mv][x + mv]) {
            if (mv < 3) {
                if (matrix[y + mv][x + mv] == counter) {
                    nbCD2m++;
                }
            }
            else if (mv == 3 && matrix[y + mv][x + mv] == piece) {
                isOk = true;
            }
        }

    }
    if (isOk == true) {
        if (nbCD2m == 2) {
            matrix[y + 1][x + 1] = null;
            matrix[y + 2][x + 2] = null;
            console.log("delete ++");
        }
        isOk = false;
    }
    else {
        nbCD2m = 0;
    }
    // console.log("captureLigne = "+nbCxp+" CaptureColone = "+nbCy+" CaptureDiag1 = "+nbCD1+" CaptureDiag2 = "+nbCD2)
    console.log("----------- fin capture --------------");
    if (nbCxp == 2 || nbCxm == 2 || nbCyp == 2 || nbCym == 2 || nbCD1p == 2 || nbCD1m == 2 || nbCD2p == 2 || nbCD2m == 2) {
        if (piece == "W") {
            nbPionB += 2;
            $('.nbPieceB').html(nbPionB);
            $('.nbPairesB').html(nbPionB / 2);
        }
        if (piece == "B") {
            console.log("nbPionW = " + nbPionW)
            nbPionW += 2;
            console.log("nbPionW = " + nbPionW)
            $('.nbPieceW').html(nbPionW);
            $('.nbPairesW').html(nbPionW / 2);
        }
        console.log("capture");
        return true;
    }
}


// *********** PARSER ************ //

function checkType(y, x, piece) {
    if (matrix == undefined || matrix[y] == undefined || matrix[y][x] == undefined) {
        return -1;
    }
    if (matrix[y][x] && matrix[y][x] == piece) {
        return 1;
    }
    else if (matrix[y][x] && matrix[y][x] == "" || matrix[y][x] == undefined) {
        return 0;
    }
    else {
        return 2;
    }
}

function checkArround(y, x, piece, direction) {
    //direction = {vertical : 1, horizontal : 2, diagonale1 : 3, diagonale2: 4}
    if (checkType(y, x, piece) == 0) {
        return true;
    }
    if (direction != 1) {
        /* console.log("d 1");
         console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+"encore en bas il y a = "+matrix[y + 2][x])
         console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+" en h + 2 il y a = "+matrix[y - 2][x])*/
        if (checkType(y + 1, x, piece) == 1 && ((checkType(y + 2, x, piece) == 2 && checkType(y - 1, x, piece) == 0) || (checkType(y + 2, x, piece) == 0 && checkType(y - 1, x, piece) == 2))) {
            console.log("ca return vrai 1");
            return true;
        }
        else if (checkType(y - 1, x, piece) == 1 && ((checkType(y - 2, x, piece) == 2 && checkType(y + 1, x, piece) == 0) || (checkType(y - 2, x, piece) == 0 && checkType(y + 1, x, piece) == 2))) {
            console.log("ca return vrai 2");
            return true;
        }
    }
    if (direction != 2) {
        console.log("d 2");
        console.log("y = " + y + " x = " + x);
        console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])
        if (checkType(y, x + 1, piece) == 1 && ((checkType(y, x + 2, piece) == 2 && checkType(y, x - 1, piece) == 0) || (checkType(y, x + 2, piece) == 0 && checkType(y, x - 1, piece) == 2))) {
            console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])
            console.log("ca return vrai 3");
            return true;
        }
        else if (checkType(y, x - 1, piece) == 1 && ((checkType(y, x - 2, piece) == 2 && checkType(y, x + 1, piece) == 0) || (checkType(y, x - 2, piece) == 0 && checkType(y, x + 1, piece) == 2))) {
            console.log("a gauche il y a = " + matrix[y][x - 1] + "encore à gauche il y a = " + matrix[y][x - 2] + " et à droite il y a = " + matrix[y][x + 1])
            console.log("ca return vrai 4");
            return true;
        }
    }
    if (direction != 3) {
        console.log("d 3");
        if (checkType(y - 1, x + 1, piece) == 1 && ((checkType(y - 2, x + 2, piece) == 2 && checkType(y + 1, x - 1, piece) == 0) || (checkType(y - 2, x + 2, piece) == 0 && checkType(y + 1, x - 1, piece) == 2))) {
            console.log("ca return vrai 5");
            return true;
        }
        else if (checkType(y + 1, x - 1, piece) == 1 && ((checkType(y + 2, x - 2, piece) == 2 && checkType(y - 1, x + 1, piece) == 0) || (checkType(y + 2, x - 2, piece) == 0 && checkType(y - 1, x + 1, piece) == 2))) {
            console.log("ca return vrai 6");
            return true;
        }
    }
    if (direction != 4) {
        console.log("d 4");
        //  console.log("en h-gauche il y a = "+matrix[y - 1][x - 1]+" en b-droite il y a = "+matrix[y + 1][x + 1]+"encore en b-droite il y a = "+matrix[y - 2][ x - 2])
        if (checkType(y - 1, x - 1, piece) == 1 && ((checkType(y - 2, x - 2, piece) == 2 && checkType(y + 1, x + 1, piece) == 0) || (checkType(y - 2, x - 2, piece) == 0 && checkType(y + 1, x + 1, piece) == 2))) {
            console.log("ca return vrai 7");
            return true;
        }
        else if (checkType(y + 1, x + 1, piece) == 1 && ((checkType(y + 2, x + 2, piece) == 2 && checkType(y - 1, x - 1, piece) == 0) || (checkType(y + 2, x + 2, piece) == 0 && checkType(y - 1, x - 1, piece) == 2))) {
            console.log("ca return vrai 8");
            return true;
        }
    }
    return false;
}

function checkLigne(y, x, piece, direction) {
    let nbPiece = 0;
    let side1 = true;
    let side2 = true;
    if (direction == 1) {
        console.log("test dir 1 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
            console.log("test dir 1 - 2")
            if (checkArround(y + cpt, x, piece, direction) == true && side1 == true) {
                console.log("test dir 1 - 3")
                side1 = false;
            }
            else if (side1 == true) {
                nbPiece++;
            }
            if (checkArround(y - cpt, x, piece, direction) == true && side2 == true) {
                console.log("test dir 1 - 4")
                side2 = false;
            }
            else if (side2 == true) {
                nbPiece++;
            }
            console.log("nbPieces = " + nbPiece);
            if (side1 == false && side2 == false) {
                if (nbPiece >= 4) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if (cpt == 4 && nbPiece >= 4) {
                console.log("test");
                return false;
            }
        }
    }
    if (direction == 2) {
        console.log("test dir 2 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
            console.log("test dir 2 - 2")
            if (checkArround(y, x + cpt, piece, direction) == true && side1 == true) {
                console.log("test dir 2 - 3")
                side1 = false;
            }
            else if (side1 == true) {
                nbPiece++;
            }
            if (checkArround(y, x - cpt, piece, direction) == true && side2 == true) {
                console.log("test dir 2 - 4")
                side2 = false;
            }
            else if (side2 == true) {
                nbPiece++;
            }
            if (side1 == false && side2 == false) {
                if (nbPiece >= 4) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if (cpt == 4 && nbPiece >= 4) {
                return false;
            }
        }
    }
    if (direction == 3) {
        for (let cpt = 1; cpt < 5; cpt++) {
            if (checkArround(y - cpt, x + cpt, piece, direction) == true && side1 == true) {
                side1 = false;
            }
            else if (side1 == true) {
                nbPiece++;
            }
            if (checkArround(y + cpt, x - cpt, piece, direction) == true && side2 == true) {
                side2 = false;
            }
            else if (side2 == true) {
                nbPiece++;
            }
            if (side1 == false && side2 == false) {
                if (nbPiece >= 4) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if (cpt == 4 && nbPiece >= 4) {
                return false;
            }
        }
    }
    if (direction == 4) {
        console.log("test dir 4 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
            console.log("test dir 4 - 2")
            if (checkArround(y + cpt, x + cpt, piece, direction) == true && side1 == true) {
                console.log("test dir 4 - 3")
                side1 = false;
            }
            else if (side1 == true) {
                nbPiece++;
            }
            if (checkArround(y - cpt, x - cpt, piece, direction) == true && side2 == true) {
                console.log("test dir 4 - 4")
                side2 = false;
            }
            else if (side2 == true) {
                nbPiece++;
            }
            if (side1 == false && side2 == false) {
                if (nbPiece >= 4) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if (cpt == 4 && nbPiece >= 4) {
                return false;
            }
        }
    }
}

function checkWin(y, x, piece) {
    var nbBx = 0;
    var nbBy = 0;
    var nbBD1 = 0;
    var nbBD2 = 0;
    var ret = -1;
    console.log("checkWin");
    //x 
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y][x + mv] && matrix[y][x + mv] == piece) {
            nbBx++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y][x - mv] && matrix[y][x - mv] == piece) {
            nbBx++;
        }
        else
            break;
    }

    //y
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y + mv] && matrix[y + mv][x] && matrix[y + mv][x] == piece) {
            nbBy++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y - mv] && matrix[y - mv][x] && matrix[y - mv][x] == piece) {
            nbBy++;
        }
        else
            break;
    }

    //-+ +-
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y - mv] && matrix[y - mv][x + mv] && matrix[y - mv][x + mv] == piece) {
            console.log("matrix[y - mv ][x + mv] = [" + (y - mv) + "][" + (x + mv) + "]");
            nbBD1++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y + mv] && matrix[y + mv][x - mv] && matrix[y + mv][x - mv] == piece) {
            console.log("matrix[y + mv ][x - mv] = [" + (y + mv) + "][" + (x - mv) + "]");
            nbBD1++;
        }
        else
            break;
    }

    //++ --
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y - mv] && matrix[y - mv][x - mv] && matrix[y - mv][x - mv] == piece) {
            console.log("matrix[y - mv ][x - mv] = [" + (y - mv) + "][" + (x - mv) + "]");
            nbBD2++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y + mv] && matrix[y + mv][x + mv] && matrix[y + mv][x + mv] == piece) {
            console.log("matrix[y + mv ][x + mv] = [" + (y + mv) + "][" + (x + mv) + "]");
            nbBD2++;
        }
        else
            break;
    }
    console.log("nbBx = " + nbBx + " nbBy = " + nbBy + " nbBD1 = " + nbBD1 + " nbBD2 = " + nbBD2)
    /* if (nbPionB == 10 || nbPionW == 10) {
         console.log("10 captures effectuées");
         return true;
     }*/
    if (nbBx >= 4 || nbBy >= 4 || nbBD1 >= 4 || nbBD2 >= 4) {
        if (nbBy >= 4) {
            ret = checkLigne(y, x, piece, 1)
            console.log("nbBy = " + ret)
        }
        if (nbBx >= 4) {
            ret = checkLigne(y, x, piece, 2)
            console.log("nbBx 2= " + ret)
        }
        if (nbBD1 >= 4) {
            ret = checkLigne(y, x, piece, 3)
            console.log("nbBD1 = " + ret)
        }
        if (nbBD2 >= 4) {
            ret = checkLigne(y, x, piece, 4)
            console.log("nbBD2 = " + ret)
        }
        if (ret != true) {
            console.log("ligne compelete");
            return true;
        }
    }
}

// *********** DRAW ************ //

function printMatrice() {
    for (y = 0; y < matrix.length; y++) {
        console.log(matrix[y]);
    }
}

function draw() {
    var canvas = document.getElementById('plateau');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var x = 0;
        var y = 0;
        for (; x < 18; x++) {
            y = 0;
            ctx.strokeRect((y * 40) + 20, (x * 40) + 20, 40, 40);
            for (; y < 18; y++) {
                ctx.strokeRect((y * 40) + 20, (x * 40) + 20, 40, 40);
            }
        }
    }
}

function drawMatrice(ctx) {
    for (y = 0; y <= 18; y++) {
        for (x = 0; x <= 18; x++) {
            if (matrix[y][x] == "B" || matrix[y][x] == "W") {
                ctx.beginPath(); //Start path
                ctx.fillStyle = (matrix[y][x] == "W") ? "#ffffff" : "#000000";
                var cercle = new Path2D();
                cercle.moveTo((x * 40) + 20, (y * 40) + 20);
                cercle.arc((x * 40) + 20, (y * 40) + 20, 10, 0, 2 * Math.PI);
                ctx.fill(cercle);
            }
        }
    }
}

function drawCoordinates(x, y, ctx) {
    var piece = (player) ? "W" : "B";
    x = x - 20;
    y = y - 20;
    console.log("x = " + x + " y= " + y);

    if ((x % 40 <= 15 || x % 40 >= 25) && (y % 40 <= 15 || y % 40 >= 25)) {
        var xFake = x - ((x % 40 <= 15) ? x % 40 : x % 40 - 40);
        var yFake = y - ((y % 40 <= 15) ? y % 40 : y % 40 - 40);
        if (matrix[(yFake / 40)][(xFake / 40)] == null) {
            matrix[(yFake / 40)][(xFake / 40)] = piece;
            console.log(matrix);
            capture(yFake / 40, xFake / 40, piece);
            drawMatrice(ctx);
            result = checkWin(yFake / 40, xFake / 40, piece); //test();
            player = !player;

            if (player) {
                $('#white').addClass("isSelected");
                $('#black').removeClass('isSelected');
                $('#black').css('animation', '');
            } else {
                $('#black').addClass("isSelected");
                $('#white').removeClass('isSelected');
                $('#white').css('animation', '');
            }
            $('.isSelected').css('animation', 'isSelected 2s ease-out infinite');
            return true;
        }
    }
    drawMatrice(ctx);
}

// MOVE GENERATOR

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


// GET POSITION

function getPosition(event) {
    console.log(event);
    var canvas = document.getElementById("plateau")
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 760, 760);
    draw();
    ctx.save();
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    console.log("x = " + x + " y= " + y);
    // This method will handle the coordinates and will draw them in the canvas.
    drawCoordinates(x, y, ctx);
    if (result == true) {
        setTimeout(function () {
            alert("Le joueur " + ((!player) ? "blanc" : "noir") + " a gagné !")
            $('#reset').click();
        }, 50)
    }
    //printMatrice();
}

function reset() {
    document.location.reload();
}
