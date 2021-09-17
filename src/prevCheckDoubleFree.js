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
            if (cpt == 3) {
                if ((tab.left + tab.right) <= 1 && (tab.top + tab.bot) <= 1
                    && (tab.topLeft + tab.botRight) <= 1 && (tab.topRight + tab.botLeft) <= 1) {
                    console.log("3 libres impossible");
                    state[cpt - 1] = Object.assign({}, tab);
                    break;
                }
                if ((tab.left + tab.right) >= 3 && ((state[0].left == 0 && tab.right == 2) || (state[0].right == 0 && tab.left == 2)))
                    doubleFree++;
                if ((tab.top + tab.bot) >= 3 && ((state[0].top == 0 && tab.bot == 2) || (state[0].bot == 0 && tab.top == 2)))
                    doubleFree++;
                if ((tab.topLeft + tab.botRight) >= 3 && ((state[0].topLeft == 0 && tab.botRight == 2) || (state[0].botRight == 0 && tab.topLeft == 2)))
                    doubleFree++;
                if ((tab.topRight + tab.botLeft) >= 3 && ((state[0].topRight == 0 && tab.botLeft == 2) || (state[0].botLeft == 0 && tab.topRight == 2)))
                    doubleFree++;
                /*if (tab.left + tab.right) == 3){

                }*/
               if (((tab.left + tab.right) == 1 || (tab.top + tab.bot) == 1
                || (tab.topLeft + tab.botRight) == 1 || (tab.topRight + tab.botLeft) == 1)) {
                console.log("test1");
                    if ((tab.left + tab.right) == 1 && (state[1].left < tab.left && state[1].right == tab.right) 
                        && (state[0].left + state[0].right) == 1)
                        doubleFree++;
                    if ((tab.top + tab.bot) == 2 && (state[1].top == tab.top && state[1].bot == tab.bot) 
                        && (state[0].top + state[0].bot) == 1)
                        doubleFree++;
                    if ((tab.topLeft + tab.botRight) == 2 
                        && (state[1].topLeft == tab.topLeft && state[1].botRight == tab.botRight) 
                            && (state[0].topLeft + state[0].botRight) == 1)
                        doubleFree++;
                    if ((tab.topRight + tab.botLeft) == 2 
                        && (state[1].topRight == tab.topRight && state[1].botLeft == tab.botLeft)
                            && (state[0].topRight + state[0].botLeft) == 1)
                        doubleFree++;
                }

                if (((tab.left + tab.right) == 2 || (tab.top + tab.bot) == 2
                    || (tab.topLeft + tab.botRight) == 2 || (tab.topRight + tab.botLeft) == 2)) {
                    console.log("test1");
                    if ((tab.left + tab.right) == 2 && (state[1].left == tab.left && state[1].right == tab.right) 
                        && (state[0].left + state[0].right) == 1)
                        doubleFree++;
                    if ((tab.top + tab.bot) == 2 && (state[1].top == tab.top && state[1].bot == tab.bot) 
                        && (state[0].top + state[0].bot) == 1)
                        doubleFree++;
                    if ((tab.topLeft + tab.botRight) == 2 
                        && (state[1].topLeft == tab.topLeft && state[1].botRight == tab.botRight) 
                            && (state[0].topLeft + state[0].botRight) == 1)
                        doubleFree++;
                    if ((tab.topRight + tab.botLeft) == 2 
                        && (state[1].topRight == tab.topRight && state[1].botLeft == tab.botLeft)
                            && (state[0].topRight + state[0].botLeft) == 1)
                        doubleFree++;
                }
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
        if (doubleFree >= 2) {
            console.log('doubleFree')
            return true;
        }
    }
    console.log(state);
    return false;
}