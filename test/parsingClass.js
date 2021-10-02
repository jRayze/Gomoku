import { getGomokuTools } from "./gomokuTools.js";
import { alertDoubleFreeThree } from "./eventController.js";
import { eatingMachine } from "./gameController.js";

export function setParsing(coordXY){
    var gomokuTools = getGomokuTools();
    var x = coordXY[0];
    var y = coordXY[1];

        if (!freeThreeParse(coordXY)){
            alertDoubleFreeThree();
            return false;
        }
        eatingMachine(verifAllCardinalPoint(coordXY));
    return true;
}

function doubleFreeThree(direction, oppositeDirection){
    if (direction[0] < 0 || oppositeDirection[0] < 0)
        return 0;
    if (direction[0] == 1) {
        if (direction[1] == 1)
            if (direction[2] == 0 && oppositeDirection[0] == 0)
                return 1;
        else if (direction[1] == 0)
            if ((oppositeDirection[0] == 1 && oppositeDirection[1] == 0) || (direction[2] == 1 && direction[3] == 0 && oppositeDirection[0] == 0 ) || ( oppositeDirection[0] == 0 && oppositeDirection[1] == 1 && oppositeDirection[2] == 0))
                return 1;
    }
    if (direction[0] == 0) {
        if (direction[1] == 1)
            if ((direction[2] == 0 && oppositeDirection[0] == 1 && oppositeDirection[1] == 0) || direction[2] == 1 && direction[3] == 0 && oppositeDirection[0] == 0)
                return 1;
        if (oppositeDirection[0] == 1)
            if ((oppositeDirection[1] == 0 && oppositeDirection[2] == 1 && oppositeDirection[3] == 0) || oppositeDirection[1] == 1 && oppositeDirection[2] == 0)
                return 1;
        if (oppositeDirection[0] == 0 && oppositeDirection[1] == 1 && oppositeDirection[2] == 1 && oppositeDirection[3] == 0) 
            return 1;
    }
    return (0);
}

function getStoneInfo(x, y) {
    var gomokuTools = getGomokuTools();
    
    if (verifBorderLimit(y) && verifBorderLimit(x)) {
        if (gomokuTools.stonesArray[y][x].stat == gomokuTools.activePlayer) {           
            return 1;                      //ActivePLayer
        }
        else if (gomokuTools.stonesArray[y][x].stat == 'empty') {
            return 0                       //Empty
        }
        else {
            return -1                      //OppositePlayer
        }
    }
    return -2;                             //BorderLimitExceeded
}

function freeThreeParse(coordXY){
    //                           Y   X                            X   Y
    //    0    ===   Est         0   1  |  2    ===   Sud-est     1   1
    //               Ouest       0  -1  |             Nord-Ouest -1  -1
    //
    //    1    ===   Sud         1   0  |  3    ===   Nord-est   -1   1
    //               Nord       -1   0  |             Sud-Ouest   1  -1
    var cardinalPoint = [[0,1],[1,0],[1,1],[-1,1]];
    var direction = [];
    var oppositeDirection = [];
    var validation = 0;
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    // console.log(x + ((1+3) * cardinalPoint[0][0]));
    for (let j = 0; j < 4; j++){
        for (let i = 0; i < 4; i++){
            direction.push(getStoneInfo(x + ((1+i) * cardinalPoint[j][1]) ,y + ((1+i) * cardinalPoint[j][0])));
            oppositeDirection.push(getStoneInfo(x + ((1+i) * (cardinalPoint[j][1] * -1 )) ,y + ((1+i) * (cardinalPoint[j][0] * -1 )) ));
        }
        validation += doubleFreeThree(direction, oppositeDirection);
        console.log(validation);
        direction = [];
        oppositeDirection = [];
    }
    if (validation >= 2)
        return false;
    return true;
}

function eatOrNot(coordXY, cardinalPoint){
    var gomokuTools = getGomokuTools();
    var oppositePlayer = (gomokuTools.activePlayer == "black") ? "white" : "black";
    var validation = 0;
    // cardinalPoint X and Y
    var cardPY = cardinalPoint[0];
    var cardPX = cardinalPoint[1];
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    if (verifBorderLimit(y + (1 * cardPY)) && verifBorderLimit(x + (1 * cardPX)))
        if (gomokuTools.stonesArray[y + (1 * cardPY)][x + (1 * cardPX)].stat == oppositePlayer)
            validation++;
    if (verifBorderLimit(y + (2 * cardPY)) && verifBorderLimit(x + (2 * cardPX)))
        if (gomokuTools.stonesArray[y + (2 * cardPY)][x + (2 * cardPX)].stat == oppositePlayer)
            validation++;
    if (verifBorderLimit(y + (3 * cardPY)) && verifBorderLimit(x + (3 * cardPX)))
        if (gomokuTools.stonesArray[y + (3 * cardPY)][x + (3 * cardPX)].stat == gomokuTools.activePlayer)
            validation++;
    return ((validation == 3) ? true : false);
}

function verifBorderLimit(number){
    if ((number <= 18) && (number >= 0))
        return true;
    return false
}

function verifAllCardinalPoint(coordXY){
    //                    Y   X                             Y   X
    // Est        : 0  |  0   1          Nord-Ouest : 4  | -1  -1
    // Ouest      : 1  |  0  -1          Sud-Ouest  : 5  |  1  -1
    // Nord       : 2  | -1   0          Nord-Est   : 6  | -1   1
    // Sud        : 3  |  1   0          Sud-Est    : 7  |  1   1

    var cardinalPoint = [[0,1],[0,-1],[-1,0],[1,0],[-1,-1],[1,-1],[-1,1],[1, 1]];
    var eatenStones = [];
    var x = parseInt(coordXY[0], 10);
    var y = parseInt(coordXY[1], 10);

    for (let i = 0; i < 8; i++){
            if (eatOrNot(coordXY, cardinalPoint[i])){
                eatenStones.push([y + (1 * cardinalPoint[i][0]), x + (1 * cardinalPoint[i][1])]);
                eatenStones.push([y + (2 * cardinalPoint[i][0]), x + (2 * cardinalPoint[i][1])]);
        }
   }
    return eatenStones;
}


function checkArround(y, x, p, direction, board) {
        //console.log(board)
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

  function checkWinner(board) {
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
