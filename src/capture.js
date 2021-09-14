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