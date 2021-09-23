
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
   // console.log('draw ?');
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
        console.log(matrix);
        capture(y, x, piece);
        drawMatrice(y, x, piece);
        //result = ia.checkWinner(matrix)
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
    }

    if (result == true) {
        setTimeout(function () {
            alert("Le joueur " + ((!player) ? "blanc" : "noir") + " a gagné !")
            $('#reset').click();
        }, 50)
    }
    else if (player) {
        ia.bestMove(matrix);
    }
}

function getPosition(x , y) {
    drawCoordinates(x, y);
}

function reset() {
    newMatrix = []
    for (var i = 0; i < 19; i++) {
        newMatrix[i] = new Array(19);
        newMatrix[i].fill(0, 0, 19)
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
    for (let y = 0; y < 19; y++ ) {
        $('#board').append('<tr id="line'+y+'">')
        for (let x = 0; x < 19; x++ ) {
            $('#line'+y).append('<td id="col'+y+'-'+x+'"><div  onClick="getPosition('+y+','+x+')" class="cercle"></div></td>')
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
            $(this).children().css('opacity', '1');
        }
    })
}

/// x = vers droite 

/// y = vers bas è

/////////////////////////////////////////////////////////// MINMAX /////////////////////////////////////////////////////////

class IA {
    constructor() {

    }

    minMax(node, depth, maximizingPlayer) {
        let gameStatus = checkWinner()
        if (depth == 0 || gameStatus == -1) {
            return heuristicValue(node);
        }
    
        if (maximizingPlayer) {
            maxEval = -Infinity
            node.forEach(function(child){
                score = minMax(child, depth -1, false);    
                maxEval = max(maxEval, score);
            })
            return maxEval
        }
        else {
            minEval = Infinity
            node.forEach(function(child){
                score = minMax(child, depth -1, true);    
                minEval = min(maxEval, score);
            })
            return minEval
        }
    }

