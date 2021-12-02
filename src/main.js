
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
    matrix[i].fill(0, 0, 19)
}

let tabPiecesPosee = []
let emptyObj = {
    value : 0,
  //  align : [0, 0 ,0, 0], // nb piece dans l'alignement [x+, y+, (x+ y+), (y+ x-)]
    isCapturable : false,
}

for (var i = 0; i < 19; i++) {
    tabPiecesPosee[i] = new Array(19);
    tabPiecesPosee[i].fill(emptyObj, 0, 19);
}

let coupsJouee = [];

function coefMenaceFailbe(n){
    //let a = new Array(2 * (n - 3) + 1).fill(0)
    let a = {
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0,
        5 : 0,
    }
    let taille = 5;
    let pas = 10 / taille;
    let tmp = pas;
    let i = 1;
    a[i] = tmp;
    if (n == 3) {
        return a;
    }
    else {
        while (i < taille) {
            tmp = tmp + pas;
            if (i + 2 <= taille)
                a[i + 2] = tmp;
            tmp = tmp + pas;
            a[i + 1] = tmp;
            i++;
        }
        return a;
    }
}

let a = coefMenaceFailbe(5);

// *********** CAPTURE ************ //

function capture(y, x, piece) {
    let isOk = false;
    let counter = (piece == 2) ? 1 : 2;
    let nbCxp = 0;
    let nbCxm = 0;
    let nbCyp = 0;
    let nbCym = 0;
    let nbCD1p = 0;
    let nbCD1m = 0;
    let nbCD2p = 0;
    let nbCD2m = 0;
    //console.log("----------- capture --------------");
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
            matrix[y][x + 1] = 0;
            matrix[y][x + 2] = 0;
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
            matrix[y][x - 1] = 0;
            matrix[y][x - 2] = 0;
            $('#col'+y+'-'+(x - 1)+' .cercle , #col'+y+'-'+(x - 2)+' .cercle').animate({
                opacity: '0',
            }, 'slow');
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
            matrix[y + 1][x] = 0;
            matrix[y + 2][x] = 0;
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
            matrix[y - 1][x] = 0;
            matrix[y - 2][x] = 0;
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
            matrix[y - 1][x + 1] = 0;
            matrix[y - 2][x + 2] = 0;
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
            matrix[y + 1][x - 1] = 0;
            matrix[y + 2][x - 2] = 0;
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
            matrix[y - 1][x - 1] = 0;
            matrix[y - 2][x - 2] = 0;
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
            matrix[y + 1][x + 1] = 0;
            matrix[y + 2][x + 2] = 0;
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
 //   console.log("----------- fin capture --------------");
    if (nbCxp == 2 || nbCxm == 2 || nbCyp == 2 || nbCym == 2 || nbCD1p == 2 || nbCD1m == 2 || nbCD2p == 2 || nbCD2m == 2) {
        if (piece == 1) {
            nbPionB += 2;
            $('.nbPieceB').html(nbPionB);
            $('.nbPairesB').html(nbPionB / 2);
        }
        if (piece == 2) {
           // console.log("nbPionW = " + nbPionW)
            nbPionW += 2;
           // console.log("nbPionW = " + nbPionW)
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
        if (matrix[y][x] && matrix[y][x] == piece)
            return 1;
        else if (matrix[y][x] && matrix[y][x] == "0")
            return 0;
        else 
            return 2;
    }
   // console.log("retourne -1 ");
    return -1;
}

function checkArround(y, x, piece, direction) {
    if (checkType(y, x, piece) == 0) {
        return true;
    }
    if (direction != 1) {
        if (checkType(y + 1, x, piece) == 1 && ((checkType(y + 2, x, piece) == 2 && checkType(y - 1, x, piece) == 0) || (checkType(y + 2, x, piece) == 0 && checkType(y - 1, x, piece) == 2))) {
            return true;
        }
        else if (checkType(y - 1, x, piece) == 1  && ((checkType(y - 2, x, piece) == 2 && checkType(y + 1, x, piece) == 0) ||(checkType(y - 2, x, piece) == 0 && checkType(y + 1, x, piece) == 2))) {
            return true;
        }
    }
    if (direction != 2) {
        if (checkType(y, x + 1, piece) == 1 && ((checkType(y, x + 2, piece) == 2 && checkType(y, x - 1, piece) == 0) || (checkType(y, x + 2, piece) == 0 && checkType(y, x - 1, piece) == 2))) {
            return true;
        }
        else if (checkType(y, x - 1, piece) == 1 && ((checkType(y, x - 2, piece) == 2 && checkType(y, x + 1, piece) == 0) || (checkType(y, x - 2, piece) == 0 && checkType(y, x + 1, piece) == 2))) {
            return true;
        }
    }
    if (direction != 3) {
        if (checkType(y - 1, x + 1, piece) == 1 && ((checkType(y - 2, x + 2, piece) == 2 && checkType(y + 1, x - 1, piece) == 0) || (checkType(y - 2, x + 2, piece) == 0 && checkType(y + 1, x - 1, piece) == 2))) {
            return true;
        }
        else if (checkType(y + 1, x - 1, piece) == 1 && ((checkType(y + 2, x - 2, piece) == 2 && checkType(y - 1, x + 1, piece) == 0) || (checkType(y + 2, x - 2, piece) == 0 && checkType(y - 1, x + 1, piece) == 2))) {
            return true;
        }
    }
    if (direction != 4) {
        if (checkType(y - 1, x - 1, piece) == 1 && ((checkType(y - 2, x - 2, piece) == 2 && checkType(y + 1, x + 1, piece) == 0) || (checkType(y - 2, x - 2, piece) == 0 && checkType(y + 1, x + 1, piece) == 2))) {
            return true;
        }
        else if (checkType(y + 1, x + 1, piece) == 1 && ((checkType(y + 2, x + 2, piece) == 2 && checkType(y - 1, x - 1, piece) == 0) || (checkType(y + 2, x + 2, piece) == 0 && checkType(y - 1, x - 1, piece) == 2))) {
            return true;
        }
    }
    return false;
}

function checkLigne(y, x, piece, direction) {
  //  console.log("etat du y ligne= " +y)
    let nbPiece = 0;
    let side1 = true;
    let side2 = true;
    if (direction == 1) {
       // console.log("   test dir 1 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
         //   console.log("       test dir 1 - 2")
            if (y + cpt < 19) {                
                if (checkArround(y + cpt, x, piece, direction) == true && side1 == true) {
           //         console.log("           test dir 1 - 3")
                    side1 = false;
                }
                else if (side1 == true) {
                    nbPiece++;
                }
            }
            if (y - cpt >= 0) {
                if (checkArround(y - cpt, x, piece, direction) == true && side2 == true) {
             //       console.log("           test dir 1 - 4")
                    side2 = false;
                }
                else if (side2 == true) {
                    nbPiece++;
                }
            }
           // console.log("nbPieces = " + nbPiece);
            if (side1 == false && side2 == false) {
                if (nbPiece >= 4) {
                    return false;
                }
                else {
                    return true;
                }
            }
            if (cpt == 4 && nbPiece >= 4) {
            //    console.log("test");
                return false;
            }
        }
    }
    if (direction == 2) {
      //  console.log("test dir 2 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
        //    console.log("test dir 2 - 2")
            if (x + cpt < 19) {
          //      console.log(" ici c'est pas bon")
                if (checkArround(y, x + cpt, piece, direction) == true && side1 == true) {
            //        console.log("test dir 2 - 3")
                    side1 = false;
                }
                else if (side1 == true) {
                    nbPiece++;
                }
            }
            if (x - cpt >= 0 ) {
            //    console.log(" ici c'est bon")
                if (checkArround(y, x - cpt, piece, direction) == true && side2 == true) {
            //        console.log("test dir 2 - 4")
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
     //   console.log("test dir 4 - 1")
        for (let cpt = 1; cpt < 5; cpt++) {
       //     console.log("test dir 4 - 2")
            if (checkArround(y + cpt, x + cpt, piece, direction) == true && side1 == true) {
         //       console.log("test dir 4 - 3")
                side1 = false;
            }
            else if (side1 == true) {
                nbPiece++;
            }
            if (checkArround(y - cpt, x - cpt, piece, direction) == true && side2 == true) {
       //         console.log("test dir 4 - 4")
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
   // console.log("checkWin");
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
       //     console.log("matrix[y - mv ][x + mv] = [" + (y - mv) + "][" + (x + mv) + "]");
            nbBD1++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y + mv] && matrix[y + mv][x - mv] && matrix[y + mv][x - mv] == piece) {
         //   console.log("matrix[y + mv ][x - mv] = [" + (y + mv) + "][" + (x - mv) + "]");
            nbBD1++;
        }
        else
            break;
    }

    //++ --
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y - mv] && matrix[y - mv][x - mv] && matrix[y - mv][x - mv] == piece) {
         //   console.log("matrix[y - mv ][x - mv] = [" + (y - mv) + "][" + (x - mv) + "]");
            nbBD2++;
        }
        else
            break;
    }
    for (mv = 1; mv <= 4; mv++) {
        if (matrix[y + mv] && matrix[y + mv][x + mv] && matrix[y + mv][x + mv] == piece) {
           // console.log("matrix[y + mv ][x + mv] = [" + (y + mv) + "][" + (x + mv) + "]");
            nbBD2++;
        }
        else
            break;
    }
    //console.log("nbBx = " + nbBx + " nbBy = " + nbBy + " nbBD1 = " + nbBD1 + " nbBD2 = " + nbBD2)
    /* if (nbPionB == 10 || nbPionW == 10) {
         console.log("10 captures effectuées");
         return true;
     }*/
    if (nbBx >= 4 || nbBy >= 4 || nbBD1 >= 4 || nbBD2 >= 4) {
        if (nbBy >= 4) {
            ret = checkLigne(y, x, piece, 1)
      //      console.log("nbBy = " + ret)
        }
        if (nbBx >= 4) {
            ret = checkLigne(y, x, piece, 2)
        //    console.log("nbBx 2= " + ret)
        }
        if (nbBD1 >= 4) {
            ret = checkLigne(y, x, piece, 3)
          //  console.log("nbBD1 = " + ret)
        }
        if (nbBD2 >= 4) {
            ret = checkLigne(y, x, piece, 4)
          //  console.log("nbBD2 = " + ret)
        }
        if (ret != true) {
           // console.log("ligne compelete");
            
            return true;
        }
    }
}


