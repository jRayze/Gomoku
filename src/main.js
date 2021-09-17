
$( document ).ready(function() {
    createBoard();
});


var player = false;
var result = false;
var nbPionW = 0;
var nbPionB = 0;
var matrix = [];

for (var i = 0; i < 19; i++) {
    matrix[i] = new Array(19);
}

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
            $('#col'+y+'-'+(x + 1)+' .cercle, #col'+y+'-'+(x + 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            $('#col'+y+'-'+(x - 1)+' .cercle , #col'+y+'-'+(x - 2)+' .cercle').animate({
                opacity: '0',
            }, 'fast');
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
            $('#col'+(y + 1)+'-'+x+' .cercle, #col'+(y + 2)+'-'+x+' .cercle').animate({
                opacity: '0',
            }, 'slow');
            
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
            $('#col'+(y - 1)+'-'+x+' .cercle, #col'+(y - 2)+'-'+x+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            $('#col'+(y - 1)+'-'+(x + 1)+' .cercle, #col'+(y - 2)+'-'+(x + 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            $('#col'+(y + 1)+'-'+(x - 1)+' .cercle, #col'+(y + 2)+'-'+(x - 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            $('#col'+(y - 1)+'-'+(x - 1)+' .cercle, #col'+(y - 2)+'-'+(x - 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            $('#col'+(y + 1)+'-'+(x + 1)+' .cercle, #col'+(y + 2)+'-'+(x + 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
    if (y >= 0 && y < 19  && y >= 0 && y < 19) {
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
    return -1;
}

function checkArround(y, x, piece, direction) {
    console.log("etat du y= " +y)
    //direction = {vertical : 1, horizontal : 2, diagonale1 : 3, diagonale2: 4}
    if (checkType(y, x, piece) == 0) {
        return true;
    }
    if (direction != 1) {
         console.log("d 1");
        /* console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+"encore en bas il y a = "+matrix[y + 2][x])
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
       /* console.log("y = " + y + " x = " + x);
        console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])*/
        if (checkType(y, x + 1, piece) == 1 && ((checkType(y, x + 2, piece) == 2 && checkType(y, x - 1, piece) == 0) || (checkType(y, x + 2, piece) == 0 && checkType(y, x - 1, piece) == 2))) {
           // console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])
            console.log("ca return vrai 3");
            return true;
        }
        else if (checkType(y, x - 1, piece) == 1 && ((checkType(y, x - 2, piece) == 2 && checkType(y, x + 1, piece) == 0) || (checkType(y, x - 2, piece) == 0 && checkType(y, x + 1, piece) == 2))) {
         //   console.log("a gauche il y a = " + matrix[y][x - 1] + "encore à gauche il y a = " + matrix[y][x - 2] + " et à droite il y a = " + matrix[y][x + 1])
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
    console.log("etat du y ligne= " +y)
    let nbPiece = 0;
    let side1 = true;
    let side2 = true;
    if (direction == 1) {
        console.log("   test dir 1 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
            console.log("       test dir 1 - 2")
            if (y + cpt < 19) {                
                if (checkArround(y + cpt, x, piece, direction) == true && side1 == true) {
                    console.log("           test dir 1 - 3")
                    side1 = false;
                }
                else if (side1 == true) {
                    nbPiece++;
                }
            }
            if (y - cpt >= 0) {
                if (checkArround(y - cpt, x, piece, direction) == true && side2 == true) {
                    console.log("           test dir 1 - 4")
                    side2 = false;
                }
                else if (side2 == true) {
                    nbPiece++;
                }
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
            if (x + cpt < 19) {
                console.log(" ici c'est pas bon")
                if (checkArround(y, x + cpt, piece, direction) == true && side1 == true) {
                    console.log("test dir 2 - 3")
                    side1 = false;
                }
                else if (side1 == true) {
                    nbPiece++;
                }
            }
            if (x - cpt >= 0 ) {
                console.log(" ici c'est bon")
                if (checkArround(y, x - cpt, piece, direction) == true && side2 == true) {
                    console.log("test dir 2 - 4")
                    side2 = false;
                }
                else if (side2 == true) {
                    nbPiece++;
                }
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
            if (y - cpt >= 0 && x + cpt < 19) {
                if (checkArround(y - cpt, x + cpt, piece, direction) == true && side1 == true) {
                    side1 = false;
                }
                else if (side1 == true) {
                    nbPiece++;
                }
            }
            if (y + cpt < 19 && x - cpt >= 0) {
                if (checkArround(y + cpt, x - cpt, piece, direction) == true && side2 == true) {
                    side2 = false;
                }
                else if (side2 == true) {
                    nbPiece++;
                }
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


function topCheck(x, y, type) {

}

function topLeftCheck() {
    
}
function topRightCheck() {
    
}

function botCheck() {

}
function botLeftCheck() {
    
}
function botRightCheck() {
    
}

function leftCheck() {

}

function rightCheck() {

}



function checkDoubleFreeThreeDirection(y, x, piece, dir, type) {
    
}

function checkPiece(y, x, piece) {
    if (y >= 0 && y <= 18 && x >= 0 && x <= 18) {
        if (matrix[y][x] == piece) {
            return 1;
        } else if (matrix[y][x] == '' || matrix[y][x] == null) {
            return 0
        } else {
            return -1
        }
    }
    return -1;
}

function checkDoubleFreeThree(y, x, piece) {

    let state = new Array();

    let tab = { top : 0, bot : 0, left : 0, right : 0, topLeft : 0, topRight : 0, botLeft : 0, botRight : 0 }

    var doubleFree = 0;
    var total = 0;
    let type = -1; // 0 = ooo - ooo / 1 = ooo - oo o / 2 =oo o - oo o

    
    for (let cpt = 1; cpt <= 4; cpt++ ) {
        // check toutes les directions 
        tab.left += checkPiece(y, x - cpt, piece);
        tab.right += checkPiece(y, x + cpt, piece);
        tab.top += checkPiece(y - cpt, x, piece);
        tab.bot += checkPiece(y + cpt, x, piece);
        tab.topLeft += checkPiece(y - cpt, x - cpt, piece);
        tab.topRight += checkPiece(y - cpt, x + cpt, piece);
        tab.botLeft += checkPiece(y + cpt, x - cpt, piece);
        tab.botRight += checkPiece(y + cpt, x + cpt, piece);

       if (cpt <= 2 ) {
            if (cpt == 2 && ((tab.left + tab.right) == 4 || (tab.top + tab.bot) == 4 
                || (tab.topLeft + tab.botRight) == 4 || (tab.topRight + tab.botLeft) == 4)) {
                console.log("3 libres impossible");
                state[cpt - 1] = Object.assign({}, tab);
                break;
            }
            if (cpt == 2 && (tab.left + tab.right) == 2 && (state[0].left + state[0].right) == 2)
                doubleFree++;
            if (cpt == 2 && (tab.top + tab.bot) == 2 && (state[0].top + state[0].bot) == 2)
                doubleFree++;
            if (cpt == 2 && (tab.topLeft + tab.botRight) == 2 && (state[0].topLeft + state[0].botRight) == 2)
                doubleFree++;
            if (cpt == 2 && (tab.topRight + tab.botLeft) == 2 && (state[0].topRight + state[0].botLeft) == 2)
                doubleFree++;

            if (cpt == 2 && ((tab.left + tab.right) == 3 || (tab.top + tab.bot) == 3 
                || (tab.topLeft + tab.botRight) == 3 || (tab.topRight + tab.botLeft) == 3)) {
                console.log("here ?")
                if ((tab.left == 1 && tab.right == 2 && (checkPiece(y, x - 1, piece) == 1)) 
                    || (tab.left == 2 && tab.right == 1 && (checkPiece(y, x + 1, piece) == 1))) {
                    console.log("3 libres impossible");
                    state[cpt - 1] = Object.assign({}, tab);
                    break;
                }
                if ((tab.top == 1 && tab.bot == 2 && (checkPiece(y - 1, x, piece) == 1)) 
                    || (tab.top == 2 && tab.bot == 1 && (checkPiece(y + 1, x, piece) == 1))) {
                    console.log("3 libres impossible");
                    state[cpt - 1] = Object.assign({}, tab);                     
                    break;
                }
                if ((tab.topLeft == 1 && tab.botRight == 2 && (checkPiece(y - 1, x - 1, piece) == 1)) 
                    || (tab.topLeft == 2 && tab.botRight == 1 && (checkPiece(y + 1, x + 1, piece) == 1))) {
                    console.log("3 libres impossible");
                    state[cpt - 1] = Object.assign({}, tab);
                    break;
                }
                if ((tab.topRight == 1 && tab.botLeft == 2 && (checkPiece(y - 1, x + 1, piece) == 1)) 
                    || (tab.topRight == 2 && tab.botLeft == 1 && (checkPiece(y + 1, x - 1, piece) == 1))) {
                    console.log("3 libres impossible");
                    state[cpt - 1] = Object.assign({}, tab);
                    break;
                }
            }
            console.log("3 libres possible");
        }
        if (cpt > 2) {
           /* if (((tab.left + tab.right) >= 5 || (tab.top + tab.bot) >= 5
                || (tab.topLeft + tab.botRight) >= 5 || (tab.topRight + tab.botLeft) >= 5)) {
                let cpt = 0;
                cpt += (tab.left + tab.right) >= 5 ? 0 : 1;
                console.log('trop de piece sur une meme ligne on peut pas faire de double 3')
                break;
            }*/
            if (cpt == 3 && ((tab.left + tab.right) <= 1 && (tab.top + tab.bot) <= 1
                && (tab.topLeft + tab.botRight) <= 1 && (tab.topRight + tab.botLeft) <= 1)) {
                console.log("3 libres impossible");
                state[cpt - 1] = Object.assign({}, tab);
                break;
            }
            if (cpt == 3 && ((tab.left + tab.right) == 2 || (tab.top + tab.bot) == 2
                || (tab.topLeft + tab.botRight) == 2 || (tab.topRight + tab.botLeft) == 2)) {
                console.log("test1");
                if (cpt == 3 && (tab.left + tab.right) == 2 && (state[1].left == tab.left && state[1].right == tab.right) 
                    && (state[0].left + state[0].right) == 1)
                    doubleFree++;
                if (cpt == 3 && (tab.top + tab.bot) == 2 && (state[1].top == tab.top && state[1].bot == tab.bot) 
                    && (state[0].top + state[0].bot) == 1)
                    doubleFree++;
                if (cpt == 3 && (tab.topLeft + tab.botRight) == 2 
                    && (state[1].topLeft == tab.topLeft && state[1].botRight == tab.botRight) 
                        && (state[0].topLeft + state[0].botRight) == 1)
                    doubleFree++;
                if (cpt == 3 && (tab.topRight + tab.botLeft) == 2 
                    && (state[1].topRight == tab.topRight && state[1].botLeft == tab.botLeft)
                        && (state[0].topRight + state[0].botLeft) == 1)
                    doubleFree++;
            }
            if (cpt == 4 && ((tab.left + tab.right) == 2 || (tab.top + tab.bot) == 2 
                || (tab.topLeft + tab.botRight) == 2 || (tab.topRight + tab.botLeft) == 2)) {
                console.log('test 3 3');
                if (cpt == 4 && (tab.left + tab.right) == 2 && (state[2].left == tab.left && state[2].right == tab.right) 
                    && (state[1].left + state[1].right) == 1)
                    doubleFree++;
                if (cpt == 4 && (tab.top + tab.bot) == 2 && (state[2].top == tab.top && state[2].bot == tab.bot) 
                    && (state[1].top + state[1].bot) == 1)
                    doubleFree++;
                if (cpt == 4 && (tab.topLeft + tab.botRight) == 2 
                    && (state[2].topLeft == tab.topLeft && state[2].botRight == tab.botRight) 
                        && (state[1].topLeft + state[1].botRight) == 1)
                    doubleFree++;
                if (cpt == 4 && (tab.topRight + tab.botLeft) == 2 
                    && (state[2].topRight == tab.topRight && state[2].botLeft == tab.botLeft)
                        && (state[1].topRight + state[1].botLeft) == 1)
                    doubleFree++;
                    //alert('double free');0
            }
        }
        state[cpt - 1] = Object.assign({}, tab);
        console.log("doubleFree = "+doubleFree)
        console.log(tab);
        total = tab.left + tab.right + tab.top + tab.topRight + tab.topLeft + tab.bot + tab.botLeft + tab.botRight;
        console.log("total = "+total);
        if (doubleFree != 0 && doubleFree % 2 == 0) {
            console.log('doubleFree')
            return true;
        }
    }
    console.log(state);
    return false;
}


// *********** DRAW ************ //

function printMatrice() {
    for (y = 0; y < matrix.length; y++) {
        console.log(matrix[y]);
    }
}


// MOVE GENERATOR

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRandom() {
    var x = getRandomIntInclusive(0, 18);
    var y = getRandomIntInclusive(0, 18);

    getPosition(x, y);
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


function drawMatrice(y, x, piece) {
    var color = piece == 'B' ? 'black' : 'white';
    console.log('draw ?');
    $('#col'+y+'-'+x+' .cercle').css('background-color', color).css('position', 'relative')
        .css('opacity', '1').css('width', '40px').css('height', '40px')
            .css('border-radius', '30px').css('margin-top', '-40px').css('margin-left', '-20px')

    $('#col'+y+'-'+x+' .cercle').animate({
        width: '26px',
        height: '26px',
        borderRadius: '20px',
        marginTop: '-33px',
        marginLeft: '-13px'
    }, 'fast');
    
   // .css('background-color', color).css('opacity', '1').css('position', 'relative');
}

function drawCoordinates(y, x) {
    var piece = (player) ? "W" : "B";
    console.log("x = " + x + " y= " + y);


    if (matrix[y][x] == null) {
        if (checkDoubleFreeThree(y, x, piece)) {
            $('#zone').append('<div class="alert alert-success" role="alert">Double 3 libres : Coup interdit !</div>');
            setTimeout(function() {
                $('.alert').remove();
            }, 3000);
            return false;
        }
        matrix[y][x] = piece;
        console.log(matrix);
        capture(y, x, piece);
        drawMatrice(y, x, piece);
        result = checkWin(y, x, piece); //test();
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

function getPosition(x , y) {
    console.log(x, y);
    drawCoordinates(x, y);
    if (result == true) {
        setTimeout(function () {
            alert("Le joueur " + ((!player) ? "blanc" : "noir") + " a gagné !")
            $('#reset').click();
        }, 50)
    }
}

function reset() {
    newMatrix = []
    for (var i = 0; i < 19; i++) {
        newMatrix[i] = new Array(19);
    }
    matrix = newMatrix;
    nbPionW = 0;
    nbPionB = 0;
    player = false;
    $('#black').addClass("isSelected");
    $('#white').removeClass('isSelected');
    $('#white').css('animation', '');
    $('.nbPieceB').html(nbPionB);
    $('.nbPairesB').html(nbPionB);
    $('.nbPieceW').html(nbPionW);
    $('.nbPairesW').html(nbPionW);
    createBoard()
}



function createBoard() {
    $('#zone').html('<table id="board"></table>')
    for (var y = 0; y < 19; y++ ) {
        $('#board').append('<tr id="line'+y+'">')
        for (var x = 0; x < 19; x++ ) {
            $('#line'+y).append('<td id="col'+y+'-'+x+'"><div onClick="getPosition('+y+','+x+')" class="cercle"></div></td>')
        }
    }
    $('td .cercle').css('opacity', '0');
}

/// x = vers droite 

/// y = vers bas 