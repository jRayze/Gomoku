
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