function checkDFTD(y, x, piece, dir) {

    if (dir == 0) {
        let ret = checkPiece(y, x + 1, piece)
        let ret2 = checkPiece(y, x + 2, piece)
        let ret3 = checkPiece(y, x + 3, piece)
        let ret4 = checkPiece(y, x + 4, piece)
        let oret = checkPiece(y, x - 1, piece)
        let oret2 = checkPiece(y, x - 2, piece)
        let oret3 = checkPiece(y, x - 3, piece)
        let oret4 = checkPiece(y, x - 4, piece)

        if (ret < 0)
            return 0;
        if (ret == 1) {
            if (ret2 == 1) {
                if (ret3 == 0 && oret == 0)
                    return 1;
            }
            else if (ret2 == 0) {
                if ((oret == 1 && oret2 == 0) || (ret3 == 1 && ret4 == 0 && oret == 0 )
                    ||( oret == 0 && oret2 == 1 && oret3 == 0))
                    return 1;
            }
        }
        if (ret == 0) {
            if (ret2 == 1) {
                if ((ret3 == 0 && oret == 1 && oret2 == 0) || ret3 == 1 && ret4 == 0 && oret == 0)
                    return 1;
            }
            if (oret == 1) {
                if ((oret2 == 0 && oret3 == 1 && oret4 == 0) || oret2 == 1 && oret3 == 0)
                    return 1
            }
            if (oret == 0 && oret2 == 1 && oret3 == 1 && oret4 == 0) 
                return 1
        }
    }

    if (dir == 1) {
        let ret = checkPiece(y + 1, x, piece)
        let ret2 = checkPiece(y + 2, x, piece)
        let ret3 = checkPiece(y + 3, x, piece)
        let ret4 = checkPiece(y + 4, x, piece)
        let oret = checkPiece(y - 1, x, piece)
        let oret2 = checkPiece(y - 2, x, piece)
        let oret3 = checkPiece(y - 3, x, piece)
        let oret4 = checkPiece(y - 4, x, piece)

        if (ret < 0)
            return 0;
        if (ret == 1) {
            if (ret2 == 1) {
                if (ret3 == 0 && oret == 0)
                    return 1;
            }
            else if (ret2 == 0) {
                if ((oret == 1 && oret2 == 0)  || (ret3 == 1 && ret4 == 0 && oret == 0 ) 
                    || ( oret == 0 && oret2 == 1 && oret3 == 0))
                    return 1;
            }
        }
        if (ret == 0) {
            if (ret2 == 1) {
                if ((ret3 == 0 && oret == 1 && oret2 == 0) || ret3 == 1 && ret4 == 0 && oret == 0)
                    return 1;
            }
            if (oret == 1) {
                if ((oret2 == 0 && oret3 == 1 && oret4 == 0) || oret2 == 1 && oret3 == 0)    
                    return 1
            }
            if (oret == 0 && oret2 == 1 && oret3 == 1 && oret4 == 0)
                return 1
        }
    }

    if (dir == 2) {
        let ret = checkPiece(y + 1 , x + 1, piece)
        let ret2 = checkPiece(y + 2, x + 2, piece)
        let ret3 = checkPiece(y + 3, x + 3, piece)
        let ret4 = checkPiece(y + 4, x + 4, piece)
        let oret = checkPiece(y - 1, x - 1, piece)
        let oret2 = checkPiece(y - 2, x - 2, piece)
        let oret3 = checkPiece(y - 3, x - 3, piece)
        let oret4 = checkPiece(y - 4, x - 4, piece)

        if (ret < 0)
            return 0;
        if (ret == 1) {
            if (ret2 == 1) {
                if (ret3 == 0 && oret == 0)
                    return 1;
            }
            else if (ret2 == 0) {
                if ((oret == 1 && oret2 == 0) || (ret3 == 1 && ret4 == 0 && oret == 0 )
                    ||( oret == 0 && oret2 == 1 && oret3 == 0))
                    return 1;
            }
        }
        if (ret == 0) {
            if (ret2 == 1) {
                if ((ret3 == 0 && oret == 1 && oret2 == 0) || ret3 == 1 && ret4 == 0 && oret == 0)
                    return 1;
            }
            if (oret == 1) {
                if ((oret2 == 0 && oret3 == 1 && oret4 == 0) || oret2 == 1 && oret3 == 0)
                    return 1
            }
            if (oret == 0 && oret2 == 1 && oret3 == 1 && oret4 == 0) 
                return 1
        }
    }

    if (dir == 3) {
        let ret = checkPiece(y - 1, x + 1, piece)
        let ret2 = checkPiece(y - 2, x + 2, piece)
        let ret3 = checkPiece(y - 3, x + 3, piece)
        let ret4 = checkPiece(y - 4, x + 4, piece)
        let oret = checkPiece(y + 1, x - 1, piece)
        let oret2 = checkPiece(y + 2, x - 2, piece)
        let oret3 = checkPiece(y + 3, x - 3, piece)
        let oret4 = checkPiece(y + 4, x - 4, piece)

        if (ret < 0 || oret < 0)
            return 0;
        if (ret == 1) {
            if (ret2 == 1) {
                if (ret3 == 0 && oret == 0)
                    return 1;
            }
            else if (ret2 == 0) {
                if ((oret == 1 && oret2 == 0) || (ret3 == 1 && ret4 == 0 && oret == 0 )
                    ||( oret == 0 && oret2 == 1 && oret3 == 0))
                    return 1;
            }
        }
        if (ret == 0) {
            if (ret2 == 1) {
                if ((ret3 == 0 && oret == 1 && oret2 == 0) || ret3 == 1 && ret4 == 0 && oret == 0)
                    return 1;
            }
            if (oret == 1) {
                if ((oret2 == 0 && oret3 == 1 && oret4 == 0) || oret2 == 1 && oret3 == 0)
                    return 1
            }
            if (oret == 0 && oret2 == 1 && oret3 == 1 && oret4 == 0) 
                return 1
        }
    }
    return 0;
}