    captureIA(y, x, piece, iaTab) {
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
        //x+
        for (let mv = 1; mv <= 3; mv++) {
            if ((x + mv) <= 18 && iaTab[y][x + mv]) {
                if (mv < 3) {
                    if (iaTab[y][x + mv] == counter) {
                        nbCxp++;
                    }
                }
                else if (mv == 3 && iaTab[y][x + mv] == piece) {
                    isOk = true;
                }
            }
        }
        if (isOk == true) {
            if (nbCxp == 2) {
                iaTab[y][x + 1] = 0;
                iaTab[y][x + 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCxp = 0;
        }
        //x-
        for (let mv = 1; mv <= 3; mv++) {
            if ((x - mv) >= 0 && iaTab[y][x - mv]) {
                if (mv < 3) {
                    if (iaTab[y][x - mv] == counter) {
                        nbCxm++;
                    }
                }
                else if (mv == 3 && iaTab[y][x - mv] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCxm == 2) {
                iaTab[y][x - 1] = 0;
                iaTab[y][x - 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCxm = 0;
        }
    
        //y+
        for (let mv = 1; mv <= 3; mv++) {
            if ((y + mv) <= 18 && iaTab[y + mv][x]) {
                if (mv < 3) {
                    if (iaTab[y + mv][x] == counter) {
                        nbCyp++;
                    }
                }
                else if (mv == 3 && iaTab[y + mv][x] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCyp == 2) {
                iaTab[y + 1][x] = 0;
                iaTab[y + 2][x] = 0;
            }
            isOk = false;
        }
        else {
            nbCyp = 0;
        }
    
    
        //y-
        for (let mv = 1; mv <= 3; mv++) {
            if ((y - mv) >= 0 && iaTab[y - mv][x]) {
                if (mv < 3) {
                    if (iaTab[y - mv][x] == counter) {
                        nbCym++;
                    }
                }
                else if (mv == 3 && iaTab[y - mv][x] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCym == 2) {
                iaTab[y - 1][x] = 0;
                iaTab[y - 2][x] = 0;
            }
            isOk = false;
        }
        else {
            nbCym = 0;
        }
    
        // -+
        for (let mv = 1; mv <= 3; mv++) {
            if ((y - mv) >= 0 && (x + mv) <= 18 && iaTab[y - mv][x + mv]) {
                if (mv < 3) {
                    if (iaTab[y - mv][x + mv] == counter) {
                        nbCD1p++;
                    }
                }
                else if (mv == 3 && iaTab[y - mv][x + mv] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCD1p == 2) {
                iaTab[y - 1][x + 1] = 0;
                iaTab[y - 2][x + 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCD1p = 0;
        }
    
        //+-
        for (let mv = 1; mv <= 3; mv++) {
            if ((y + mv) <= 18 && (x - mv) >= 0 && iaTab[y + mv][x - mv]) {
                if (mv < 3) {
                    if (iaTab[y + mv][x - mv] == counter) {
                        nbCD1m++;
                    }
                }
                else if (mv == 3 && iaTab[y + mv][x - mv] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCD1m == 2) {
                iaTab[y + 1][x - 1] = 0;
                iaTab[y + 2][x - 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCD1m = 0;
        }
        // --
        for (let mv = 1; mv <= 3; mv++) {
            if ((y - mv) >= 0 && (x - mv) >= 0 && iaTab[y - mv][x - mv]) {
                if (mv < 3) {
                    if (iaTab[y - mv][x - mv] == counter) {
                        nbCD2p++;
                    }
                }
                else if (mv == 3 && iaTab[y - mv][x - mv] == piece) {
                    isOk = true;
                }
            }
    
        }
    
        if (isOk == true) {
            if (nbCD2p == 2) {
                iaTab[y - 1][x - 1] = 0;
                iaTab[y - 2][x - 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCD2p = 0;
        }
    
        //++
        for (let mv = 1; mv <= 3; mv++) {
            if ((y + mv) <= 18 && (x + mv) <= 18 && iaTab[y + mv][x + mv]) {
                if (mv < 3) {
                    if (iaTab[y + mv][x + mv] == counter) {
                        nbCD2m++;
                    }
                }
                else if (mv == 3 && iaTab[y + mv][x + mv] == piece) {
                    isOk = true;
                }
            }
    
        }
        if (isOk == true) {
            if (nbCD2m == 2) {
                iaTab[y + 1][x + 1] = 0;
                iaTab[y + 2][x + 2] = 0;
            }
            isOk = false;
        }
        else {
            nbCD2m = 0;
        }
        if (nbCxp == 2 || nbCxm == 2 || nbCyp == 2 || nbCym == 2 || nbCD1p == 2 || nbCD1m == 2 || nbCD2p == 2 || nbCD2m == 2) {
            if (piece == 1) {
                nbPionB += 2;
            }
            if (piece == 2) {
                nbPionW += 2;
            }
            return true;
        }
    }

    createChilds(node, maximizingPlayer) {
        let p = maximizingPlayer ? 1 : 2;
        var childs = [];
        for (var y = 0; y <= 18; y++ ){
            for (var x = 0; x <= 18; x++ ) {
                if (node[y][x] == 0) {
                    let cp = [...node];
                    cp[y][x] == p
                    captureIA(y, x, p, cp)
                    childs = childs.push(cp);
                }
            }
        }
        return childs;
    }

    bestMove(board) {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i <= 18; i++) {
          for (let j = 0; j <= 18; j++) {
            if (board[i][j] == 0) {
                board[i][j] = 1;
              let score = this.minMaxAlphaBeta(board, 1, -Infinity, Infinity, false) 
              //console.log(score);
              board[i][j] = 0;
              if (score > bestScore) {
                bestScore = score;
                move = { i, j };
              }
            }
          }
        }
        drawCoordinates(move.i, move.j);
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


    checkWinner(board) {
        for (var y = 0; y <= 18; y++) {
            for (var x = 0; x <= 18; x++) {
                for (var dir = 1; dir <= 4; dir++) {
                    if (dir == 1) {
                        if (y <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:
                                    if (board[y + 1][x] == 1 && board[y + 2 ][x] == 1 && board[y + 3][x] == 1 && board[y + 4][x] == 1)
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y + 1, x, 1, dir, board) && !this.checkArround(y + 2, x, 1, dir, board) && !this.checkArround(y + 3, x, 1, dir, board) && !this.checkArround(y + 4, x, 1, dir, board))
                                            return true;
                                    break;
                                case 2:
                                    if (board[y + 1][x] == 2 && board[y + 2][x] == 2 && board[y + 3][x] == 2 && board[y + 4][x] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x, 2, dir, board) && !this.checkArround(y + 2, x, 2, dir, board) && !this.checkArround(y + 3, x, 2, dir, board) && !this.checkArround(y + 4, x, 2, dir, board))
                                            return true;
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
                                            return true;
                                    }
                                    break;
                                case 2:
                                    if (board[y][x + 1] == 2 && board[y][x + 2] == 2 && board[y][x + 3] == 2 && board[y][x + 4] == 2) {
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y, x + 1, 2, dir, board) && !this.checkArround(y, x + 2, 2, dir, board) && !this.checkArround(y, x + 3, 2, dir, board) && !this.checkArround(y, x + 4, 2, dir, board)){
                                            return true;
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
                                    if (board[y - 1][x + 1] == 1 && board[y - 2][x + 2] == 1 && board[y - 3][x + 3] == 1 && board[y - 3][x + 4] == 1)
                                        if (!this.checkArround(y, x, 1, dir, board) && !this.checkArround(y - 1, x + 1, 1, dir, board) && !this.checkArround(y - 2, x + 2, 1, dir, board) && !this.checkArround(y - 3, x + 3, 1, dir, board) && !this.checkArround(y - 4, x + 4, 1, dir, board))
                                            return true;
                                    break;
                                case 2:
                                    if (board[y - 1][x + 1] == 2 && board[y - 2][x + 2] == 2 && board[y - 3][x + 3] == 2 && board[y - 4][x + 4] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y - 1, x + 1, 2, dir, board) && !this.checkArround(y - 2, x + 2, 2, dir, board) && !this.checkArround(y - 3, x + 3, 2, dir, board) && !this.checkArround(y - 4, x + 4, 2, dir, board))
                                            return true;
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
                                            return true;
                                    break;
                                case 2:
                                    if (board[y + 1][x + 1] == 2 && board[y + 2][x + 2] == 2 && board[y + 3][x + 3] == 2 && board[y + 4][x + 4] == 2)
                                        if (!this.checkArround(y, x, 2, dir, board) && !this.checkArround(y + 1, x + 1, 2, dir, board) && !this.checkArround(y + 2, x + 2, 2, dir, board) && !this.checkArround(y + 3, x + 3, 2, dir, board) && !this.checkArround(y + 4, x + 4, 2, dir, board))
                                            return true;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    minMaxAlphaBeta(node, depth, alpha, beta, maximizingPlayer) {

        let gameOver = this.checkWinner(node)
        
        if (depth == 0 || gameOver == true) {
            return this.heuristicValue(node);
        }

        if (maximizingPlayer) {
            //console.log("maximise");
            let maxEval = -Infinity
            for (let i = 0; i <= 18; i++) {
                for (let j = 0; j <= 18; j++) {
                    if (node[i][j] == 0) {
                        node[i][j] = 1
                        let score = this.minMaxAlphaBeta(node, depth -1, alpha, beta, false);
                        node[i][j] = 0
                        maxEval = Math.max(maxEval, score);
                        alpha = Math.max(alpha, score)
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }
            }
            return maxEval
        }
        else {
           // console.log("minimise");
            let minEval = Infinity
            for (let i = 0; i <= 18; i++) {
                for (let j = 0; j <= 18; j++) {
                    if (node[i][j] == 0) {
                        node[i][j] = 1
                        let score = this.minMaxAlphaBeta(node, depth -1, alpha, beta, true);
                        node[i][j] = 0
                        minEval = Math.min(minEval, score);
                        beta = Math.min(beta, score)
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }
            }
            return minEval
        }
    }

    heuristic(board) {
        let score = 0;
        for (var y = 0; y <= 18; y++) {
            for (var x = 0; x <= 18; x++) {
                for (var dir = 1; dir <= 4; dir++) {
                    if (dir == 1) {
                        if (y <= 14) {
                            switch (board[y][x]) {
                                case 0:
                                    break;
                                case 1:
                                    let nbAlign = 0;
                                    let isNoCapt = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y + tmp][x] == 1) {
                                            nbAlign += 1;
                                            if (!this.checkArround(y + tmp, x, 1, dir, board) )
                                                isNoCapt += 1
                                        } else if (board[y + tmp][x] == 2)
                                            break;
                                    }
                                    if (nbAlign == 1) 
                                        score += 1;
                                    else if (nbAlign == 2) 
                                        score += 10;
                                    else if (nbAlign == 3)
                                        score += (board[y + 4][x] == 0) ? 450 : 100;
                                    else if (nbAlign == 4)
                                        score += 1000;
                                    break;
                                case 2:
                                    let nbAlign2 = 0;
                                    let isNoCapt2 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y + tmp][x] == 2) {
                                            nbAlign2 += 1;
                                            if (!this.checkArround(y + tmp, x, 2, dir, board) )
                                                isNoCapt2 += 1;
                                        } else if (board[y + tmp][x] == 1)
                                            break;
                                    }
                                    if (nbAlign2 == 1) 
                                        score -= 1;
                                    else if (nbAlign2 == 2) 
                                        score -= 10;
                                    else if (nbAlign2 == 3)
                                        score -= (board[y + 4][x] == 0) ? 1000 : 100;
                                    else if (nbAlign2 == 4)
                                        score -= 1000;
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
                                    let nbAlign3 = 0;
                                    let isNoCapt3 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y][x  + tmp] == 1) {
                                            nbAlign3 += 1;
                                            if (!this.checkArround(y, x  + tmp, 1, dir, board) )
                                                isNoCapt3 += 1;
                                        } else if (board[y][x + tmp] == 2)
                                            break;
                                    }
                                    if (nbAlign3 == 1) 
                                        score += 1;
                                    else if (nbAlign3 == 2) 
                                        score += 10;
                                    else if (nbAlign3 == 3)
                                        score += (board[y][x + 4] == 0) ? 450 : 100;
                                    else if (nbAlign3 == 4)
                                        score += 1000;
                                    break;
                                case 2:
                                    let nbAlign4 = 0;
                                    let isNoCapt4 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y][x + tmp] == 2) {
                                            nbAlign4 += 1;
                                            if (!this.checkArround(y, x  + tmp, 2, dir, board) )
                                                isNoCapt4 += 1;
                                        } else if (board[y][x + tmp] == 1)
                                            break;
                                    }
                                    if (nbAlign4 == 1) 
                                        score -= 1;
                                    else if (nbAlign4 == 2) 
                                        score -= 10;
                                    else if (nbAlign4 == 3)
                                        score -= (board[y][x + 4] == 0) ? 1000 : 100;
                                    else if (nbAlign4 == 4)
                                        score -= 1000;
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
                                    let nbAlign5 = 0;
                                    let isNoCapt5 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y - tmp][x  + tmp] == 1) {
                                            nbAlign5 += 1;
                                            if (!this.checkArround(y - tmp, x  + tmp, 1, dir, board) )
                                                isNoCapt5 += 1;
                                        } else if (board[y - tmp][x  + tmp] == 2)
                                            break;
                                    }
                                    if (nbAlign5 == 1) 
                                        score += 1;
                                    else if (nbAlign5 == 2) 
                                        score += 10;
                                    else if (nbAlign5 == 3)
                                        score += (board[y - 4][x + 4] == 0) ? 450 : 100;
                                    else if (nbAlign5 == 4)
                                        score += 1000;
                                    break;
                                case 2:
                                    let nbAlign6 = 0;
                                    let isNoCapt6 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y - tmp][x + tmp] == 2) {
                                            nbAlign6 += 1;
                                            if (!this.checkArround(y - tmp, x  + tmp, 2, dir, board) )
                                                isNoCapt6 += 1;
                                        } else if (board[y - tmp][x  + tmp] == 1)
                                            break;
                                    }
                                    if (nbAlign6 == 1) 
                                        score -= 1;
                                    else if (nbAlign6 == 2) 
                                        score -= 10;
                                    else if (nbAlign6 == 3)
                                        score -= (board[y - 4][x + 4] == 0) ? 1000 : 100;
                                    else if (nbAlign6 == 4)
                                        score -= 1000;
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
                                    let nbAlign7 = 0;
                                    let isNoCapt7 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y + tmp][x  + tmp] == 1) {
                                            nbAlign7 += 1;
                                            if (!this.checkArround(y + tmp, x  + tmp, 1, dir, board) )
                                                isNoCapt7 += 1;
                                        } else if (board[y + tmp][x  + tmp] == 2)
                                            break;
                                    }
                                    if (nbAlign7 == 1) 
                                        score += 1;
                                    else if (nbAlign7 == 2) 
                                        score += 10;
                                    else if (nbAlign7 == 3)
                                        score += (board[y + 4][x + 4] == 0) ? 450 : 100;
                                    else if (nbAlign7 == 4)
                                        score += 1000;
                                    break;
                                case 2:
                                    let nbAlign8 = 0;
                                    let isNoCapt8 = 0;
                                    for (var tmp = 1; tmp <= 4; tmp++) {
                                        if (board[y + tmp][x + tmp] == 2) {
                                            nbAlign8 += 1;
                                            if (!this.checkArround(y + tmp, x  + tmp, 2, dir, board) )
                                                isNoCapt8 += 1;
                                        } else if (board[y + tmp][x + tmp] == 1)
                                            break;
                                    }
                                    if (nbAlign8 == 1) 
                                        score -= 1;
                                    else if (nbAlign8 == 2) 
                                        score -= 10;
                                    else if (nbAlign8 == 3)
                                        score -= (board[y + 4][x + 4] == 0) ? 1000 : 100;
                                    else if (nbAlign8 == 4)
                                        score -= 1000;
                                    break;
                            }
                        }
                    }
                }
            }    
        }
        return score;
    }
    
    heuristicValue(board, player) {
        /*if (this.checkWinner(board)) {
            console.log('solution trouvée');
            return Infinity;
        }*/
        return this.heuristic(board)
    }
}


  
  // Usage!

//console.log(ia.id)
//minMax(matrix, 2, true) my turn is true and opponant turn is false
//maximizingPlayer bool => if depth is odd == true 