function checkPiece(y, x, piece) {
    if (y >= 0 && y <= 18 && x >= 0 && x <= 18) {
        if (matrix[y][x] == piece) {
            return 1;
        } else if (matrix[y][x] == 0) {
            return 0
        } else {
            return -1
        }
    }
    return -2;
}

function checkDoubleFree(y, x, piece) {
    let nb = 0;
    let retour = 0;
    while (nb <= 3) {
       // console.log("switch "+nb);
        switch (nb) {
            case 0: // a droite 
                retour += checkDFTD(y, x, piece, 0);
                break;
            case 1: // en bas
                retour += checkDFTD(y, x, piece, 1);
                break;
            case 2: // en bas a droite 
                retour += checkDFTD(y, x, piece, 2);
                break;
            case 3: // en haut a gauche
                retour += checkDFTD(y, x, piece, 3);
                break;
        }
        nb++;
    }
    if (retour >= 2)
        return true;
    return false;
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


// *********** DRAW ************ //

function printMatrice() {
    for (y = 0; y < matrix.length; y++) {
        console.log(matrix[y]);
    }
}

function drawMatrice(y, x, piece) {
    var color = piece == 2 ? 'black' : 'white';
    console.log('draw ?');
    console.log(color)
    console.log('#col'+y+'-'+x+' .cercle');
    $('#col'+y+'-'+x+' .cercle').css('background-color', color)
    $('#col'+y+'-'+x+' .cercle').css('position', 'relative')
    $('#col'+y+'-'+x+' .cercle').css('opacity', '1')
    console.log($('#col'+y+'-'+x+' .cercle').css('opacity'));
    $('#col'+y+'-'+x+' .cercle').css('width', '40px')
    $('#col'+y+'-'+x+' .cercle').css('height', '40px')
    $('#col'+y+'-'+x+' .cercle').css('border-radius', '30px')
    $('#col'+y+'-'+x+' .cercle').css('margin-top', '-40px')
    $('#col'+y+'-'+x+' .cercle').css('margin-left', '-20px')

    $('#col'+y+'-'+x+' .cercle').animate({
        width: '26px',
        height: '26px',
        borderRadius: '20px',
        marginTop: '-33px',
        marginLeft: '-13px'
    }, 'fast');
}

function drawCoordinates(y, x) {
    var piece = (player) ? 1 : 2;
    //console.log("x = " + x + " y= " + y);
    let ia = new IA();

    if (matrix[y][x] == 0) {
        if (checkDoubleFree(y, x, piece)) {
            $('#zone').prepend('<div class="alert alert-danger" role="alert">Double 3 libres : Coup interdit !</div>');
            setTimeout(function() {
                $('.alert').remove();
            }, 3000);
            return false;
        }

        matrix[y][x] = piece;
        tabPiecesPosee[y][x].value = piece;
        coupsJouee.unshift([y, x])
        console.log(tabPiecesPosee[y][x].value);
        console.log(matrix);
        console.log(coupsJouee);
        capture(y, x, piece);
        drawMatrice(y, x, piece);
        console.log($('#col'+y+'-'+x+' .cercle').css('opacity'));
        result = ia.checkWinner(matrix, coupsJouee)
        //result = checkWin(y, x, piece); //test();
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
    }

    if (result == true) {
        setTimeout(function () {
            alert("Le joueur " + ((!player) ? "blanc" : "noir") + " a gagné !")
            $('#reset').click();
        }, 50)
    }
}

function getPosition(x , y) {
    drawCoordinates(x, y);
    if (player && !result ) {
        let ia = new IA();
        ia.bestMove(matrix);
    }

}

function reset() {
    let newMatrix = []
    for (var i = 0; i < 19; i++) {
        newMatrix[i] = new Array(19);
        newMatrix[i].fill(0, 0, 19)
    }
    matrix = newMatrix;
    let newtabPiecesPosee = []
    for (var i = 0; i < 19; i++) {
        newtabPiecesPosee[i] = new Array(19);
        newtabPiecesPosee[i].fill(emptyObj, 0, 19);
    }
    tabPiecesPosee = newtabPiecesPosee;
    coupsJouee = [];
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
    for (let y = 0; y < 19; y++ ) {
        $('#board').append('<tr id="line'+y+'">')
        for (let x = 0; x < 19; x++ ) {
            $('#line'+y).append('<td id="col'+y+'-'+x+'"><div  onClick="getPosition('+y+','+x+')" class="cercle"></div></td>')
            $('#col'+y+'-'+x+' .cercle').attr('data-content', "y{"+y+"},x{"+x+"}");
        }
    }
   $('td .cercle').css('opacity', '0');
    $('td').mousemove(function() {
        var colorP = player ? 'white': 'black';
        if ($(this).children().css('opacity') != 1) {
            $(this).children().css('opacity', '0.5').css('background-color', colorP);
        }
    })

    $('td').mouseout(function() {
        var regex = /[0-9]+/gm;
        var y = regex.exec(this.id)[0]
        var x = regex.exec(this.id)[0];
        if (matrix[y][x] == 0) {
            $(this).children().css('opacity', '0');
        }
        else { 
            var color = matrix[y][x] == 1 ? 'white' : 'black';
            $(this).children().css('opacity', '1').css('background-color', color);
        }
    })
}

/// x = vers droite 

/// y = vers bas è

/////////////////////////////////////////////////////////// MINMAX /////////////////////////////////////////////////////////

class IA {
    constructor() {
        this.currentScore = 0;
    }


    isCapturable(board, y, x, piece) {
        let p1 = 1;
		let p2 = 2;
        let tabCaptures = [];
		if (piece == 2) {
			p1 = 2;
			p2 = 1;
		}
        // ------------------------------------------------x
        if (x - 2 >= 0 && x + 1 <= 18){
			if ((board[y][x - 1] == p1 && board[y][x - 2] == p2 && board[y][x + 1] == 0) 
                || (board[y][x - 1] == p1 && board[y][x + 1] == p2 && board[y][x - 2] == 0))
                tabCaptures.push({x : x - 1, y : y});
		}
		if (x + 2 <= 18 && x - 1 >= 0){
			if ((board[y][x + 1] == p1 && board[y][x + 2] == p2 && board[y][x - 1] == 0) 
                || (board[y][x + 1] == p1 && board[y][x - 1] == p2 && board[y][x + 2] == 0))
				tabCaptures.push({x : x + 1, y : y});
		}
		// ------------------------------------------------y
		if (y - 2 >= 0 && y + 1 <= 18){
			if ((board[y - 1][x] == p1 && board[y - 2][x] == p2 && board[y + 1][x] == 0) 
                || (board[y - 1][x] == p1 && board[y + 1][x] == p2 && board[y - 2][x] == 0))
				tabCaptures.push({x : x, y : y - 1});
		}
		if (y + 2 <= 18 && y - 1 >= 0){
			if ((board[y + 1][x] == p1 && board[y + 2][x] == p2 && board[y - 1][x] == 0) ||
				(board[y + 1][x] == p1 && board[y - 1][x] == p2 && board[y + 2][x] == 0))
				tabCaptures.push({x : x, y : y + 1});
		}
		// ------------------------------------------------yx
		if (y - 2 >= 0 && x - 2 >= 0 && y + 1 <= 18 && x + 1 <= 18){
			if ((board[y - 1][x - 1] == p1 && board[y - 2][x - 2] == p2 && board[y + 1][x + 1] == 0) ||
				(board[y - 1][x - 1] == p1 && board[y + 1][x + 1] == p2 && board[y - 2][x - 2] == 0))
				tabCaptures.push({x : x - 1, y : y - 1});
		}
		if (y + 2 <= 18 && x + 2 <= 18 && y - 1 >= 0 && x - 1 >= 0){
			if ((board[y + 1][x + 1] == p1 && board[y + 2][x + 2] == p2 && board[y - 1][x - 1] == 0) ||
				(board[y + 1][x + 1] == p1 && board[y - 1][x - 1] == p2 && board[y + 2][x + 2] == 0))
				tabCaptures.push({x : x + 1, y : y + 1});
		}
		// ------------------------------------------------xy
		if (y - 2 >= 0 && x + 2 <= 18 && y + 1 <= 18 && x - 1 >= 0){
			if ((board[y - 1][x + 1] == p1 && board[y - 2][x + 2] == p2 && board[y + 1][x - 1] == 0) ||
				(board[y - 1][x + 1] == p1 && board[y + 1][x - 1] == p2 && board[y - 2][x + 2] == 0))
				tabCaptures.push({x : x + 1, y : y - 1});
		}
		if (y + 2 <= 18 && x - 2 >= 0 && y - 1 >= 0 && x + 1 <= 18){
			if ((board[y + 1][x - 1] == p1 && board[y + 2][x - 2] == p2 && board[y - 1][x + 1] == 0) ||
				(board[y + 1][x - 1] == p1 && board[y - 1][x + 1] == p2 && board[y + 2][x - 2] == 0))
				tabCaptures.push({x : x - 1, y : y + 1});
		}
		return tabCaptures;
    }


    createPriorityList(board, moves, nbmoves){
        //                    Y   X                             Y   X
        // Est        : 0  |  0   1          Sud-Est    : 2  |  1   1
        // Sud        : 1  |  1   0          Sud-Ouest  : 3  |  1  -1
        let state = false;
        var cardinalPoint = [[0,1],[1,0],[1,-1],[1, 1]];
        let tabP = [];
        let tabT2 = [];
        for (let cpt = 0; cpt < nbmoves; cpt++) {
            if (board[moves[cpt][0]][moves[cpt][1]] != 0) {
                let tabT = []
                let joueur = board[moves[cpt][0]][moves[cpt][1]]
                let opposite = (joueur == 1) ? 2 : 1;
                for (let i = 0; i < 4; i++) {
                    let nb = 1;
                    let isSpace= false;
                    let miOuvert = false;
                    if (moves[cpt][0] + (-1 * cardinalPoint[i][0]) >= 0 && moves[cpt][1] + (-1 * cardinalPoint[i][1]) >= 0 && board[moves[cpt][0] + (-1 * cardinalPoint[i][0])][moves[cpt][1] + (-1 * cardinalPoint[i][1])] == joueur)
                        continue;
                    tabT.push(moves[cpt][0] + ', '+ moves[cpt][1])
                    for (let j = 1; j < 5; j++) {
                        let nbSpace = 0;
                        if (moves[cpt][0] + (j * cardinalPoint[i][0]) >= 0 && moves[cpt][1] + (j * cardinalPoint[i][1]) >= 0  
                            && moves[cpt][0] + (j * cardinalPoint[i][0]) <= 18 && moves[cpt][1] + (j * cardinalPoint[i][1]) <= 18) {
                            if (board[moves[cpt][0] + (j * cardinalPoint[i][0])][moves[cpt][1] + (j * cardinalPoint[i][1])] == joueur) {
                                if (isSpace == true) {
                                    isSpace = false;
                                    miOuvert = true;
                                }
                                tabT.push((moves[cpt][0] + (j * cardinalPoint[i][0])) + ', ' + (moves[cpt][1] + (j * cardinalPoint[i][1])))
                                nb++;
                            } else {
                                nbSpace +=1
                                if (board[moves[cpt][0] + (j * cardinalPoint[i][0])][moves[cpt][1] + (j * cardinalPoint[i][1])] == opposite) {
                                    break;
                                } else { 
                                    if (isSpace == true){
                                        break;
                                    }
                                    isSpace = true;
                                }
                            }
                        }
                    }
                    if (nb >= 3) {
                        if (state == false) {
                            state = true;
                        }
                        for(let x =0; x < tabT.length; x++) {
                            tabP.push(tabT[x]);
                        }
                    }
                    if (nb <= 2) {
                        if (state == false) {
                            for(let x =0; x < tabT.length; x++) {
                                tabT2.push(tabT[x]);
                            }
                        }
                    }
                }
            }
        }
        if (state == false)
            tabP = tabT2;
       // console.log(tabP);
        let listeCoup = new Array();
        for (let x = 0; x < tabP.length; x++) {
            if (!listeCoup.includes(tabP[x]))
                listeCoup.push(tabP[x])
        }
        //console.log(listeCoup);
        /* setup liste */
        let liste = []
        for (let x = 0; x < listeCoup.length; x++) {
            let nb = listeCoup[x].split(',');
            liste.push([parseInt(nb[0]), parseInt([nb[1]])])
        }
        return liste;
    }

    captured(plateau, x, y) {
        let player = plateau[x][y]
        let opposite = (player == 1) ? 2 : 1;
        let newList = false;
        if (x <= 15 && plateau[x + 1][y] == opposite && plateau[x + 2][y] == opposite && plateau[x + 3][y] == player) {
            newList = true;
            plateau[x + 1][y] = 0;
            plateau[x + 2][y] = 0;
        }
        if (y <= 15 && plateau[x][y + 1] == opposite && plateau[x][y + 2] == opposite && plateau[x][y + 3] == player) {
            newList = true;
            plateau[x][y + 1] = 0;
            plateau[x][y + 2] = 0;
        }
        if (x >= 3 && plateau[x - 1][y] == opposite && plateau[x - 2][y] == opposite && plateau[x - 3][y] == player) {
            newList = true;
            plateau[x - 1][y] = 0;
            plateau[x - 2][y] = 0;
        }
        if (y >= 3 && plateau[x][y - 1] == opposite && plateau[x][y - 2] == opposite && plateau[x][y - 3] == player) {
            newList = true;
            plateau[x][y - 1] = 0;
            plateau[x][y - 2] = 0;
        }
        if (x <= 15 && y <= 15 && plateau[x + 1][y + 1] == opposite && plateau[x + 2][y + 2] == opposite && plateau[x + 3][y + 3] == player) {
            newList = true;
            plateau[x + 1][y + 1] = 0;
            plateau[x + 2][y + 2] = 0;
        }
        if (x <= 15 && y >= 3 && plateau[x + 1][y - 1] == opposite && plateau[x + 2][y - 2] == opposite && plateau[x + 3][y - 3] == player) {
            newList = true;
            plateau[x + 1][y - 1] = 0;
            plateau[x + 2][y - 2] = 0;
        }
        if (x >= 3 && y <= 15 && plateau[x - 1][y + 1] == opposite && plateau[x - 2][y + 2] == opposite && plateau[x - 3][y + 3] == player) {
            newList = true;
            plateau[x - 1][y + 1] = 0;
            plateau[x - 2][y + 2] = 0;
        }
        if (x >= 3 && y >= 3 && plateau[x - 1][y - 1] == opposite && plateau[x - 2][y - 2] == opposite && plateau[x - 3][y - 3] == player) {
            newList = true;
            plateau[x - 1][y - 1] = 0;
            plateau[x - 2][y - 2] = 0;
        }
        return newList;
    }

    makeNewList(list, listCaptures) {
        let newList = [];
        for (let x = 0; x < list.length; x++) {
            for(let y = 0; y < listCaptures; y++) {
                if (list[x][0] == listCaptures[y][0] && list[x][1] == listCaptures[y][1])
                    continue;
                else {
                    newList.push(list[x]);
                }
            }
        }
        return newList
    }
    // 0.7 : 4.20 : 28.86

    bestMove(board) {
        console.log('level = '+ level);
        let tabCoups = coupsJouee;
        let start = Date.now();
        let bestScore = -Infinity;
        let move;
        let score = 0;
        let nbCoups = tabCoups.length;

        /* test priority queue */
        console.log('-------------------------------------------------------------------');
        /*if (nbCoups > 3) {
            let listeCoups = this.createPriorityList(board, tabCoups, nbCoups);
            //console.log(tabCoups);
            console.log(listeCoups);
            tabCoups = listeCoups
            nbCoups = tabCoups.length;
        }*/
        console.log(board);
        for (let cpt = 0; cpt < nbCoups; cpt++) {
            
            let c1 = tabCoups[cpt][0];
            let c2 = tabCoups[cpt][1];
            for (let i = c1 - 1; i <= c1 + 1 ; i++) {
                for (let j = c2 - 1; j <= c2 + 1; j++) {
                    if (i >=0 && i <= 18 && j >=0 && j <=18 && (i != c1 | j != c2)){
                        if (board[i][j] == 0) {
                            let copyB = [];
                            for (let a = 0; a < board.length; a++) {
                                copyB[a] = []
                                for(let b = 0; b < board[a].length; b++) {
                                    copyB[a][b] = board[a][b];
                                }
                            }
                            copyB[i][j] = 1;
                            if (checkDoubleFree(i, j, 1)) {
                                copyB[i][j] = 0
                                continue;
                            }
                            let fakeList = []
                            let listMoveCaptured = this.captured(copyB, i, j);
                            if (listMoveCaptured) {
                                for(let x; x < tabCoups.length; x++) {
                                    if (copyB[tabCoups[x][0]][tabCoups[x][1]] != 0)
                                        fakeList.push(tabCoups[x]);
                                }
                            }else {
                                for (let a = 0; a < tabCoups.length; a++) {
                                    fakeList[a] = []
                                    for(let b = 0; b < tabCoups[a].length; b++) {
                                        fakeList[a][b] = tabCoups[a][b];
                                    }
                                }
                            }
                            fakeList.unshift([i, j]);
                            score = this.minMaxAlphaBeta(copyB, level, -Infinity, Infinity, false, fakeList);
                            $('#col'+i+'-'+j+' .cercle').attr('data-content', "y{"+i+"},x{"+j+"}= "+score);
                            //copyB[i][j] = 0;
                            //console.log('coups : '+ c1 +', ' + c2);
                            //console.log('score = '+score);
                            if (score > bestScore) {
                                bestScore = score;
                                move = { i, j };
                            }
                            if (coupsJouee == 1)
                                break;
                            //console.log(copyB);
                        }
                    }
                }
                if (coupsJouee == 1)
                    break;
            }
        }
        console.log(tabCoups);
        console.log(move)
        let end = Date.now();
        let res = end - start;
        $('.time').html('Time : '+res/1000)
        drawCoordinates(move.i, move.j);
        $('.score').html("Score : "+bestScore)
    }
    
    checkType(y, x, p, board) {
        if (y >= 0 && y < 19  && y >= 0 && y < 19) {
            if (board[y][x] == p) 
                return 1;
            else if (board[y][x] == 0)
                return 0;
            else 
                return 2;

        }
        return -1;
    }
    
    checkArround(y, x, p, direction, board) {
      //  console.log(board)
        //direction = {vertical : 1, horizontal : 2, diagonale1 : 3, diagonale2: 4}
        if (this.checkType(y, x, p, board) == 0) {
            return true;
        }
        if (direction != 1) {
            /*console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+"encore en bas il y a = "+matrix[y + 2][x])
             console.log("en haut il y a = "+matrix[y - 1][x]+" en bas il y a = "+matrix[y + 1][x]+" en h + 2 il y a = "+matrix[y - 2][x])*/
            if (this.checkType(y + 1, x, p, board) == 1 && ((this.checkType(y + 2, x, p, board) == 2 && this.checkType(y - 1, x, p, board) == 0) || (this.checkType(y + 2, x, p, board) == 0 && this.checkType(y - 1, x, p, board) == 2))) {
             //   console.log("ca return vrai 1");
                return true;
            }
            else if (this.checkType(y - 1, x, p, board) == 1  && ((this.checkType(y - 2, x, p, board) == 2 && this.checkType(y + 1, x, p, board) == 0) ||(this.checkType(y - 2, x, p, board) == 0 && this.checkType(y + 1, x, p, board) == 2))) {
               // console.log("x = "+x+" et y = "+y);
               // console.log("vrai 2 - 2");
                return true;
            }
        }
        if (direction != 2) {
           /* console.log("y = " + y + " x = " + x);
            console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])*/
            if (this.checkType(y, x + 1, p, board) == 1 && ((this.checkType(y, x + 2, p, board) == 2 && this.checkType(y, x - 1, p, board) == 0) || (this.checkType(y, x + 2, p, board) == 0 && this.checkType(y, x - 1, p, board) == 2))) {
               // console.log("a gauche il y a = " + matrix[y][x - 1] + " à droite il y a = " + matrix[y][x + 1] + "encore à droite il y a = " + matrix[y][x + 2])
               // console.log("ca return vrai 3");
                return true;
            }
            else if (this.checkType(y, x - 1, p, board) == 1 && ((this.checkType(y, x - 2, p, board) == 2 && this.checkType(y, x + 1, p, board) == 0) || (this.checkType(y, x - 2, p, board) == 0 && this.checkType(y, x + 1, p, board) == 2))) {
             //   console.log("a gauche il y a = " + matrix[y][x - 1] + "encore à gauche il y a = " + matrix[y][x - 2] + " et à droite il y a = " + matrix[y][x + 1])
                //console.log("ca return vrai 4");
                return true;
            }
        }
        if (direction != 3) {
            if (this.checkType(y - 1, x + 1, p, board) == 1 && ((this.checkType(y - 2, x + 2, p, board) == 2 && this.checkType(y + 1, x - 1, p, board) == 0) || (this.checkType(y - 2, x + 2, p, board) == 0 && this.checkType(y + 1, x - 1, p, board) == 2))) {
              //  console.log("ca return vrai 5");
                return true;
            }
            else if (this.checkType(y + 1, x - 1, p, board) == 1 && ((this.checkType(y + 2, x - 2, p, board) == 2 && this.checkType(y - 1, x + 1, p, board) == 0) || (this.checkType(y + 2, x - 2, p, board) == 0 && this.checkType(y - 1, x + 1, p, board) == 2))) {
              //  console.log("ca return vrai 6");
                return true;
            }
        }
        if (direction != 4) {
            if (this.checkType(y - 1, x - 1, p, board) == 1 && ((this.checkType(y - 2, x - 2, p, board) == 2 && this.checkType(y + 1, x + 1, p, board) == 0) || (this.checkType(y - 2, x - 2, p, board) == 0 && this.checkType(y + 1, x + 1, p, board) == 2))) {
              //  console.log("ca return vrai 7");
                return true;
            }
            else if (this.checkType(y + 1, x + 1, p, board) == 1 && ((this.checkType(y + 2, x + 2, p, board) == 2 && this.checkType(y - 1, x - 1, p, board) == 0) || (this.checkType(y + 2, x + 2, p, board) == 0 && this.checkType(y - 1, x - 1, p, board) == 2))) {
               // console.log("ca return vrai 8");
                return true;
            }
        }
        return false;
    }


   /* checkWinner(board) {
        for (var y = 0; y <= 18; y++) {
            for (var x = 0; x <= 18; x++) {
                for (var dir = 1; dir <= 4; dir++) {
                    if (dir == 1) {
                        if (y <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:
                                    if (board[y + 1][x] == 1 && board[y + 2][x] == 1 && board[y + 3][x] == 1 && board[y + 4][x] == 1)
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y + 1, x, 1, dir, board) && !this.checkArround(y + 2, x, 1, dir, board) && !this.checkArround(y + 3, x, 1, dir, board) && !this.checkArround(y + 4, x, 1, dir, board))
                                            return 1;
                                    break;
                                case 2:
                                    if (board[y + 1][x] == 2 && board[y + 2][x] == 2 && board[y + 3][x] == 2 && board[y + 4][x] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x, 2, dir, board) && !this.checkArround(y + 2, x, 2, dir, board) && !this.checkArround(y + 3, x, 2, dir, board) && !this.checkArround(y + 4, x, 2, dir, board))
                                            return 2;
                                    break;
                            }
                        }
                    }
                    if (dir == 2) {
                        if (x <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:   
                                    if (board[y][x + 1] == 1 && board[y][x + 2] == 1 && board[y][x + 3] == 1 && board[y][x + 4] == 1){
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y, x + 1, 1, dir, board) && !this.checkArround(y, x + 2, 1, dir, board) && !this.checkArround(y, x + 3, 1, dir, board) && !this.checkArround(y, x + 4, 1, dir, board))
                                            return 1;
                                    }
                                    break;
                                case 2:
                                    if (board[y][x + 1] == 2 && board[y][x + 2] == 2 && board[y][x + 3] == 2 && board[y][x + 4] == 2) {
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y, x + 1, 2, dir, board) && !this.checkArround(y, x + 2, 2, dir, board) && !this.checkArround(y, x + 3, 2, dir, board) && !this.checkArround(y, x + 4, 2, dir, board)){
                                            return 2;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    if (dir == 3) {
                        if (y >= 4 && x <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:
                                    if (board[y - 1][x + 1] == 1 && board[y - 2][x + 2] == 1 && board[y - 3][x + 3] == 1 && board[y - 4][x + 4] == 1)
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y - 1, x + 1, 1, dir, board) && !this.checkArround(y - 2, x + 2, 1, dir, board) && !this.checkArround(y - 3, x + 3, 1, dir, board) && !this.checkArround(y - 4, x + 4, 1, dir, board))
                                            return 1;
                                    break;
                                case 2:
                                    if (board[y - 1][x + 1] == 2 && board[y - 2][x + 2] == 2 && board[y - 3][x + 3] == 2 && board[y - 4][x + 4] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y - 1, x + 1, 2, dir, board) && !this.checkArround(y - 2, x + 2, 2, dir, board) && !this.checkArround(y - 3, x + 3, 2, dir, board) && !this.checkArround(y - 4, x + 4, 2, dir, board))
                                            return 2;
                                    break;
                            }
                        }
                    }
                    if (dir == 4) {
                        if (x <= 14 && y <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:
                                    if (board[y + 1][x + 1] == 1 && board[y + 2][x + 2] == 1 && board[y + 3][x + 3] == 1 && board[y + 3][x + 4] == 1)
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y + 1, x + 1, 1, dir, board) && !this.checkArround(y + 2, x + 2, 1, dir, board) && !this.checkArround(y + 3, x + 3, 1, dir, board) && !this.checkArround(y + 4, x + 4, 1, dir, board))
                                            return 1;
                                    break;
                                case 2:
                                    if (board[y + 1][x + 1] == 2 && board[y + 2][x + 2] == 2 && board[y + 3][x + 3] == 2 && board[y + 4][x + 4] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x + 1, 2, dir, board) && !this.checkArround(y + 2, x + 2, 2, dir, board) && !this.checkArround(y + 3, x + 3, 2, dir, board) && !this.checkArround(y + 4, x + 4, 2, dir, board))
                                            return 2;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }*/

    checkWinner(node, lm) {
        let nbMove =  lm.length;
        var cardinalPoint = [[0,1],[1,0],[1,-1],[1, 1]];
        for(let nbm = 0; nbm < nbMove; nbm++) {
            if (node[lm[nbm][0]][lm[nbm][1]] != 0) {
                let joueur = node[lm[nbm][0]][lm[nbm][1]]
                let opposite = (joueur == 1) ? 2 : 1;
                for (let i = 0; i < 4; i++) {
                    let nb = 1;
                    let nbPieceCapturable = 0;
                    for (let j = 1; j < 5; j++) {
                        if (node[lm[nbm][0]][lm[nbm][1]] == joueur) {
                            if (lm[nbm][0] + (j * cardinalPoint[i][0]) >= 0 && lm[nbm][1] + (j * cardinalPoint[i][1]) >= 0  
                                && lm[nbm][0] + (j * cardinalPoint[i][0]) <= 18 && lm[nbm][1] + (j * cardinalPoint[i][1]) <= 18) {
                                if (node[lm[nbm][0] + (j * cardinalPoint[i][0])][lm[nbm][1] + (j * cardinalPoint[i][1])] == joueur) {
                                    nb++;
                                } else { 
                                    break;
                                }
                                if (i != 1)
                                    if ((nbm[0] <= 16 && nbm[0] >= 1 && node[nbm[0] + 1][nbm[1]] == joueur && node[nbm[0] + 2][nbm[1]] == opposite && node[nbm[0] - 1][nbm[1]] == 0 ) 
                                        || (nbm[0] >= 2 && nbm[0] <= 17 && node[nbm[0] - 1][nbm[1]] == joueur && node[nbm[0] - 2][nbm[1]] == opposite && node[nbm[0] + 1][nbm[1]] == 0))
                                        nbPieceCapturable++;
                                if (i != 0)
                                    if ((nbm[1] <= 16 && nbm[1] >= 1 && node[nbm[0]][nbm[1] + 1] == joueur && node[nbm[0]][nbm[1] + 2] == opposite && node[nbm[0]][nbm[1] - 1] == 0 ) 
                                        || (nbm[1] >= 2 && nbm[1] <= 17 && node[nbm[0]][nbm[1] - 1] == joueur && node[nbm[0]][nbm[1] - 2] == opposite && node[nbm[0]][nbm[1] + 1] == 0))
                                        nbPieceCapturable++;
                                if (i != 3)
                                    if ((nbm[0] >=2 && nbm[0] <= 17 && nbm[1] <= 16 && nbm[1] >= 1 && nbm[1] >= 1 && node[nbm[0] - 1][nbm[1] + 1] == joueur && node[nbm[0] - 2][nbm[1] + 2] == opposite && node[nbm[0] + 1][nbm[1] - 1] == 0 ) 
                                        || (nbm[0] >=1 && nbm[0] <= 16 && nbm[1] >= 2 && nbm[1] <= 17 && nbm[1] >= 1 && node[nbm[0] + 1][nbm[1] - 1] == joueur && node[nbm[0] + 2][nbm[1] - 2] == opposite && node[nbm[0] - 1][nbm[1] + 1] == 0))
                                        nbPieceCapturable++;
                                if (i != 2)
                                    if ((nbm[0] >=1 && nbm[0] <= 16 && nbm[1] >= 1 && nbm[1] <= 16 && node[nbm[0] + 1][nbm[1] + 1] == joueur && node[nbm[0] + 2][nbm[1] + 2] == opposite && node[nbm[0] - 1][nbm[1] - 1] == 0 ) 
                                        || (nbm[0] >=2 && nbm[0] <= 17 && nbm[1] >= 2 && nbm[1] <= 17 && node[nbm[0] - 1][nbm[1] - 1] == joueur && node[nbm[0] - 2][nbm[1] - 2] == opposite && node[nbm[0] + 1][nbm[1] + 1] == 0))
                                        nbPieceCapturable++;

                            }
                        }
                    }
                    if (nb == 5 && nbPieceCapturable == 0) {
                        return 1;
                    }
                }
            }
        }
        return 0;
    }

    minMaxAlphaBeta(node, depth, alpha, beta, maximizingPlayer, coups) {
        let gameOver = this.checkWinner(node, coups)
        let nbCoups = coups.length;
        if (depth == 0 || gameOver != 0) {
            //console.log('winner');
           /* if (gameOver != 0) {
                console.log("victoire "+ (gameOver == 1 ? "blanc": "noir"))
            }*/
            return this.heuristicValue(node, coups, nbCoups) ;
        }
        /*if (nbCoups > 3) {
            let listeCoups = this.createPriorityList(node, coups, nbCoups);
            coups = listeCoups
            nbCoups = coups.length; 
        }*/
        /*console.log('les coups');
        console.log(coups);*/
        if (maximizingPlayer) {
            let maxEval = -Infinity
            for (let cpt = 0; cpt < nbCoups; cpt++) {
                let c1 = coups[cpt][0];
                let c2 = coups[cpt][1];
                for (let i = c1 - 1; i <= c1 + 1 ;i++) {
                    for (let j = c2 - 1 ; j <= c2 + 1;j++) {
                        if (i >=0 && i <= 18 && j >=0 && j <=18 && (i != c1 | j != c2)){
                            if (node[i][j] == 0) {
                                let copy = [];
                                for (let a = 0; a < node.length; a++) {
                                    copy[a] = []
                                    for(let b = 0; b < node[a].length; b++) {
                                        copy[a][b] = node[a][b];
                                    }
                                }
                                copy[i][j] = 1
                                if (checkDoubleFree(i, j, 1)) {
                                    copy[i][j] = 0
                                    continue;    
                                }
                                let fakeList = []
                                let listMoveCaptured = this.captured(copy, i, j);
                                if (listMoveCaptured) {
                                    for(let x; x < coups.length; x++) {
                                        if (copy[coups[x][0]][coups[x][1]] != 0)
                                            fakeList.push(coups[x]);
                                    }
                                }
                                else {
                                    for (let a = 0; a < coups.length; a++) {
                                        fakeList[a] = []
                                        for(let b = 0; b < coups[a].length; b++) {
                                            fakeList[a][b] = coups[a][b];
                                        }
                                    }
                                }
                                fakeList.unshift([i, j]);
                                let score = this.minMaxAlphaBeta(copy, depth -1, alpha, beta, false, fakeList);
                                //coups.shift();
                               /* console.log('-----------coups-----------');                    
                                console.log(coups);**/
                                maxEval = Math.max(maxEval, score);
                                if (maxEval >= beta) {
                                    return maxEval;
                                }
                                alpha = Math.max(alpha, maxEval)
                            }
                        }
                        if (maxEval > 900000 )
                            break;
                    }
                    if (maxEval > 900000 )
                        break;
                }
            }
            return maxEval
        }
        else {
            let minEval = Infinity
            for (let cpt = 0; cpt < nbCoups; cpt++) {
                /*console.log('nbCoups = ' + nbCoups);
                console.log(coups);
                console.log(coups[cpt]);*/
                let c1 = coups[cpt][0];
                let c2 = coups[cpt][1];
                for (let i = c1 - 1; i <= c1 + 1 ;i++) {
                    for (let j = c2 - 1 ; j <= c2 + 1;j++) {
                        if (i >=0 && i <= 18 && j >=0 && j <=18 && (i != c1 | j != c2)){
                            if (node[i][j] == 0) {
                                let copy = [];
                                for (let a = 0; a < node.length; a++) {
                                    copy[a] = []
                                    for(let b = 0; b < node[a].length; b++) {
                                        copy[a][b] = node[a][b];
                                    }
                                }
                                copy[i][j] = 2
                                if (checkDoubleFree(i, j, 2)) {
                                    copy[i][j] = 0
                                    continue;
                                }
                                let fakeList = []
                                let listMoveCaptured = this.captured(copy, i, j);
                                if (listMoveCaptured) {
                                    for(let x; x < coups.length; x++) {
                                        if (copy[coups[x][0]][coups[x][1]] != 0)
                                            fakeList.push(coups[x]);
                                    }
                                }  else {
                                    for (let a = 0; a < coups.length; a++) {
                                        fakeList[a] = []
                                        for(let b = 0; b < coups[a].length; b++) {
                                            fakeList[a][b] = coups[a][b];
                                        }
                                    }
                                }
                                fakeList.unshift([i, j]);
                                let score = this.minMaxAlphaBeta(copy, depth -1, alpha, beta, true, fakeList);
                               /* console.log('-----------coups-----------');                    
                                console.log(coups);*/
                                minEval = Math.min(minEval, score);
                                if (alpha >= minEval) {
                                    return minEval
                                }
                                beta = Math.min(beta, minEval)
                            }
                        }
                        if (minEval < -900000 )
                            break;
                    }
                    if (minEval < -900000 )
                        break;
                }
            }
            return minEval
        }
    }

    // Creation d'un tableau qui calcule 
    createTabP(board, joueur, moves, nbmoves){
        //                    Y   X                             Y   X
        // Est        : 0  |  0   1          Sud-Est    : 2  |  1   1
        // Sud        : 1  |  1   0          Sud-Ouest  : 3  |  1  -1
        let originalPlayer = joueur;
        let opposite = (joueur == 1) ? 2 : 1;
        var cardinalPoint = [[0,1],[1,0],[1,-1],[1, 1]];
        let tabP = {            //tabP
            1 : [0, 0, 0, 0],      // premiere case = le nombre de pieces alingées
            2 : [0, 0, 0, 0],      // deuxieme case = les types de menaces avec :
            3 : [0, 0, 0, 0],      //      -> 0 = pieces sans trou
            4 : [0, 0, 0, 0],      //      -> 1 = pieces mi ouvertes
            5 : [0, 0, 0, 0]       //      -> 2 = pieces ouvertes
        }
        let tabQ = { 1 : [0, 0, 0, 0], 2 : [0, 0, 0, 0], 3 : [0, 0, 0, 0], 4 : [0, 0, 0, 0], 5 : [0, 0, 0, 0] }
        
        for (let cpt = 0; cpt < nbmoves; cpt++) {
            if (board[moves[cpt][0]][moves[cpt][1]] != 0) {
                joueur = board[moves[cpt][0]][moves[cpt][1]]
                opposite = (joueur == 1) ? 2 : 1;
                // console.log("coord["+x+"]["+y+"] il y a "+board[y][x]);
                for (let i = 0; i < 4; i++) {
                    let nb = 1;
                    let isSpace= false;
                    let miOuvert = false;
                    let nbPieceCapturable = 0;
                    if (moves[cpt][0] + (-1 * cardinalPoint[i][0]) >= 0 && moves[cpt][1] + (-1 * cardinalPoint[i][1]) >= 0 && board[moves[cpt][0] + (-1 * cardinalPoint[i][0])][moves[cpt][1] + (-1 * cardinalPoint[i][1])] == joueur)
                        continue;
                    for (let j = 1; j < 5; j++) {
                        if (board[moves[cpt][0]][moves[cpt][1]] == joueur) {
                            if (moves[cpt][0] + (j * cardinalPoint[i][0]) >= 0 && moves[cpt][1] + (j * cardinalPoint[i][1]) >= 0  
                                && moves[cpt][0] + (j * cardinalPoint[i][0]) <= 18 && moves[cpt][1] + (j * cardinalPoint[i][1]) <= 18) {
                                if (board[moves[cpt][0] + (j * cardinalPoint[i][0])][moves[cpt][1] + (j * cardinalPoint[i][1])] == joueur) {
                                    if (isSpace == true) {
                                        isSpace = false;
                                        miOuvert = true;
                                    }
                                    nb++;
                                } else { 
                                    if (board[moves[cpt][0] + (j * cardinalPoint[i][0])][moves[cpt][1] + (j * cardinalPoint[i][1])] == opposite) {
                                        break;
                                    } else {
                                        isSpace = true;
                                    }
                                }
                                if (i != 1)
                                    if ((cpt[0] <= 16 && cpt[0] >= 1 && board[cpt[0] + 1][cpt[1]] == joueur && board[cpt[0] + 2][cpt[1]] == opposite && board[cpt[0] - 1][cpt[1]] == 0 ) 
                                        || (cpt[0] >= 2 && cpt[0] <= 17 && board[cpt[0] - 1][cpt[1]] == joueur && board[cpt[0] - 2][cpt[1]] == opposite && board[cpt[0] + 1][cpt[1]] == 0))
                                        nbPieceCapturable++;
                                if (i != 0)
                                    if ((cpt[1] <= 16 && cpt[1] >= 1 && board[cpt[0]][cpt[1] + 1] == joueur && board[cpt[0]][cpt[1] + 2] == opposite && board[cpt[0]][cpt[1] - 1] == 0 ) 
                                        || (cpt[1] >= 2 && cpt[1] <= 17 && board[cpt[0]][cpt[1] - 1] == joueur && board[cpt[0]][cpt[1] - 2] == opposite && board[cpt[0]][cpt[1] + 1] == 0))
                                        nbPieceCapturable++;
                                if (i != 3)
                                    if ((cpt[0] >=2 && cpt[0] <= 17 && cpt[1] <= 16 && cpt[1] >= 1 && cpt[1] >= 1 && board[cpt[0] - 1][cpt[1] + 1] == joueur && board[cpt[0] - 2][cpt[1] + 2] == opposite && board[cpt[0] + 1][cpt[1] - 1] == 0 ) 
                                        || (cpt[0] >=1 && cpt[0] <= 16 && cpt[1] >= 2 && cpt[1] <= 17 && cpt[1] >= 1 && board[cpt[0] + 1][cpt[1] - 1] == joueur && board[cpt[0] + 2][cpt[1] - 2] == opposite && board[cpt[0] - 1][cpt[1] + 1] == 0))
                                        nbPieceCapturable++;
                                if (i != 2)
                                    if ((cpt[0] >=1 && cpt[0] <= 16 && cpt[1] >= 1 && cpt[1] <= 16 && board[cpt[0] + 1][cpt[1] + 1] == joueur && board[cpt[0] + 2][cpt[1] + 2] == opposite && board[cpt[0] - 1][cpt[1] - 1] == 0 ) 
                                        || (cpt[0] >=2 && cpt[0] <= 17 && cpt[1] >= 2 && cpt[1] <= 17 && board[cpt[0] - 1][cpt[1] - 1] == joueur && board[cpt[0] - 2][cpt[1] - 2] == opposite && board[cpt[0] + 1][cpt[1] + 1] == 0))
                                        nbPieceCapturable++;
                            }
                        }
                    }
                    if (joueur == originalPlayer)
                        tabP[nb][3] = nbPieceCapturable;
                    else
                        tabQ[nb][3] = nbPieceCapturable;
                    if (moves[cpt][0] + (-1 * cardinalPoint[i][0]) >= 0 && moves[cpt][1] + (-1 * cardinalPoint[i][1]) >= 0  
                        && moves[cpt][0] + (-1 * cardinalPoint[i][0]) <= 18 && moves[cpt][1] + (-1 * cardinalPoint[i][1]) <= 18) {
                            if (board[moves[cpt][0] + (-1 * cardinalPoint[i][0])][moves[cpt][1] + (-1 * cardinalPoint[i][1])] == 0) {
                                if (isSpace == true && miOuvert == false)
                                    if (joueur == originalPlayer)
                                        tabP[nb][2] += 1
                                    else 
                                        tabQ[nb][2] += 1
                                else if (isSpace == true && miOuvert == true){
                                    if (joueur == originalPlayer)
                                        tabP[nb][1] += 1
                                    else 
                                        tabQ[nb][1] += 1
                                }
                                else if (isSpace == false) {
                                    if (joueur == originalPlayer)
                                        tabP[nb][1] += 1
                                    else 
                                        tabQ[nb][1] += 1
                                }
                            }
                            else {
                                if (isSpace == true)
                                    if (joueur == originalPlayer)
                                        tabP[nb][1] += 1
                                    else 
                                        tabQ[nb][1] += 1
                                else
                                    if (joueur == originalPlayer)
                                        tabP[nb][0] += 1;
                                    else
                                        tabQ[nb][0] += 1;
                            }
                    } else {
                        if (isSpace == true && miOuvert == false)
                            if (joueur == originalPlayer)
                                tabP[nb][1] += 1
                            else
                                tabQ[nb][1] += 1
                        else if (isSpace == true && miOuvert == true)
                            if (joueur == originalPlayer)
                                tabP[nb][1] += 1
                            else 
                                tabQ[nb][1] += 1
                        else if (isSpace == false && miOuvert == false)
                            if (joueur == originalPlayer)
                                tabP[nb][0] += 1
                            else
                                tabQ[nb][0] += 1
                        else if (isSpace == false && miOuvert == true)
                            if (joueur == originalPlayer)
                                tabP[nb][1] += 1
                            else
                                tabQ[nb][1] += 1
                    }
                }
            }
        }
        return {p : tabP, q : tabQ} ;
    }


    heuristic(board, n, moves, nbmoves) {

        // valeur menace moins importante
        // console.log(a);
        let valueP = 0;
        let valueQ = 0;
        let joueur = (player == true) ? 1 : 2;
        let res = this.createTabP(board, joueur, moves, nbmoves);
        let q = res.q;
        let p = res.p;
        let qCapture = res.q[1][3] + res.q[2][3] + res.q[3][3] + res.q[4][3] + res.q[5][3];
        let pCapture = res.p[1][3] + res.p[2][3] + res.p[3][3] + res.p[4][3] + res.p[5][3];

        for (i = 1; i <= n-3; i++) {
            valueP += (a[((2 * i) - 1)] * p[i][1]) + (a[(2 * i)] * p[i][2]);    
            valueQ += (a[((2 * i) - 1)] * q[i][1]) + (a[(2 * i)] * q[i][2]);
        }
      //  console.log(n);
        valueP += a[((2 * (n - 2)) - 1)] * p[n - 2][1]; //
        valueP += 100 * p[n - 2][2]; 
        valueP += 80 * p[n - 1][1];
        valueP += 250 * p[n - 1][2];
        valueP += 1000000 * (p[n][0] + p[n][1] + p[n][2]);
        
        valueQ += a[((2 * (n - 2)) - 1)] * q[n - 2][1];
        valueQ += 1300 * q[n - 2][2]; 
        valueQ += 2000 * q[n - 1][1];
        valueQ += 5020 * q[n - 1][2];
        valueQ += 1000000 * (q[n][0] + q[n][1] + q[n][2]);
            
        return valueP - valueQ;
    }
    
    heuristicValue(node, moves, nbmoves) {
        return this.heuristic(node , 5, moves, nbmoves)
    }
}